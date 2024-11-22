-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.29 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for flame_guard
CREATE DATABASE IF NOT EXISTS `flame_guard` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `flame_guard`;

-- Dumping structure for table flame_guard.department
CREATE TABLE IF NOT EXISTS `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `station_code` varchar(6) NOT NULL,
  `district_id` int NOT NULL,
  `status` varchar(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_department_district1_idx` (`district_id`),
  CONSTRAINT `fk_department_district1` FOREIGN KEY (`district_id`) REFERENCES `district` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table flame_guard.department: ~0 rows (approximately)
REPLACE INTO `department` (`id`, `name`, `mobile`, `station_code`, `district_id`, `status`) VALUES
	(1, 'Gampaha Fire Station', '', '112233', 2, 'in');

-- Dumping structure for table flame_guard.district
CREATE TABLE IF NOT EXISTS `district` (
  `id` int NOT NULL AUTO_INCREMENT,
  `district` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table flame_guard.district: ~25 rows (approximately)
REPLACE INTO `district` (`id`, `district`) VALUES
	(1, 'Colombo'),
	(2, 'Gampaha'),
	(3, 'Kalutara'),
	(4, 'Kandy'),
	(5, 'Matale'),
	(6, 'Nuwara eliya'),
	(7, 'Batticaloa'),
	(8, 'Trincomalee'),
	(9, 'Ampara'),
	(10, 'Jaffna'),
	(11, 'Mannar'),
	(12, 'Mullaitivu'),
	(13, 'Vavuniya'),
	(14, 'Anuradhapura'),
	(15, 'Polonnaruwa'),
	(16, 'Kurunegala'),
	(17, 'Puttalam'),
	(18, 'Ratnapura'),
	(19, 'Kegalle'),
	(20, 'Galle'),
	(21, 'Matara'),
	(22, 'Hambantota'),
	(23, 'Badulla'),
	(24, 'Monaragala'),
	(25, 'Kilinochchi');

-- Dumping structure for table flame_guard.sos
CREATE TABLE IF NOT EXISTS `sos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `temperature` varchar(4) NOT NULL,
  `gas` varchar(45) NOT NULL,
  `date_time` datetime NOT NULL,
  `user_id` int NOT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sos_user1_idx` (`user_id`),
  KEY `fk_sos_department1_idx` (`department_id`),
  CONSTRAINT `fk_sos_department1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
  CONSTRAINT `fk_sos_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table flame_guard.sos: ~0 rows (approximately)

-- Dumping structure for table flame_guard.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `address` varchar(255) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(8) NOT NULL,
  `district_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_district1_idx` (`district_id`),
  CONSTRAINT `fk_user_district1` FOREIGN KEY (`district_id`) REFERENCES `district` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table flame_guard.user: ~1 rows (approximately)
REPLACE INTO `user` (`id`, `name`, `mobile`, `address`, `username`, `password`, `district_id`) VALUES
	(5, 'Vihanga Heshan', '0719892932', '231/D, Deenapamunuwa, Urapola.', 'Vheshan37', 'Vh2002@#', 2);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
