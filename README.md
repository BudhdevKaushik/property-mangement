# Property Management - MERN Stack Project (Next.js + Node.js + MongoDB)

## 🚀 Getting Started

Follow the steps below to run the project locally.

---

### 📦 Step 1: Install Dependencies

Open terminal and run the following commands in both `frontend` and `backend` folders:

```bash
cd frontend
npm install

cd ../backend
npm install


### 📦 Step 2: Add Environment Variables

a). Create a .env file inside the backend folder:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string


b). Create a .env.local file inside the frontend folder:

    NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api



### ▶️ Step 3: Run the Application

a). Backend:  

    cd backend
    npm run dev


b). Frontend:

    cd frontend
    npm run dev


Project Structure

/frontend   → Next.js frontend (React)
/backend    → Node.js backend with Express & MongoDB
