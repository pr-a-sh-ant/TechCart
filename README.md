# Project Title

TechCart Project

## Description

This project is an E-commerce platform designed to provide users with a convenient and seamless shopping experience. It aims to offer computer-related items with ease.

## Technologies Used

### Frontend:

- HTML, CSS, JavaScript
- React.js (frontend library)
- Tailwind CSS

### Backend:

- Node.js
- Express.js
- MySQL (database)

### Authentication:

- JSON Web Tokens (JWT)

### Other tools:

- Git (for version control)

## Setup Instructions

### Server Setup:

1. Navigate to the server directory:

   ```sh
   cd server
   ```

2. Install the required dependencies:

   ```sh
   npm install
   ```

3. Start the server:

   ```sh
   npm run start
   ```

4. To start the server in debug mode:
   ```sh
   npm run debug
   ```

- Ensure you have the correct `.env` file configured. Structure of env file is given in readme file of server

### Client Setup:

1. Navigate to the client directory:

   ```sh
   cd client/
   ```

2. Install the required dependencies:

   ```sh
   npm install
   ```

3. Start the client:
   ```sh
   npm run start
   ```

- Ensure you have the correct `.env` file configured.

### Database Setup:

We are using MySQL in this project.

1. In the `database` folder, the file `createTables.sql` contains detail about all out tables.

2. In server the code in this file is executed

## Folder Structure

```
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── ...
├── database/
│   ├── createTables.sql
│   └── ...
└── README.md
```

## Important Pages

You can add pictures of some important pages here for better understanding:

![Home Page](path/to/homepage.png)
![Product Page](path/to/productpage.png)
![Cart Page](path/to/cartpage.png)
