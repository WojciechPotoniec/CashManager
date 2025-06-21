-- --- STRUTTURA DEL DATABASE ---
DROP DATABASE IF EXISTS `cashmanager_db`;
CREATE DATABASE `cashmanager_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `cashmanager_db`;


-- --- TABELLA: categories ---
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
                              `id` INT(11) NOT NULL AUTO_INCREMENT,
                              `name` VARCHAR(100) NOT NULL,
                              `isActive` BOOLEAN NOT NULL DEFAULT TRUE,
                              `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                              PRIMARY KEY (`id`),
                              UNIQUE KEY `name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --- TABELLA: movements ---
DROP TABLE IF EXISTS `movements`;
CREATE TABLE `movements` (
                             `id` INT(11) NOT NULL AUTO_INCREMENT,
                             `category_id` INT(11) NULL,
                             `transaction_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                             `entrata` DECIMAL(10,2) NULL,
                             `uscita` DECIMAL(10,2) NULL,
                             `note` TEXT NULL,
                             PRIMARY KEY (`id`),
                             FOREIGN KEY (`category_id`)
                                 REFERENCES `categories`(`id`)
                                 ON DELETE SET NULL
                                 ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;