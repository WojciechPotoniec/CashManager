-- Per importare questo file:
-- 1. Apri phpMyAdmin (o un altro client SQL).
-- 2. Crea un nuovo database (se non vuoi usare quello suggerito qui sotto).
-- 3. Seleziona il database e vai alla scheda "Importa".
-- 4. Carica e esegui questo file.

-- --- STRUTTURA DEL DATABASE ---
DROP DATABASE IF EXISTS `cashmanager_db`;
CREATE DATABASE `cashmanager_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `cashmanager_db`;


-- --- TABELLA: categories ---
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
                              `id` INT(11) NOT NULL AUTO_INCREMENT,
                              `name` VARCHAR(100) NOT NULL,
                              `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                              PRIMARY KEY (`id`),
                              UNIQUE KEY `name_unique` (`name`) -- Impedisce di avere categorie con lo stesso nome
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --- TABELLA: movements ---
DROP TABLE IF EXISTS `movements`;
CREATE TABLE `movements` (
                             `id` INT(11) NOT NULL AUTO_INCREMENT,
                             `category_id` INT(11) NULL, -- Può essere NULL se un movimento non ha categoria
                             `transaction_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- NOTA SOTTO
                             `entrata` DECIMAL(10,2) NULL, -- Importo dell'entrata
                             `uscita` DECIMAL(10,2) NULL, -- Importo dell'uscita
                             `note` TEXT NULL, -- Note opzionali
                             PRIMARY KEY (`id`),
                             FOREIGN KEY (`category_id`)
                                 REFERENCES `categories`(`id`)
                                 ON DELETE SET NULL -- Se una categoria viene eliminata, i movimenti non vengono persi ma diventano "non categorizzati"
                                 ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;