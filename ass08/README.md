# SOFTHUE 

A full-featured e-commerce web application built from the ground up using the MERN (MongoDB, Express, React, Node.js) stack. This project includes core functionalities such as user authentication, product browsing, a shopping cart, and a complete checkout process.

It is a clothing store platform where users can browse through various products, add them to their cart, and checkout securely.
---

## 📸 Screenshots

Here is a gallery of the key pages in the application.

Homepage	

![alt text](frontend/src/assets/images/Homepage.png)

Product Page

![alt text](frontend/src/assets/images/ItemDetail.png)

Landing Page

![alt text](frontend/src/assets/images/landingPage.png)

Search

![alt text](frontend/src/assets/images/Search.png)

Shopping Cart	

![alt text](frontend/src/assets/images/CartPage.png)

Login Page

![alt text](frontend/src/assets/images/sigInPage.png)

Shipping Page	

![alt text](frontend/src/assets/images/ShippingPage.png)
![alt text](frontend/src/assets/images/OrderSummary.png)

Payment Page

![alt text](frontend/src/assets/images/PaymentMethod.png)

![alt text](frontend/src/assets/images/AfterpaymentStripe.png)

![alt text](frontend/src/assets/images/afterOrderCOD.png)
---

## ✨ Features

- **Full-featured shopping cart:** Add, update, and remove items.
- **Product browsing and search:** View all products and details for a single product.
- **User authentication:** Secure user registration and login using JWT (stored in HTTP-Only cookies).
- **Multi-step checkout process:**
  - Shipping address collection
  - Payment method selection
  - Order summary and placement
- **Protected routes:** For logged-in users only (e.g., shipping, payment).
- **Client-side state management:** Efficient state handling with Redux Toolkit and data caching with RTK Query.
- **Responsive UI:** Built with React-Bootstrap for a seamless experience on all devices.

---

## 🛠️ Tech Stack

### Frontend
- **React 18**
- **React Router** for client-side routing
- **Redux Toolkit** (including RTK Query) for state management & data fetching
- **React-Bootstrap** for UI components
- **Axios** for HTTP requests

### Backend
- **Node.js**
- **Express.js** framework
- **MongoDB** with **Mongoose** for database management
- **JSON Web Tokens (JWT)** for authentication
- **bcryptjs** for password hashing
- **Cookie-parser** for handling HTTP cookies

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, or a MongoDB Atlas connection string.

### Installation & Setup

1.  **Clone the repository**
    ```sh
    git clone https://github.com/vedikasharma2801/celebal.git
    cd celebal
    cd ass08
    ```

2.  **Setup Backend**
    ```sh
    # Navigate to the backend directory
    cd backend

    # Install dependencies
    npm install

    # Create a .env file in the 'backend' root
    # and add your environment variables
    touch .env
    ```

3.  **Setup Frontend**
    ```sh
    # Navigate to the frontend directory from the root
    cd frontend

    # Install dependencies
    npm install
    ```
3. **Seed the Database**

    ```sh
    # Run this command from inside the 'backend' folder
    npm run data:import
    ```

### 🚀Running the Application

1.  **Terminal 1: Run the Backend Server (from the backend directory)**

    ```sh
    npm run dev
    ```
    Your backend API will be running on http://localhost:5000.


2.  **Terminal 2: Run the Frontend Server (from the frontend directory)**

    ```sh
    npm run dev
    ```
    Your React application will be running on http://localhost:5173 (or another port if 5173 is busy).

### Environment Variables

You need to create a `.env` file in the `backend` directory. Use the `.env.example` below as a template.

```env
# .env.example

# --- Environment ---
NODE_ENV=development

# --- Server Port ---
PORT=5000

# --- Database ---
# Use your local MongoDB connection string
MONGO_URI=mongodb://127.0.0.1:27017/e-commerce

# --- JWT Secret ---
# Use a long, random string for security
JWT_SECRET=yourrandomsecretstring12345

# --- PAYPAL_CLIENT_ID ---
PAYPAL_CLIENT_ID=yourkey

# --- STRIPE_SECRET_KEY ---
STRIPE_SECRET_KEY=yourkey

