CREATE DATABASE  IF NOT EXISTS `places_project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `places_project`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: places_project
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `places`
--

DROP TABLE IF EXISTS `places`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `places` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `alt` text,
  `lat` decimal(9,6) DEFAULT NULL,
  `lon` decimal(9,6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `place_id` varchar(50) NOT NULL,
  `src` varchar(255) NOT NULL,
  `alt` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `place_id` (`place_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_places`
--

DROP TABLE IF EXISTS `user_places`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_places` (
  `user_id` varchar(50) NOT NULL,
  `place_id` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`,`place_id`),
  KEY `place_id` (`place_id`),
  CONSTRAINT `user_places_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `places`
--

LOCK TABLES `places` WRITE;
/*!40000 ALTER TABLE `places` DISABLE KEYS */;
INSERT INTO `places` VALUES ('p1','Forest Waterfall','forest-waterfall.jpg','A tranquil forest with a cascading waterfall amidst greenery.',44.558800,-80.344000),('p10','Parisian Streets','parisian-streets.jpg','Charming streets of Paris with historic buildings and cafes.',48.856600,2.352200),('p11','Grand Canyon','grand-canyon.jpg','Expansive view of the deep gorges and ridges of the Grand Canyon.',36.106900,-112.112900),('p12','Venetian Canals','venetian-canals.jpg','Glistening waters of the Venetian canals as gondolas glide by at sunset.',45.440800,12.315500),('p13','Taj Mahal','taj-mahal.jpg','The iconic Taj Mahal reflecting in its surrounding waters during sunrise.',27.175100,78.042100),('p14','Kerala Backwaters','kerala-backwaters.jpg','Tranquil waters and lush greenery of the Kerala backwaters.',9.498100,76.338800),('p15','African Savanna','african-savanna.jpg','Wild animals roaming freely in the vast landscapes of the African savanna.',-2.153000,34.685700),('p16','Victoria Falls','victoria-falls.jpg','The powerful cascade of Victoria Falls, a natural wonder between Zambia and Zimbabwe.',-17.924300,25.857200),('p17','Machu Picchu','machu-picchu.jpg','The historic Incan citadel of Machu Picchu illuminated by the morning sun.',-13.163100,-72.545000),('p18','Amazon River','amazon-river.jpg','Navigating the waters of the Amazon River, surrounded by dense rainforest.',-3.465300,-58.380000),('p2','Sahara Desert Dunes','desert-dunes.jpg','Golden dunes stretching to the horizon in the Sahara Desert.',25.000000,0.000000),('p3','Himalayan Peaks','majestic-mountains.jpg','The sun setting behind snow-capped peaks of majestic mountains.',27.988100,86.925000),('p4','Caribbean Beach','caribbean-beach.jpg','Pristine white sand and turquoise waters of a Caribbean beach.',18.220800,-66.590100),('p5','Ancient Grecian Ruins','ruins.jpg','Historic ruins standing tall against the backdrop of the Grecian sky.',37.971500,23.725700),('p6','Amazon Rainforest Canopy','rainforest.jpg','Lush canopy of a rainforest, teeming with life.',-3.465300,-62.215900),('p7','Northern Lights','northern-lights.jpg','Dazzling display of the Northern Lights in a starry sky.',64.963100,-19.020800),('p8','Japanese Temple','japanese-temple.jpg','Ancient Japanese temple surrounded by autumn foliage.',34.994900,135.785000),('p9','Great Barrier Reef','great-barrier-reef.jpg','Vibrant coral formations of the Great Barrier Reef underwater.',-18.287100,147.699200);
/*!40000 ALTER TABLE `places` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'p1','forest-waterfall.jpg','A tranquil forest with a cascading waterfall amidst greenery.'),(2,'p2','desert-dunes.jpg','Golden dunes stretching to the horizon in the Sahara Desert.'),(3,'p3','majestic-mountains.jpg','The sun setting behind snow-capped peaks of majestic mountains.'),(4,'p4','caribbean-beach.jpg','Pristine white sand and turquoise waters of a Caribbean beach.'),(5,'p5','ruins.jpg','Historic ruins standing tall against the backdrop of the Grecian sky.'),(6,'p6','rainforest.jpg','Lush canopy of a rainforest, teeming with life.'),(7,'p7','northern-lights.jpg','Dazzling display of the Northern Lights in a starry sky.'),(8,'p8','japanese-temple.jpg','Ancient Japanese temple surrounded by autumn foliage.'),(9,'p9','great-barrier-reef.jpg','Vibrant coral formations of the Great Barrier Reef underwater.'),(10,'p10','parisian-streets.jpg','Charming streets of Paris with historic buildings and cafes.'),(11,'p11','grand-canyon.jpg','Expansive view of the deep gorges and ridges of the Grand Canyon.'),(12,'p12','venetian-canals.jpg','Glistening waters of the Venetian canals as gondolas glide by at sunset.'),(13,'p13','taj-mahal.jpg','The iconic Taj Mahal reflecting in its surrounding waters during sunrise.'),(14,'p14','kerala-backwaters.jpg','Tranquil waters and lush greenery of the Kerala backwaters.'),(15,'p15','african-savanna.jpg','Wild animals roaming freely in the vast landscapes of the African savanna.'),(16,'p16','victoria-falls.jpg','The powerful cascade of Victoria Falls, a natural wonder between Zambia and Zimbabwe.'),(17,'p17','machu-picchu.jpg','The historic Incan citadel of Machu Picchu illuminated by the morning sun.'),(18,'p18','amazon-river.jpg','Navigating the waters of the Amazon River, surrounded by dense rainforest.');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `places`
--

LOCK TABLES `places` WRITE;
/*!40000 ALTER TABLE `places` DISABLE KEYS */;
INSERT INTO `places` VALUES ('p1','Forest Waterfall','forest-waterfall.jpg','A tranquil forest with a cascading waterfall amidst greenery.',44.558800,-80.344000),('p10','Parisian Streets','parisian-streets.jpg','Charming streets of Paris with historic buildings and cafes.',48.856600,2.352200),('p11','Grand Canyon','grand-canyon.jpg','Expansive view of the deep gorges and ridges of the Grand Canyon.',36.106900,-112.112900),('p12','Venetian Canals','venetian-canals.jpg','Glistening waters of the Venetian canals as gondolas glide by at sunset.',45.440800,12.315500),('p13','Taj Mahal','taj-mahal.jpg','The iconic Taj Mahal reflecting in its surrounding waters during sunrise.',27.175100,78.042100),('p14','Kerala Backwaters','kerala-backwaters.jpg','Tranquil waters and lush greenery of the Kerala backwaters.',9.498100,76.338800),('p15','African Savanna','african-savanna.jpg','Wild animals roaming freely in the vast landscapes of the African savanna.',-2.153000,34.685700),('p16','Victoria Falls','victoria-falls.jpg','The powerful cascade of Victoria Falls, a natural wonder between Zambia and Zimbabwe.',-17.924300,25.857200),('p17','Machu Picchu','machu-picchu.jpg','The historic Incan citadel of Machu Picchu illuminated by the morning sun.',-13.163100,-72.545000),('p18','Amazon River','amazon-river.jpg','Navigating the waters of the Amazon River, surrounded by dense rainforest.',-3.465300,-58.380000),('p2','Sahara Desert Dunes','desert-dunes.jpg','Golden dunes stretching to the horizon in the Sahara Desert.',25.000000,0.000000),('p3','Himalayan Peaks','majestic-mountains.jpg','The sun setting behind snow-capped peaks of majestic mountains.',27.988100,86.925000),('p4','Caribbean Beach','caribbean-beach.jpg','Pristine white sand and turquoise waters of a Caribbean beach.',18.220800,-66.590100),('p5','Ancient Grecian Ruins','ruins.jpg','Historic ruins standing tall against the backdrop of the Grecian sky.',37.971500,23.725700),('p6','Amazon Rainforest Canopy','rainforest.jpg','Lush canopy of a rainforest, teeming with life.',-3.465300,-62.215900),('p7','Northern Lights','northern-lights.jpg','Dazzling display of the Northern Lights in a starry sky.',64.963100,-19.020800),('p8','Japanese Temple','japanese-temple.jpg','Ancient Japanese temple surrounded by autumn foliage.',34.994900,135.785000),('p9','Great Barrier Reef','great-barrier-reef.jpg','Vibrant coral formations of the Great Barrier Reef underwater.',-18.287100,147.699200);
/*!40000 ALTER TABLE `places` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_places`
--

LOCK TABLES `user_places` WRITE;
/*!40000 ALTER TABLE `user_places` DISABLE KEYS */;
INSERT INTO `user_places` VALUES ('u1','p14'),('u1','p4');
/*!40000 ALTER TABLE `user_places` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-19 18:32:26
