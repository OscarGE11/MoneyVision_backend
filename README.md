# MoneyVision Backend
MoneyVision is a comprehensive platform for managing personal finances and investments. Track expenses, manage budgets, monitor investment portfolios, and achieve financial goals with ease.

## Description
The backend is built with Node.js, Express, and MongoDB. It provides a robust API for managing users, transactions, and categories. It uses Mongoose to interact with MongoDB and several other libraries to enhance security, performance, and development efficiency.

## Dependencies
The project uses the following dependencies:

- **bcryptjs**: For password hashing.
- **dotenv**: To load environment variables from a `.env` file.
- **express**: Web framework for Node.js.
- **jsonwebtoken**: To generate and verify JWT tokens.
- **mongoose**: ODM for MongoDB.
- **morgan**: HTTP request logger middleware.

## Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/moneyvision-backend.git
    cd moneyvision-backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables:
    Create a `.env` file in the root of the project with the following content:
    ```env
    MONGODB_URI=mongodb://localhost:27017/moneyvision
    JWT_SECRET=your_jwt_secret
    ```

## Starting the Server

1. Ensure MongoDB is running:
    ```bash
    sudo systemctl start mongod
    ```

2. Start the server:
    ```bash
    npm run dev
    ```

The server will be available at `http://localhost:3000`.
