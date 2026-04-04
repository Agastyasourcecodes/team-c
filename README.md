# 🏛️ Civix: Digital Civic Engagement & Petition Platform

🚀 **MAIN BRANCH (Production)**
This is the fully completed, production-ready repository for the Civix platform. All core milestones, role-based dashboards, and governance features have been integrated and tested.

---

## 🌐 Live Application

👉 **[Civix Live App](#)** *(Replace `#` with your actual live URL)*

---

## 📖 Project Statement

**Civix** enables citizens to engage in local governance through petitions, voting, and tracking officials' responses. It fosters community-driven advocacy by allowing geo-targeted issues and public sentiment polling.

---

## ✨ Key Features

### 👤 For Citizens

* 🔐 Authentication (secure login & signup)
* 📝 Create, edit, and sign petitions
* 📊 Participate in polls & sentiment tracking
* 📍 Filter petitions by category & location
* 📌 Track petition status (Active / Under Review / Closed)

### 🏛️ For Officials

* 📊 Governance dashboard (jurisdiction-based)
* 🛠️ Respond to petitions & update status
* 💬 Add official comments
* 📈 View analytics & public sentiment reports

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Auth:** JWT (JSON Web Tokens)

---

## 🗄️ Database Schema

### Users

* `_id`: ObjectId
* `name`: String
* `email`: String (Unique)
* `password`: String (Hashed)
* `role`: citizen | official
* `location`: String

### Petitions

* `_id`: ObjectId
* `creator_id`: Ref(User)
* `title`: String
* `description`: String
* `category`: String
* `location`: String
* `status`: active | under_review | closed

### Signatures

* `_id`: ObjectId
* `petition_id`: Ref(Petition)
* `user_id`: Ref(User)
* `timestamp`: Date

### Polls

* `_id`: ObjectId
* `title`: String
* `options`: [{ optionText, votes }]
* `created_by`: Ref(User)
* `target_location`: String

### Votes

* `_id`: ObjectId
* `poll_id`: Ref(Poll)
* `user_id`: Ref(User)
* `selected_option`: String

### Comments

* `_id`: ObjectId
* `petition_id`: Ref(Petition)
* `user_id`: Ref(User)
* `text`: String

---

## 💻 Run Locally

### 1️⃣ Clone Repo

```bash
git clone https://github.com/your-org/team-c.git
cd team-c
git checkout main
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Run server:

```bash
npm start
# or
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

(Optional `.env`)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Run app:

```bash
npm start
```

---

### 4️⃣ Open App

👉 http://localhost:3000

---

## 🔮 Future Enhancements

* 🤖 AI-based complaint categorization (NLP)
* 🚨 Urgency detection via sentiment analysis
* 🔁 Duplicate petition detection
* 📊 Smarter governance analytics

---

## 👨‍💻 Author

Agastya Maurya

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!

