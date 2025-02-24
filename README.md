# Internship Task - Ana Naunova

This project includes CRUD functionalities for users, projects, and tasks, using a MySQL database.

## Included in the Project im providing
- `backend/` - Backend code (Node.js, Express, Sequelize, MySQL)
- `frontend/` - Frontend code (React, Tailwind CSS)
- `database.sql` - Database export file (for importing into MySQL)
- `README.md` - Instructions to set up the project

##  Technologies I Used:

## Backend
- Node.js
- Express.js
- Sequelize (ORM)
- MySQL
- TypeScript

 ## Frontend-(Not working properly with the backend implementation)
- React
- Tailwind CSS
- Axios


## Steps for setting up the project locally

### 1.Clone the Repository

### 2.Import the Database
1. Open MySQL client or Workbench.
2. Create a new database (e.g., `internship_database`).
3. Import `database.sql` into the newly created database.

### 3.Set Up Environment Variables
Create a `.env` file inside the `backend/` folder and add the following:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=internship
DB_PORT=3306  
And a `.env` file inside the `frontend/` folder for the backend requests:
VITE_BACKEND_HOST=http://localhost:5001

### 4.Install Dependencies and start backend and frontend
Run the following inside both `backend/` and `frontend/` folders:
1.npm install
2.npm run dev