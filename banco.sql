CREATE DATABASE  IF NOT EXISTS `painel_senha`;
USE `painel_senha`;

DROP TABLE IF EXISTS `guiche`;
CREATE TABLE `guiche` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `numero` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `painel_chamar`;
CREATE TABLE `painel_chamar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `guiche_id` int NOT NULL,
  `senha_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `guiche_idx` (`guiche_id`),
  KEY `senha_idx` (`senha_id`),
  CONSTRAINT `guiche` FOREIGN KEY (`guiche_id`) REFERENCES `guiche` (`id`),
  CONSTRAINT `senha` FOREIGN KEY (`senha_id`) REFERENCES `senha` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `senha`;
CREATE TABLE `senha` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` int NOT NULL,
  `prioritario` tinyint NOT NULL DEFAULT '0',
  `criada` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `time_chamada` datetime DEFAULT NULL,
  `chamada` tinyint(1) DEFAULT '0',
  `guiche_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_guiche_idx` (`guiche_id`),
  CONSTRAINT `id_guiche` FOREIGN KEY (`guiche_id`) REFERENCES `guiche` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
