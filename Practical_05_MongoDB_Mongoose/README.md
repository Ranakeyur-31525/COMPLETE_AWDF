# Practical 5: MongoDB Integration and Schema Design with Mongoose

**Course:** Advanced Web Development Frameworks (ITUE301)  
**Institution:** Charotar University of Science and Technology (CHARUSAT) - CSPIT (IT)  
**Semester:** 5th Semester  
**Student:** Ranak (Ranakeyur-31525)  

---

## 📌 Objective
To connect a local MongoDB database (`taskdb`) to an Express REST API backend server using Mongoose ODM, design a schema with data types, default values, and pre-save hooks, and enforce robust validation error responses.

---

## 🛠️ MongoDB Compass & Local Database Setup

1. **MongoDB Connection String:**  
   `mongodb://127.0.0.1:27017/taskdb`

2. **MongoDB Compass Connection Instructions:**
   - Open **MongoDB Compass** on your computer.
   - Click **New Connection**.
   - Paste the connection string: `mongodb://127.0.0.1:27017`
   - Click **Connect**.
   - You will see the **`taskdb`** database and the **`tasks`** collection.
   - You can view, add, edit, or delete documents directly in MongoDB Compass while testing the Express server.

---

## 🚀 Features Implemented

1. **Database Connection:** Connected Express to local MongoDB via `mongoose.connect()` using environment variables defined in `.env`.
2. **Task Schema (`models/Task.js`):**
   - `title`: String (Required, trimmed automatically via pre-save hook, minlength 2)
   - `description`: String (Default: empty string)
   - `completed`: Boolean (Default: `false`)
   - `priority`: String (Enum: `['low', 'medium', 'high']`, Default: `'medium'`)
   - `createdAt`: Date (Default: `Date.now`)
3. **Mongoose Pre-Save Hook:** Automatically trims leading and trailing whitespace from task titles before saving to database.
4. **Complete RESTful CRUD Endpoints (`routes/taskRoutes.js`):**
   - `GET /tasks` - Retrieve all tasks (supports query filtering by `completed`, `priority`, and `search`).
   - `GET /tasks/:id` - Retrieve single task by Mongoose ObjectId (returns 404 JSON response if not found).
   - `POST /tasks` - Create a new task document in MongoDB via `Task.create()`.
   - `PUT /tasks/:id` - Update existing task document via `Task.findByIdAndUpdate()` with `{ runValidators: true }`.
   - `DELETE /tasks/:id` - Remove task document from MongoDB via `Task.findByIdAndDelete()`.
5. **Centralized Middleware Pipeline (`server.js`):**
   - **Request Logger Middleware:** Logs request method, URL, and timestamp (`[TIMESTAMP] METHOD URL`).
   - **JSON & CORS Middleware:** `express.json()` and `cors()`.
   - **404 Route Handler:** Catches requests to non-existent endpoints.
   - **Global Error Handler:** Catches Mongoose `ValidationError` and `CastError`, formatting clean JSON error responses instead of unhandled crashes.

---

## 📁 Folder Structure

```
P05_/
├── models/
│   └── Task.js              # Mongoose Task schema with validation & pre-save hook
├── routes/
│   └── TaskRoutes.js        # Express router with Task CRUD endpoints
├── .env                     # MongoDB URI & Port environment variables
├── .env.example             # Template for environment variables
├── .gitignore               # Excludes node_modules & .env
├── package.json             # Dependencies and npm scripts
├── seed.js                  # Database seed script for MongoDB Compass testing
├── server.js                # Express server entry point with middleware & Mongoose connection
└── README.md                # Practical 5 documentation
```

---

## 🧪 Testing the API

### 1. Seed Initial Data
To populate MongoDB with sample tasks for viewing in MongoDB Compass:
```bash
npm run seed
```

### 2. Start the Server
```bash
npm run dev
# or
npm start
```
The server runs on: `http://localhost:5000`

### 3. API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `http://localhost:5000/` | Root health check & DB status |
| `GET` | `http://localhost:5000/tasks` | Get all tasks |
| `GET` | `http://localhost:5000/tasks?priority=high` | Filter tasks by priority (`low`/`medium`/`high`) |
| `GET` | `http://localhost:5000/tasks?completed=true` | Filter tasks by status |
| `GET` | `http://localhost:5000/tasks/:id` | Get task by ID |
| `POST` | `http://localhost:5000/tasks` | Create new task |
| `PUT` | `http://localhost:5000/tasks/:id` | Update task by ID |
| `DELETE` | `http://localhost:5000/tasks/:id` | Delete task by ID |

---

## ⚡ Example Request Payloads

### POST /tasks (Create Task)
```json
{
  "title": "  Learn MongoDB Schema Validation  ",
  "description": "Enforce required fields and enum constraints in Mongoose.",
  "priority": "high",
  "completed": false
}
```

### Response (201 Created):
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "67a435485e11954912f065c0",
    "title": "Learn MongoDB Schema Validation",
    "description": "Enforce required fields and enum constraints in Mongoose.",
    "completed": false,
    "priority": "high",
    "createdAt": "2026-08-06T12:48:00.000Z"
  }
}
```

### Error Testing (Validation Failure):
Sending a POST request without a `title`:
```json
{
  "description": "Missing title test"
}
```
**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Validation Error",
  "details": [
    "Task title is required"
  ]
}
```
