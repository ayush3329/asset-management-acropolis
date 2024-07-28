
# Municipal Corporation of Indore Asset Management System

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)

## Introduction

The Municipal Corporation of Indore Asset Management System is a centralized platform designed to manage all departments, assets, ongoing and upcoming projects, and departmental authorities within the municipal corporation. The system ensures efficient resource management, transparent project tracking, and active public engagement.

## Features

- **Role-Based Authentication:** Secure access with varying levels of privileges based on user roles.
- **Department Overview:** Display all departments with detailed views of their projects and assets.
- **Asset Management:** Track and manage assets categorized by use and demand.
- **Project Tracking:** Comprehensive tracking of ongoing, upcoming, and completed projects.
- **Inter-Departmental Collaboration:** Efficient resource requests and approvals between departments.
- **Public Engagement:** Users can report damaged assets and track complaint resolutions.
- **Machine Learning Integration:** Automated complaint routing using OpenCV and machine learning.
- **Geotagging:** Authenticates resolved complaints with geotagged photos.

## Technologies Used

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Node.js
- **Database:** PostgreSQL
- **Machine Learning:** Python (OpenCV)
- **Authentication:** JWT (JSON Web Tokens)

## Installation


### 1. Starting the ML Python Server

1. Navigate to the `ml-server` directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the ML server:
   ```bash
   python ml_server.py
   ```
4. The ML server should now be running at [http://localhost:5000](http://localhost:5000).

### 2. Starting the Backend (Node.js)

1. Navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file based on `.env.example` and configure necessary variables.
4. Start the backend server:
   ```bash
   npm run dev
   ```
5. The backend server should now be running at [http://localhost:3000](http://localhost:3000).

### 3. Starting the Frontend (Next.js)

1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. The frontend should now be running at [http://localhost:3000](http://localhost:3000).

### Additional Notes

- Ensure all services are running simultaneously for full functionality.
- Adjust configurations and environment variables as per your setup.


## Usage

1. **Launch the application:**
   - Navigate to `http://localhost:3000` in your web browser.
   - Log in using your credentials.

2. **Explore the Features:**
   - Navigate through departments, assets, and projects.
   - Submit asset requests and track project status.
   - Report damaged assets and monitor complaint resolutions.


Thank you for using the Municipal Corporation of Indore Asset Management System! We hope it enhances the efficiency and transparency of asset and project management within your organization.
