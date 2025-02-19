# Server Documentation

## Overview

This document provides an overview of the server setup and configuration for the TechCart project.

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pr-a-sh-ant/TechCart.git
   ```
2. Navigate to the server directory:
   ```bash
   cd TechCart/server
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Server

To start the server, run:

```bash
npm start
```

To start the server in debug, run:

```bash
npm run debug
```

## Environment Variables

Create a `.env` file in the root of the server directory with the following structure:

```plaintext
# if you have local mysql setup make this flag true
USE_LOCALHOST=true
PORT=3001

# You dont need all this variable for local setup and this setup is for hosting in aiven
DB_SERVER_USER=youdbuser
DB_SERVER_HOST=yourdbhostlink
DB_SERVER_PASSWORD=yourdbpassword
DB_SERVER_DATABASE=yoourdbname
DB_SERVER_PORT=youdbport
DB_SERVER_CA = "your certificate inside this double inverted comma"

# Add config keys as per your app
JWT_SECRET_KEY_ACCESS_TOKEN=jwtsecret
JWT_SECRET_KEY_REFRESH_TOKEN=yoursecretforrefresh

CLOUDINARY_SECRET= yourcloudinarysecret
```

## API Endpoints

- protected - used to protect the route for authenticated user only
- restricted - used to restrict route to Admin user only

### Auth

- `POST /api/auth/login` - Logging in User
- `POST /api/auth/register` - Registering User

### Products

- `GET /api/products` - Retrieve a list of products
- `GET /api/products/categoryproduct` - Retrieve a list of products with their category
- `POST /api/products/create` - Create a new product (protected and restriced)
- `GET /api/products/:id` - Retrieve a specific product by ID
- `PUT /api/products/update/:id` - Update a specific product by ID (protected and restriced)
- `DELETE /api/products/delete/:id` - Delete a specific product by ID (protected and restriced)

### Users

- `GET /api/users/getuser` - Retrieve a list of users (protected and restriced)
- `PUT /api/users/update/:id` - Update user role to admin (protected and restriced)
- `DELETE /api/users/:id` - Delete a specific user by ID (protected and restriced)

### Orders

- `GET /api/orders` - Retrieve a list of all orders (protected and restriced)
- `GET /api/orders/myPastOrders/:id` - Get order of certain user(protected)
- `DELETE /api/orders/delete/:id` - Delete a order (protected and restricted)

### Cart

- `GET /api/cart/:userId` - Get detail about user cart (protected)
- `POST /api/cart/add` - Create a shopping cart for the user (protected)
- `DELETE api/cart/remove/:productId/:userId` - Delete a product from the usercart and also delete the usercart for the table (protected)
- `POST api/cart/buy` - Create a order and productInOrder where the data of shopping cart is transfered to the productInOrder and the order is created with that productInOrder and shopping cart is dropped (protected)

### Category \categories

- `GET /api/categories` - Get all the categories
- `POST /api/categories/create` - Create a new category (protected and restricted)
- `DELETE /api/categories/delete/:id` - Delete a category (protected and restricted)

### Token

- `POST /api/token/refreshToken` - Create a new accesss token from refresh token (protected)
