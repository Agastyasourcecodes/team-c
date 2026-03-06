# 🏛️ Civix: Digital Civic Engagement & Petition Platform

> **🚧 DEVELOPMENT BRANCH (`develop`) 🚧**
> This repository is currently in active development. Features, database schemas, and UI components are actively being built and integrated.

## 📖 Project Statement
**Civix** enables citizens to engage in local governance through petitions, voting, and tracking officials' responses. It fosters community-driven advocacy by allowing geo-targeted issues and public sentiment polling.

## ✨ Key Outcomes
* Users can easily create and sign petitions.
* Petitions are categorized and geo-tagged for local relevance.
* Users can vote in public sentiment polls to express their opinions.
* Officials and admins can track and officially respond to public interest.
* Transparency and accountability reports are generated automatically.

---

## 🗄️ Database Schema (MongoDB / Mongoose)

Since we are utilizing MongoDB, our data is structured into the following Mongoose collections:

**`Users`**
* `_id`: ObjectId
* `name`: String
* `email`: String (Unique)
* `password`: String (Hashed)
* `role`: String (Enum: `['citizen', 'official']`)
* `location`: String
* `timestamps`: createdAt, updatedAt

**`Petitions`**
* `_id`: ObjectId
* `creator_id`: ObjectId (Ref: `User`)
* `title`: String
* `description`: String
* `category`: String
* `location`: String
* `status`: String (Enum: `['active', 'under_review', 'closed']`)
* `timestamps`: createdAt, updatedAt

**`Signatures`**
* `_id`: ObjectId
* `petition_id`: ObjectId (Ref: `Petition`)
* `user_id`: ObjectId (Ref: `User`)
* `timestamp`: Date (Default: Date.now)

**`Polls`**
* `_id`: ObjectId
* `title`: String
* `options`: Array of Strings/Objects
* `created_by`: ObjectId (Ref: `User`)
* `target_location`: String
* `timestamps`: createdAt, updatedAt

**`Votes`**
* `_id`: ObjectId
* `poll_id`: ObjectId (Ref: `Poll`)
* `user_id`: ObjectId (Ref: `User`)
* `selected_option`: String
* `timestamp`: Date (Default: Date.now)

---

## 💻 How to Run the Project Locally

Follow these instructions to get your local development environment up and running.

### 1. Clone the repository
```bash
git clone [https://github.com/your-org/team-c.git](https://github.com/your-org/team-c.git)
cd team-c
git checkout develop
2. Set up the Backend
Open a terminal and navigate to the backend folder:

Bash
cd backend
npm install
Create the .env file:
In the root of the backend directory, create a file named .env and paste the following into it. (Make sure to replace the placeholder values with your actual MongoDB connection string and a secret key).

Code snippet
# backend/.env

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/civix?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
Start the backend server:

Bash
# Starts the server (use 'npm run dev' if you have nodemon installed)
npm start 
3. Set up the Frontend
Open a new terminal window and navigate to the frontend folder:


cd frontend
npm install
(Optional) If your backend is running on a port other than 5000, create a .env in the frontend folder:

Code snippet
# frontend/.env
REACT_APP_API_URL=http://localhost:5000/api
Start the React development server:


npm start
4. View the App
Once both servers are running, open your browser and navigate to:
http://localhost:3000

✅ Current Milestones & Evaluation Criteria
User System: Verified role-based user system is operational (Citizen vs. Official).

Petitions: Petition creation, filtering, and signing are fully implemented.
