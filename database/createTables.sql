CREATE TABLE users (
	userId INT(5) AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(30) NOT NULL,
	lname VARCHAR(30) NOT NULL,
	email VARCHAR(50),
    password VARCHAR(200),
    isAdmin BOOLEAN DEFAULT FALSE,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product (
	productId INT(5) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description TINYTEXT,
    price DECIMAL(10,2),
    image MEDIUMTEXT,
    categoryId INT(5),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shopingCart (
	userId INT(5),
    productId INT(5),
    quantity INT,
    PRIMARY KEY (userId, productId) 
);

CREATE TABLE orders (
	orderId INT(10) AUTO_INCREMENT PRIMARY KEY,
    userId INT(5),
    address VARCHAR(500),
    totalPrice DECIMAL(10,2),
    status ENUM('pending', 'delivered', 'cancelled') DEFAULT 'pending',
    paymentMethod ENUM('creditCard', 'khalti', 'cashOnDelivery') DEFAULT 'cashOnDelivery',
    transactionId VARCHAR(100),
    paymentStatus ENUM('pending', 'completed') DEFAULT 'pending',
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productsInOrder (
	orderId INT(5),
    productId INT(5),
    quantity INT,
    totalPrice DECIMAL(10,2),
    paid BOOLEAN DEFAULT FALSE,
    status ENUM('pending', 'delivered', 'cancelled') DEFAULT 'pending',
    PRIMARY KEY (orderId, productId) 
);

CREATE TABLE Category (
    categoryId INT(5) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    image MEDIUMTEXT
);


ALTER TABLE shopingCart
ADD FOREIGN KEY (userId) REFERENCES users (userId),
ADD FOREIGN KEY (productId) REFERENCES product (productId);

ALTER TABLE orders
ADD FOREIGN KEY (userId) REFERENCES users (userId);

ALTER TABLE productsInOrder
ADD FOREIGN KEY (orderId) REFERENCES orders (orderId),
ADD FOREIGN KEY (productId) REFERENCES product (productId);

ALTER TABLE product
ADD FOREIGN KEY (categoryId) REFERENCES Category (categoryId);