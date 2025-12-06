# Craft Heart Connect

A full-stack handmade crafts marketplace built with React, Node.js, Express, and MongoDB.

## Features
- **Authentication**: JWT + Refresh Tokens (httpOnly cookies), Role-Based Access Control (Buyer, Seller, Admin).
- **Commerce**: Product CRUD, Image Uploads (Cloudinary), Cart, Cash on Delivery (COD).
- **Advanced**: Geo-spatial search for craft map, AI Chatbot (OpenAI), Email Notifications (SendGrid).

## Project Structure
- `backend/`: Node.js + Express server.
- `src/`: React frontend (Vite).

## Local Development

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account
- Cloudinary Account
- SendGrid Account (Optional for emails)
- OpenAI API Key (Optional for chat)

### 1. Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file based on `.env.example`:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=secret
    JWT_REFRESH_SECRET=refresh_secret
    CLOUDINARY_CLOUD_NAME=...
    CLOUDINARY_API_KEY=...
    CLOUDINARY_API_SECRET=...
    OPENAI_API_KEY=...
    SENDGRID_API_KEY=...
    EMAIL_FROM=...
    FRONTEND_URL=http://localhost:5173
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```

### 2. Frontend Setup
1.  Navigate to the root directory (in a new terminal):
    ```bash
    cd ..
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file based on `.env.example`:
    ```env
    VITE_API_URL=http://localhost:5000
    ```
4.  Start the frontend:
    ```bash
    npm run dev
    ```

### 3. Verification
- Open `http://localhost:5173`.
- Register a new user.
- Check the browser DevTools -> Application -> Cookies to see the `jwt` cookie.

## Deployment

### 1. Backend (Render)
1.  Create a new Web Service on Render connected to your repo.
2.  Root Directory: `backend`.
3.  Build Command: `npm install`.
4.  Start Command: `node server.js`.
5.  **Environment Variables**: Add all variables from `backend/.env.example`.
    - **Crucial**: Set `FRONTEND_URL` to your Vercel URL (e.g., `https://your-app.vercel.app`).

### 2. Frontend (Vercel)
1.  Import your repo into Vercel.
2.  **Environment Variables**:
    - `VITE_API_URL`: Your Render Backend URL (e.g., `https://your-app.onrender.com`).
3.  Deploy.

### 3. Production Verification
- Login on the deployed Vercel app.
- Ensure the `jwt` cookie is set (it will be `Secure` and `SameSite=None`).
- Test a protected route (e.g., Profile or Create Product).
