**Food for Foodies**
Food for Foodies is a full-stack web application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. This project allows users to explore a variety of recipes, submit their own, and interact with other food enthusiasts.

**Table of Contents**
1. Features
2. Installation
3. Usage
4. API Endpoints
5. Contributing

**Features**
- Browse and search for recipes.
- Submit new recipes and manage your submissions.
- User authentication and authorization.
- Interactive user interface with React.js.
- Backend API built with Express.js and Node.js.
- Persistent data storage with MongoDB.

**Installation**

**Prerequisites**
- Node.js (v14.x or later)
- npm or yarn
- Clone the Repository

bash
Copy code

git clone https://github.com/shiv0412/Foodforfoodies-MERN.git

cd Foodforfoodies-MERN

Setup Backend

Navigate to the server directory:

cd server

Install the required dependencies:

npm install

Create a .env file in the server directory and add your MongoDB connection string:

env

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

Start the backend server:

npm start

Setup Frontend

Navigate to the client directory:

cd ../client

Install the required dependencies:

npm install

Start the React development server:

npm start

The application should now be running on http://localhost:3000.

**Usage**
- Home Page: Explore the list of recipes and search for specific dishes.
- Recipe Submission: Sign in to submit new recipes and manage your submissions.
- User Authentication: Sign up and log in to manage your account and recipes.

**API Endpoints**
Authentication

POST /api/auth/register - Register a new user.

POST /api/auth/login - Log in an existing user.

Recipes

GET /api/recipes - Retrieve a list of recipes.

POST /api/recipes - Submit a new recipe.

GET /api/recipes/:id - Retrieve a specific recipe by ID.

PUT /api/recipes/:id - Update a specific recipe by ID.

DELETE /api/recipes/:id - Delete a specific recipe by ID.

**Contributing**
- Fork the repository.
- Create a new branch (git checkout -b feature/YourFeature).
- Commit your changes (git commit -am 'Add new feature').
- Push to the branch (git push origin feature/YourFeature).
- Create a new Pull Request.
