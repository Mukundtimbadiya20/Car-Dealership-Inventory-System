# 🚗 Car Dealership Inventory System

## Overview

The Car Dealership Inventory System is a full-stack web application developed as part of a Test-Driven Development (TDD) assessment. The application allows users to register, log in, browse available vehicles, search inventory, purchase vehicles, and manage inventory through an admin dashboard.

---

# Features

## Authentication

* User Registration
* User Login
* JWT-based Authentication
* Password Hashing using bcrypt

## Vehicle Management

* Add Vehicle
* View All Vehicles
* Search Vehicles
* Update Vehicle
* Delete Vehicle

## Inventory Management

* Purchase Vehicle
* Restock Vehicle

## Frontend

* User Registration Page
* User Login Page
* Dashboard
* Search Functionality
* Purchase Button
* Admin Dashboard

---

# Tech Stack

## Backend

* Python
* FastAPI
* SQLAlchemy
* SQLite
* JWT Authentication
* Passlib (bcrypt)
* Pydantic

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router DOM

---

# Project Structure

```text
Car-Dealership-Inventory-System/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── screenshots/
│
├── README.md
├── PROMPTS.md
└── .gitignore
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Mukundtimbadiya20/Car-Dealership-Inventory-System.git

cd Car-Dealership-Inventory-System
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# API Endpoints

## Authentication

* POST /api/auth/register
* POST /api/auth/login

## Vehicles

* POST /api/vehicles
* GET /api/vehicles
* GET /api/vehicles/search
* PUT /api/vehicles/{id}
* DELETE /api/vehicles/{id}

## Inventory

* POST /api/vehicles/{id}/purchase
* POST /api/vehicles/{id}/restock

---

# Screenshots

Add screenshots here before submission.

* Login Page
* Register Page
* Dashboard
* Admin Dashboard
* Swagger API Documentation

---

# Test Report

Backend functionality tested successfully:

* User Registration ✅
* User Login ✅
* JWT Authentication ✅
* Vehicle CRUD ✅
* Vehicle Search ✅
* Purchase Vehicle ✅
* Restock Vehicle ✅

---

# My AI Usage

## AI Tools Used

* ChatGPT

## How AI Was Used

* Planned project architecture.
* Generated backend boilerplate.
* Assisted with FastAPI implementation.
* Assisted with SQLAlchemy models.
* Helped implement JWT authentication.
* Helped build React frontend.
* Helped debug backend and frontend issues.
* Assisted with API integration.
* Helped write project documentation.

## Reflection

AI significantly accelerated development by helping with code generation, debugging, and architecture planning. Every generated solution was manually reviewed, integrated, tested, and adapted to meet the project requirements.

---

# Future Improvements

* Role-based access control for admin users.
* Vehicle image uploads.
* Pagination.
* Advanced filtering.
* Deployment using Docker and cloud hosting.
* Unit and integration tests with higher coverage.

---

# Author

Mukund Timbadiya

Bachelor of Engineering (Artificial Intelligence & Machine Learning)

L.D. College of Engineering
