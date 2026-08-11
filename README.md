# 🎮 CodeQuest

> **A gamified, personalized, and engaging coding platform that helps users stay consistent, improve efficiency, and achieve their coding goals.**

**Submission by Team CodeQuest to PVG Ignite Hackverse Hackathon – 2026**

🚀 **Deployed on AWS**

---

## 📌 Overview

**CodeQuest** is a gamified coding platform designed to make coding practice more engaging, personalized, and consistent.

Instead of treating coding practice as a collection of isolated problems, CodeQuest turns the learning process into a **goal-oriented and interactive experience**.

Users can practice coding problems, track their progress, maintain consistency, and receive personalized insights based on their performance.

The platform combines:

* 🎯 Personalized coding goals
* 🎮 Gamification
* 📊 Performance tracking
* 🧠 Machine Learning-based personalization
* 🔥 Streaks and consistency tracking
* 📈 Progress analytics
* 🏆 Achievements and rewards

---

## ✨ Key Features

### 🎯 Personalized Learning

CodeQuest analyzes the user's coding activity and performance to provide a more personalized learning experience.

The system considers factors such as:

* Problem-solving performance
* Difficulty levels
* Previous attempts
* Coding consistency
* Topic-wise performance

This helps users focus on areas where they need improvement.

---

### 🎮 Gamification

Coding practice is converted into a gamified experience using:

* XP / points
* Levels
* Achievements
* Streaks
* Progress tracking
* Goals and challenges

The goal is to make users more motivated to practice consistently.

---

### 🔥 Coding Streaks

Users can maintain daily coding streaks and monitor their consistency.

Streak-based mechanisms encourage users to build a regular coding habit rather than practicing only occasionally.

---

### 📊 Performance Analytics

Users can track their coding progress through performance statistics such as:

* Problems solved
* Problems attempted
* Success rate
* Difficulty-wise performance
* Topic-wise performance
* Coding streak
* XP earned
* Overall progress

---

### 🧠 ML-Based Personalization

CodeQuest incorporates Machine Learning to analyze user behavior and provide personalized recommendations.

The model can use user activity and performance-related features to identify patterns and help determine:

* Suitable problem difficulty
* Topics requiring more practice
* User performance trends
* Personalized learning recommendations

This allows the platform to move beyond a one-size-fits-all coding experience.

---

## 🏗️ System Architecture

The application follows a client-server architecture:

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │       (UI)          │
                    └──────────┬──────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Node.js Backend   │
                    │      Express        │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
        ┌────────────┐  ┌────────────┐  ┌────────────┐
        │ PostgreSQL │  │ ML Module  │  │   Auth /   │
        │  Database  │  │            │  │ User Data  │
        └────────────┘  └────────────┘  └────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript / TypeScript
* HTML5
* CSS3
* REST API integration

### Backend

* Node.js
* Express.js
* REST APIs
* Authentication & authorization

### Database

* PostgreSQL
* Prisma ORM

### Machine Learning

* Python
* Scikit-learn
* Pandas
* NumPy

### Deployment

* AWS EC2
* Linux / Ubuntu
* Git & GitHub
* Node.js
* Nginx

---

## 📂 Project Structure

```text
CodeQuest/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── prisma/
│   ├── package.json
│   └── ...
│
├── ml/
│   ├── models/
│   ├── notebooks/
│   ├── scripts/
│   └── ...
│
├── README.md
└── .gitignore
```

> Adjust the folder names above to match the actual repository structure.

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>

cd CodeQuest
```

---

## 2. Setup the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_secret_key"
```

Run database migrations if Prisma is being used:

```bash
npx prisma migrate deploy
```

Generate Prisma Client:

```bash
npx prisma generate
```

Start the backend:

```bash
npm run dev
```

The backend should now be available at:

```text
http://localhost:5000
```

---

# 💻 Frontend Setup

Open a new terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create the required environment file:

