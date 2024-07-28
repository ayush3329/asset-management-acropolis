
from flask import Flask, request, jsonify
import requests
import os
import pickle as pkl
from PIL import Image, UnidentifiedImageError
from io import BytesIO
import numpy as np
from report_model import ImageClassifier
from date import MaintenancePredictor 
import numpy as np
import pandas as pd

app = Flask(__name__)
 
with open("image_classifierV2.pkl", "rb") as G:
    image_model = pkl.load(G)
 
with open("maintenance_model.pkl", "rb") as F:
    date_model = pkl.load(F)
 
with open("obd_predictor.pkl", "rb") as D:
    obd_model = pkl.load(D)
 





@app.route("/image_predict", methods=["POST"])
def imagePredict():
    data = request.json
    image_url = data.get("image_url")
    
    if not image_url:
        return jsonify({"error": "No image URL provided"}), 400
    
    # Download the image
    response = requests.get(image_url)
    if response.status_code != 200:
        return jsonify({"error": "Failed to download image"}), 500
    
    try:
        # Save the image to a BytesIO object
        image = Image.open(BytesIO(response.content))
        image.save("temp_image.jpg")
    except UnidentifiedImageError:
        return jsonify({"error": "Downloaded content is not a valid image"}), 400
    
    # Predict using the model
    prediction = image_model.predict("temp_image.jpg")
    
    # Clean up: delete the image
    os.remove("temp_image.jpg")
    
    return jsonify({"prediction": prediction})











@app.route("/fr", methods=["POST"])
def f():
    print("1")
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    print("2")
    try:
        # Open the image file
        image = Image.open(file.stream)
        image.save("temp_image.jpg")
    except UnidentifiedImageError:
        return jsonify({"error": "Uploaded file is not a valid image"}), 400
    
    # Predict using the model
    prediction = image_model.predict("temp_image.jpg")
    
    # Clean up: delete the image
    os.remove("temp_image.jpg")
    print("output", prediction)
    
    return jsonify({"prediction": prediction})



def predict_next_maintenance(last_date):
        # Predict the next maintenance date
        last_date = pd.to_datetime(last_date, format='%d/%m/%Y')
        features = {
            'day': [last_date.day],
            'month': [last_date.month],
            'year': [last_date.year],
            'day_of_week': [last_date.dayofweek],
            'days_since_last_maintenance': [0]
        }
        
        next_maintenance_days = date_model.predict(pd.DataFrame(features))
        next_maintenance_date = last_date + pd.to_timedelta(int(next_maintenance_days[0]), unit='d')
        return next_maintenance_date.strftime('%d/%m/%Y')


@app.route("/date_prediction", methods=["POST"])
def datePredict():
    date = request.json.get("date")

    prediction = predict_next_maintenance(date)

    return jsonify({"prediction": prediction})

@app.route("/obd_prediction", methods=["POST"])
def obdPredict():
    data = request.json

    print("Received data:", data)

    features = {
        'CAR_YEAR': float(data['CAR_YEAR']),
        'ENGINE_POWER': float(data['ENGINE_POWER']),
        'BAROMETRIC_PRESSURE(KPA)': float(data['BAROMETRIC_PRESSURE(KPA)']),
        'ENGINE_COOLANT_TEMP': float(data['ENGINE_COOLANT_TEMP']),
        'FUEL_LEVEL': float(data['FUEL_LEVEL'].replace('%', '')),  # Remove '%' before conversion
        'ENGINE_LOAD': float(data['ENGINE_LOAD'].replace('%', '')),
        'ENGINE_RPM': float(data['ENGINE_RPM'])
    }

    # Convert dictionary to Pandas DataFrame
    df = pd.DataFrame([features])

    # Print DataFrame for debugging
    print("DataFrame:", df)

    prediction = obd_model.predict(df)

    # Convert NumPy array to a Python list or single value
    if prediction.ndim > 1:
        prediction = prediction.tolist()  # If it's a 2D array
    else:
        prediction = prediction.tolist()  # If it's a 1D array
        if len(prediction) == 1:
            prediction = prediction[0]

    return jsonify({"prediction": prediction})



if __name__ == "__main__":
    app.run(debug=True)