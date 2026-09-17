# Practical 4: Building a RESTful API with Node.js and Express

**Course:** Advanced Web Development Frameworks (ITUE301)  
**Institution:** Charotar University of Science and Technology (CHARUSAT) - CSPIT (IT)  
**Semester:** 5th Semester  
**Student:** Ranak (Ranakeyur-31525)  

---

## 📌 Objective
To design and implement a RESTful backend server for a Task Management system using Node.js and Express, with full CRUD endpoints, custom middleware logging, header validation, ID verification, and centralized error handling.

---

## 🚀 Features Implemented

1. **RESTful CRUD Operations:**
   - `GET /tasks`: Retrieve all tasks (supports query parameters for `completed`, `priority`, and `search`).
   - `GET /tasks/:id`: Retrieve a specific task by numeric ID.
   - `POST /tasks`: Create a new task (returns HTTP 201 Created).
   - `PUT /tasks/:id`: Update an existing task by ID (returns HTTP 200 OK).
   - `DELETE /tasks/:id`: Remove a task by ID (returns HTTP 200 OK).

2. **Middleware Pipeline:**
   - **Global Request Logger (`loggerMiddleware`):** Logs HTTP method, URL, and timestamp (`[TIMESTAMP] METHOD URL`).
   - **Header Validation (`requireJsonHeader`):** Rejects `POST` / `PUT` requests missing `Content-Type: application/json`.
   - **ID Validation (`validateTaskId`):** Validates that URL route parameter `:id` is a valid positive integer.
   - **404 Route Handler:** Catches unhandled routes and returns structured JSON error responses.
   - **Global Error Handler:** Centralized exception handler defined at the end of the middleware chain.

3. **HTTP Status Codes Used:**
   - `200 OK` - Successful GET, PUT, DELETE operations.
   - `201 Created` - Successful POST task creation.
   - `400 Bad Request` - Missing title, invalid ID format, or missing Content-Type header.
   - `404 Not Found` - Non-existent task ID or unmapped route URL.
   - `500 Internal Server Error` - Unhandled server exceptions caught by global error middleware.

---

## 📁 Folder Structure

```
P04_MONGODB/
├── middleware/
│   └── customMiddleware.js   # Request logger, Content-Type, and ID validation
├── routes/
│   └── taskRoutes.js         # REST API CRUD route handlers with in-memory storage
├── .env                      # Environment variables (PORT=4000)
├── .env.example              # Environment template
├── .gitignore                # Git exclusions (node_modules, .env)
├── package.json              # Project dependencies & scripts
├── server.js                 # Express server initialization & middleware pipeline
└── README.md                 # Practical 4 documentation
```

---

## 🧪 Quick Start & Testing

### 1. Run Server
```bash
npm run dev
# or
npm start
```
The server runs on: `http://localhost:4000`

---

### 2. API Endpoints Table

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `http://localhost:4000/` | Health check & API documentation | 200 OK |
| `GET` | `http://localhost:4000/tasks` | Get all tasks | 200 OK |
| `GET` | `http://localhost:4000/tasks?completed=true` | Filter completed tasks | 200 OK |
| `GET` | `http://localhost:4000/tasks?priority=high` | Filter by priority (`low`/`medium`/`high`) | 200 OK |
| `GET` | `http://localhost:4000/tasks/:id` | Get single task by ID | 200 OK / 404 Not Found |
| `POST` | `http://localhost:4000/tasks` | Create new task | 201 Created / 400 Bad Request |
| `PUT` | `http://localhost:4000/tasks/:id` | Update task by ID | 200 OK / 400 Bad Request / 404 |
| `DELETE` | `http://localhost:4000/tasks/:id` | Delete task by ID | 200 OK / 404 Not Found |

---

## ⚡ Sample Payloads & Testing Commands

### 🔹 Create Task (POST)
**Endpoint:** `POST /tasks`  
**Header:** `Content-Type: application/json`  
**Body:**
```json
{
  "title": "Setup Express REST API",
  "description": "Build CRUD endpoints with custom middleware.",
  "priority": "high",
  "completed": false
}
```

### 🔹 Update Task (PUT)
**Endpoint:** `PUT /tasks/1`  
**Header:** `Content-Type: application/json`  
**Body:**
```json
{
  "completed": true,
  "priority": "medium"
}
```

### 🔹 Invalid ID Error Test
**Endpoint:** `GET /tasks/abc`  
**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Invalid Task ID format",
  "details": "Task ID 'abc' must be a positive integer"
}
```
