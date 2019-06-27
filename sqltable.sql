create database ganeptunedb;
use ganeptunedb;

create table administrator (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(80) NOT NULL,
    full_name VARCHAR(80) NOT NULL,
    auth_level INT DEFAULT "01101101",
    createdAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE users;
create table users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    nama_depan VARCHAR(30),
    nama_belakang VARCHAR(30),
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(80) NOT NULL,
    auth_level INT DEFAULT "0",
    profil binary,
    alamat VARCHAR(200),
    createdAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* INSERT INTO users (username, nama_lengkap, email, password) VALUES SET ?; */

create table products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_produk VARCHAR(50) NOT NULL,
    deskripsi VARCHAR (200),
    harga INT NOT NULL,
    kategori VARCHAR(20),
    foto binary,
    createdAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table carts (
    id_cart INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    id_product INT,
    jumlah INT,
    createdAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table history (
	id_history INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    id_product INT,
    id_cart INT,
    createdAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;

#SELECT * FROM users WHERE username = "Adit" AND password = "1234";

INSERT INTO users (username, email, password) VALUES ('Adit','adit@mail.com','1234');