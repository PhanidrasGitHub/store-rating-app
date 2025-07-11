# Store Rating App

A full-stack web application that enables users to register, log in, browse stores, submit ratings, and manage store data. Admins and store owners have role-specific dashboards to view and manage information securely.

---

##  Features

- User authentication with JWT
- Role-based access: User, Admin, Store Owner
- Submit ratings with comments
- Admin dashboard with user/store/statistics management
- Responsive UI built with Tailwind CSS + React
- RESTful API backend with Node.js + Express
- MySQL database integration

---

## Technologies Used

### Frontend:
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend:
- Node.js
- Express.js
- MySQL (via mysql2)
- JWT Authentication
- dotenv for environment config

### Tools:
- Postman for API testing
- GitHub for version control

---

##  Database Schema

>users

id (PK)

username

email

password

role (user | admin | store-owner)

address

stores

id (PK)

name

address

owner_id (FK -> users.id)

ratings

id (PK)

store_id (FK -> stores.id)

user_id (FK -> users.id)

rating (1-5)

comment


---

## Setup & Run Locally

### Prerequisites
- Node.js
- MySQL
- npm/yarn

### Backend Setup

```bash
cd backend
npm install 
nodemon server.js


.env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=store_rating
JWT_SECRET=your_jwt_secret


cd frontend
npm install
npm start


API Documentation
All endpoints are prefixed with /api

Auth Routes
POST /api/auth/login

GET /api/auth/me

User Routes
POST /api/users/signup

GET /api/users

GET /api/admins

Store Routes
GET /api/stores

POST /api/stores (owner only)

Ratings Routes
POST /api/ratings

GET /api/ratings/:storeId

Dashboard
GET /api/dashboard-stats

See Postman Collection in docs/API.postman_collection.json



---

###  Next Steps

- Place `DatabaseSchema.txt` and optional `API.postman_collection.json` in `/docs/`
- Format and lint code using Prettier or ESLint
- Add GitHub Actions or testing scripts if needed

Let me know if you'd like the `DatabaseSchema.txt` or `.env.example` file written too.