```env
VITE_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The frontend should now be available at:

```text
http://localhost:5173
```

---

# 🗄️ Database Setup

CodeQuest uses **PostgreSQL** for storing application data.

The database stores information such as:

* User accounts
* Coding activity
* Problems
* Attempts
* Scores
* XP
* Streaks
* Achievements
* User progress

If Prisma is used, database schema changes can be managed using:

```bash
npx prisma migrate dev
```

For production:

```bash
npx prisma migrate deploy
```

---

# ☁️ AWS Deployment

CodeQuest is deployed on **Amazon Web Services (AWS)** using an **EC2 instance**.

The following steps describe the deployment process.

## 1. Create an AWS EC2 Instance

1. Log in to the AWS Management Console.
2. Open **EC2**.
3. Click **Launch Instance**.
4. Select an Ubuntu AMI.
5. Select an appropriate instance type.
6. Create/select a key pair.
7. Configure the security group.

The required ports are typically:

| Port | Purpose                            |
| ---- | ---------------------------------- |
| 22   | SSH                                |
| 80   | HTTP                               |
| 443  | HTTPS                              |
| 5000 | Backend during development/testing |

For production, the backend port does not necessarily need to be publicly exposed if Nginx is used as a reverse proxy.

---

## 2. Connect to the EC2 Instance

From your local machine:

```bash
ssh -i "your-key.pem" ubuntu@YOUR_EC2_PUBLIC_IP
```

Example:

```bash
ssh -i "codequest.pem" ubuntu@12.34.56.78
```

---

## 3. Update the Server

```bash
sudo apt update
sudo apt upgrade -y
```

---

## 4. Install Git

```bash
sudo apt install git -y
```

Verify:

```bash
git --version
```

---

## 5. Install Node.js

Install Node.js and npm on the EC2 instance.

Verify:

```bash
node -v
npm -v
```

---

## 6. Clone the Project

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate into the project:

```bash
cd CodeQuest
```

---

# ⚙️ Backend Deployment

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create the production environment file:

```bash
nano .env
```

Add the required environment variables:

```env
PORT=5000
DATABASE_URL="your_production_database_url"
JWT_SECRET="your_production_secret"
```

Generate Prisma Client:

```bash
npx prisma generate
```

Apply production migrations:

```bash
npx prisma migrate deploy
```

Build the backend if your project requires a build step:

```bash
npm run build
```

---

# ▶️ Running the Backend on AWS

Running the backend directly with:

```bash
npm start
```

would stop the application when the SSH session ends.

Therefore, a process manager such as **PM2** can be used.

Install PM2:

```bash
sudo npm install -g pm2
```

Start the backend:

```bash
pm2 start npm --name "codequest-backend" -- start
```

Check the application:

```bash
pm2 status
```

View logs:

```bash
pm2 logs codequest-backend
```

Save the process:

```bash
pm2 save
```

Configure PM2 to restart automatically after server reboot:

```bash
pm2 startup
```

Run the command generated by PM2.

---

# 🌐 Frontend Deployment

Navigate to the frontend:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Update the production API URL:

```env
VITE_API_URL=http://YOUR_EC2_PUBLIC_IP/api
```

Build the React application:

```bash
npm run build
```

This generates the production files, usually inside:

```text
dist/
```

---

# 🔀 Nginx Configuration

Nginx can be used as a reverse proxy and web server.

Install Nginx:

```bash
sudo apt install nginx -y
```

Start Nginx:

```bash
sudo systemctl start nginx
```

Enable it on startup:

```bash
sudo systemctl enable nginx
```

Copy the frontend build into the Nginx web directory:

```bash
sudo cp -r dist/* /var/www/html/
```

---

## Reverse Proxy for Backend

Configure Nginx:

```bash
sudo nano /etc/nginx/sites-available/codequest
```

A typical configuration is:

```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_EC2_IP;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the configuration:

```bash
sudo ln -s /etc/nginx/sites-available/codequest \
/etc/nginx/sites-enabled/codequest
```

Test the configuration:

```bash
sudo nginx -t
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

Now Nginx serves the frontend and forwards API requests to the Node.js backend.

---

# 🔐 Environment Variables

Sensitive information should **never be committed to GitHub**.

The following should be stored in environment variables:

```env
DATABASE_URL=
JWT_SECRET=
API_KEY=
VITE_API_URL=
```

Add `.env` to `.gitignore`:

```gitignore
.env
.env.local
.env.production
node_modules/
dist/
```

---

# 🔄 Updating the AWS Deployment

Whenever changes are pushed to GitHub:

```bash
cd CodeQuest
git pull origin main
```

Update backend:

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
pm2 restart codequest-backend
```

Update frontend:

```bash
cd ../frontend
npm install
npm run build
sudo cp -r dist/* /var/www/html/
```

Restart Nginx if required:

```bash
sudo systemctl restart nginx
```

---

# 📈 Future Enhancements

* 🤖 More advanced ML-based recommendations
* 🧑‍💻 Online code execution environment
* 🏆 Global and friend leaderboards
* 👥 Social coding challenges
* 📱 Mobile application
* 🔔 Personalized reminders
* 🧠 Adaptive difficulty
* 📊 More detailed learning analytics
* 🌐 Custom domain with HTTPS
* ⚡ Automated CI/CD deployment using GitHub Actions

---

# 👩‍💻 Team

**Team CodeQuest**
PVG Ignite Hackverse Hackathon – 2026

---

# 📜 License

This project was developed as part of the **PVG Ignite Hackverse Hackathon – 2026**.

---

## ⭐ Acknowledgements

We would like to thank **PVG College of Engineering and Technology / PICT** and the organizers of **PVG Ignite Hackverse 2026** for providing the platform and opportunity to build and showcase CodeQuest.

---


