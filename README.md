# 📌 To-Do List (React + Django)

A full-stack **To-Do List** web application built using **React.js** for the frontend and **Django with Django REST Framework (DRF)** for the backend. The application allows users to **add, update, and manage tasks efficiently**.

---

## 🚀 Features

✅ **Add, Edit, and Delete Tasks**  
✅ **React.js for Frontend** (Hooks)  
✅ **Django & DRF for Backend** (CRUD API for tasks)  
✅ **CORS Handling with `django-cors-headers`**  
✅ **SQLite Database for Task Storage**  
✅ **REST API Integration**  

---

## 🛠️ Tech Stack

### Frontend (Client)
- **React.js** (Hooks)
- **Fetch API** for API calls
- **CSS** (Optional for styling)

### Backend (Server)
- **Django** (Python-based web framework)
- **Django REST Framework (DRF)** (For building APIs)
- **SQLite** (Default database for Django)
- **django-cors-headers** (For handling cross-origin requests)

---


---

## 💻 Installation & Setup

### 🔹 Backend & Frontend Setup (Combined)

```sh
# Clone the repository
git clone https://github.com/Sangam076/To-do-List.git
cd To-do-List

# Setup Backend (Django)
cd server
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver &  # Runs backend in the background

# Setup Frontend (React)
cd ../client
npm install
npm start

🌐 API Endpoints (Django REST Framework)
Method	Endpoint	Description
GET	/api/tasks/	Fetch all tasks
POST	/api/create/	Add a new task
PUT	/api/tasks/<id>/	Edit a task
DELETE	/api/tasks/<id>/	Delete a task

