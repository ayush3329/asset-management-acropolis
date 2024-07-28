import pandas as pd
from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
import numpy as np
import pickle

class MaintenancePredictor:
    def __init__(self, csv_file, model_file='maintenance_model.pkl'):
        self.csv_file = csv_file
        self.model_file = model_file
        self.data = pd.read_csv(csv_file)
        self.model = RandomForestRegressor()
        self.encoder = LabelEncoder()
    
    def preprocess_data(self):
        # Convert the date column to datetime
        self.data['date'] = pd.to_datetime(self.data['date'], format='%d/%m/%Y')
        # Encode the mode column if it's categorical
        if self.data['mode'].dtype == 'object':
            self.data['mode'] = self.encoder.fit_transform(self.data['mode'])
    
    def feature_engineering(self):
        # Create features based on the date
        self.data['day'] = self.data['date'].dt.day
        self.data['month'] = self.data['date'].dt.month
        self.data['year'] = self.data['date'].dt.year
        self.data['day_of_week'] = self.data['date'].dt.dayofweek
        
        # Calculate days since the last maintenance
        self.data['days_since_last_maintenance'] = self.data['date'].diff().dt.days.fillna(0)
    
    def train_model(self):
        # Define features and target
        X = self.data[['day', 'month', 'year', 'day_of_week', 'days_since_last_maintenance']]
        y = self.data['days_since_last_maintenance'].shift(-1).fillna(0)
        
        # Split the data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Train the model
        self.model.fit(X_train, y_train)
        
        # Evaluate the model
        accuracy = self.model.score(X_test, y_test)
        print(f"Model Accuracy: {accuracy * 100:.2f}%")
        
        # Save the model
        self.save_model()
    
    def save_model(self):
        with open(self.model_file, 'wb') as f:
            pickle.dump(self.model, f)
        print(f"Model saved to {self.model_file}")
    
    def load_model(self):
        with open(self.model_file, 'rb') as f:
            self.model = pickle.load(f)
        print(f"Model loaded from {self.model_file}")
    
    def predict_next_maintenance(self, last_date):
        # Predict the next maintenance date
        last_date = pd.to_datetime(last_date, format='%d/%m/%Y')
        features = {
            'day': [last_date.day],
            'month': [last_date.month],
            'year': [last_date.year],
            'day_of_week': [last_date.dayofweek],
            'days_since_last_maintenance': [0]
        }
        
        next_maintenance_days = self.model.predict(pd.DataFrame(features))
        next_maintenance_date = last_date + pd.to_timedelta(int(next_maintenance_days[0]), unit='d')
        return next_maintenance_date.strftime('%d/%m/%Y')
    
    def add_prediction_to_data(self, last_date):
        next_maintenance_date = self.predict_next_maintenance(last_date)
        new_data = pd.DataFrame({
            'infrastructure': ['park'],
            'date': [next_maintenance_date],
            'mode': [0]
        })
        self.data = pd.concat([self.data, new_data], ignore_index=True)
        self.data.to_csv(self.csv_file, index=False)
        print(f"Added next maintenance date: {next_maintenance_date}")
    
    def retrain_model_with_new_data(self):
        self.preprocess_data()
        self.feature_engineering()
        self.train_model()
    
    def run(self):
        self.preprocess_data()
        self.feature_engineering()
        self.train_model()

print("No error")