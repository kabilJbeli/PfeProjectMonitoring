-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: projectmonitor
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `categoryid` int NOT NULL,
  `categorytitle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`categoryid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (13,'Bug'),(14,'Improvement'),(15,'Task'),(16,'Development'),(17,'Epic'),(18,'Story');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (32);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `memberid` int NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `keycloakid` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role` int DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `managedproject_projectid` int DEFAULT NULL,
  `keyclok_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`memberid`),
  UNIQUE KEY `UK_mbmcqelty0fbrvxp1q58dn57t` (`email`),
  UNIQUE KEY `UK_c9fevg8r15sb675t7gqnykhbx` (`keycloakid`),
  KEY `FKoo51et9t4o71x95v4uyaa3s8b` (`managedproject_projectid`),
  CONSTRAINT `FKoo51et9t4o71x95v4uyaa3s8b` FOREIGN KEY (`managedproject_projectid`) REFERENCES `project` (`projectid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'fdgfg','kjbeli@vermeg.com','71b91e4e-26bb-4c37-98a9-bc402129dc99','Jbeli','Kabil',0,'51229485',NULL,NULL),(2,'sdfdfg','k.jebali19004@pi.tn','776ac208-a4de-4d39-822e-c811fd850fc7','Jebali','kabil',0,'51229485',NULL,NULL),(3,'azdazd','habid@vermeg.com','2d0fd59b-ea00-41d4-a120-2665fe7e92ff','Abid','Hatem',1,'51229485',NULL,NULL),(4,'sdfsdf','yfellah@vermeg.com','278248a8-ba91-4dbd-9c14-2537ef8fc731','Fellah','Yasmine',3,'51229485',NULL,NULL),(5,'dfdfg','tlefi@vermeg.com','f52346db-9f20-4834-80f1-c80fc58d5096','Lefi','Taha',2,'51229485',NULL,NULL),(6,'dfdfg','zchouks@vermeg.com','02decb0a-fc57-4440-9375-5613f1a67207','Chouk','Zied',2,'51229485',NULL,NULL),(7,'dfgdfg','iissa2@vermeg.com','5c3261f3-c7ee-46b0-8b58-f5044eb94387','Issa','Ines',2,'51229485',NULL,NULL);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `priority`
--

DROP TABLE IF EXISTS `priority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `priority` (
  `priorityid` int NOT NULL,
  `priority_title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`priorityid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `priority`
--

LOCK TABLES `priority` WRITE;
/*!40000 ALTER TABLE `priority` DISABLE KEYS */;
INSERT INTO `priority` VALUES (8,'Minor'),(9,'Major'),(10,'Medium'),(11,'Critical'),(12,'Blocker');
/*!40000 ALTER TABLE `priority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `projectid` int NOT NULL,
  `end_date` date DEFAULT NULL,
  `project_description` varchar(255) DEFAULT NULL,
  `project_status` int DEFAULT NULL,
  `project_title` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `client` int DEFAULT NULL,
  `manager` int DEFAULT NULL,
  `creation_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`projectid`),
  KEY `FK6djgjrdrwyx9uu6fj886i8sgf` (`client`),
  KEY `FK438d2161sbh0lwe23r3gytm4s` (`manager`),
  CONSTRAINT `FK438d2161sbh0lwe23r3gytm4s` FOREIGN KEY (`manager`) REFERENCES `member` (`memberid`),
  CONSTRAINT `FK6djgjrdrwyx9uu6fj886i8sgf` FOREIGN KEY (`client`) REFERENCES `member` (`memberid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (19,'2022-04-05','Insurance Software Application',2,'Brix','2022-04-05',4,3,NULL),(20,'2022-04-05','Individual Insurance Demo project',0,'Individual Insurance','2022-04-05',4,3,NULL);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_members`
--

DROP TABLE IF EXISTS `project_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_members` (
  `projects_projectid` int NOT NULL,
  `members_memberid` int NOT NULL,
  PRIMARY KEY (`projects_projectid`,`members_memberid`),
  KEY `FKtkrf974s3jpvxeddqhemo8mab` (`members_memberid`),
  CONSTRAINT `FKssrv3b5tv1ximnyew1tw3dn34` FOREIGN KEY (`projects_projectid`) REFERENCES `project` (`projectid`),
  CONSTRAINT `FKtkrf974s3jpvxeddqhemo8mab` FOREIGN KEY (`members_memberid`) REFERENCES `member` (`memberid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_members`
--

LOCK TABLES `project_members` WRITE;
/*!40000 ALTER TABLE `project_members` DISABLE KEYS */;
INSERT INTO `project_members` VALUES (19,5),(19,6),(20,6),(19,7);
/*!40000 ALTER TABLE `project_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `reportid` int NOT NULL,
  `creation_date` datetime(6) DEFAULT NULL,
  `report_ttile` varchar(255) DEFAULT NULL,
  `project_projectid` int DEFAULT NULL,
  PRIMARY KEY (`reportid`),
  KEY `FK19r34dajrbet0nrcu0cn085cy` (`project_projectid`),
  CONSTRAINT `FK19r34dajrbet0nrcu0cn085cy` FOREIGN KEY (`project_projectid`) REFERENCES `project` (`projectid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sprint`
--

DROP TABLE IF EXISTS `sprint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sprint` (
  `sprintid` int NOT NULL,
  `sprint_end_date` datetime(6) DEFAULT NULL,
  `sprint_period` varchar(255) DEFAULT NULL,
  `sprint_start_date` datetime(6) DEFAULT NULL,
  `sprint_title` varchar(255) DEFAULT NULL,
  `sprint_types` int DEFAULT NULL,
  `project_projectid` int DEFAULT NULL,
  `status_sprint_statusid` int DEFAULT NULL,
  PRIMARY KEY (`sprintid`),
  KEY `FK7o34wscyenx7h2c6g2dlc69xh` (`project_projectid`),
  KEY `FKsmfg8svjaxnkr5lo4jiwiqgt` (`status_sprint_statusid`),
  CONSTRAINT `FK7o34wscyenx7h2c6g2dlc69xh` FOREIGN KEY (`project_projectid`) REFERENCES `project` (`projectid`),
  CONSTRAINT `FKsmfg8svjaxnkr5lo4jiwiqgt` FOREIGN KEY (`status_sprint_statusid`) REFERENCES `sprint_status` (`sprint_statusid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sprint`
--

LOCK TABLES `sprint` WRITE;
/*!40000 ALTER TABLE `sprint` DISABLE KEYS */;
/*!40000 ALTER TABLE `sprint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sprint_status`
--

DROP TABLE IF EXISTS `sprint_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sprint_status` (
  `sprint_statusid` int NOT NULL,
  `sprint_status_title` int DEFAULT NULL,
  PRIMARY KEY (`sprint_statusid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sprint_status`
--

LOCK TABLES `sprint_status` WRITE;
/*!40000 ALTER TABLE `sprint_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `sprint_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `taskid` int NOT NULL,
  `creation_date` datetime(6) DEFAULT NULL,
  `task_description` varchar(255) DEFAULT NULL,
  `task_estimation` int DEFAULT NULL,
  `task_title` varchar(255) DEFAULT NULL,
  `assignee_memberid` int DEFAULT NULL,
  `category_categoryid` int DEFAULT NULL,
  `priority_priorityid` int DEFAULT NULL,
  `project_projectid` int DEFAULT NULL,
  `reporter_memberid` int DEFAULT NULL,
  `sprint_sprintid` int DEFAULT NULL,
  `task_status` int DEFAULT NULL,
  PRIMARY KEY (`taskid`),
  KEY `FKq0052khbahpap4jpcig4ppdcb` (`assignee_memberid`),
  KEY `FKasrfvh0injf09hj48civ4e6nl` (`category_categoryid`),
  KEY `FKj5tp5u53sldaa06i1uhjg01st` (`priority_priorityid`),
  KEY `FK5b3eoctebn1jeny30rc3eioqk` (`project_projectid`),
  KEY `FK49n1i3xuowvv48pth5uvl73hc` (`reporter_memberid`),
  KEY `FKaiasrnn6nmprsevyojxf3h586` (`sprint_sprintid`),
  CONSTRAINT `FK49n1i3xuowvv48pth5uvl73hc` FOREIGN KEY (`reporter_memberid`) REFERENCES `member` (`memberid`),
  CONSTRAINT `FK5b3eoctebn1jeny30rc3eioqk` FOREIGN KEY (`project_projectid`) REFERENCES `project` (`projectid`),
  CONSTRAINT `FKaiasrnn6nmprsevyojxf3h586` FOREIGN KEY (`sprint_sprintid`) REFERENCES `sprint` (`sprintid`),
  CONSTRAINT `FKasrfvh0injf09hj48civ4e6nl` FOREIGN KEY (`category_categoryid`) REFERENCES `category` (`categoryid`),
  CONSTRAINT `FKj5tp5u53sldaa06i1uhjg01st` FOREIGN KEY (`priority_priorityid`) REFERENCES `priority` (`priorityid`),
  CONSTRAINT `FKq0052khbahpap4jpcig4ppdcb` FOREIGN KEY (`assignee_memberid`) REFERENCES `member` (`memberid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (21,'2022-04-06 00:28:52.893808','we need to create a repository for the Brix project in got and assign all the developers to it',12,'Initialize the project in git',5,13,11,19,3,NULL,0),(22,'2022-04-06 00:28:52.893808','dfg',11,'dfg',7,13,8,19,3,NULL,0),(23,'2022-04-06 00:28:52.893808','dfdf',10,'dfdf',6,14,8,20,3,NULL,0),(24,'2022-04-06 00:28:52.893808','dfgdfg for ',8,'dfg',6,13,10,20,3,NULL,0),(26,'2022-04-06 00:28:52.893808','fghgh',1,'fg',7,14,9,19,3,NULL,0),(27,'2022-04-06 00:28:52.893808','tyyyyyy yt',5,'fg yjhtr ty',5,14,8,19,3,NULL,0),(28,'2022-04-06 18:55:27.536211','sfsfvfdv dfg',22,'ssdsf',6,13,8,20,3,NULL,0),(29,'2022-04-07 11:41:29.375532','mmg jdmj',5,'erl lmkfd',6,15,10,20,3,NULL,0),(30,'2022-04-07 11:49:30.533460','fhtyj',6,'gggg',6,15,9,20,NULL,NULL,0),(31,'2022-04-07 11:52:04.243436','jdjlkj lkdjlkfj kldjflkj',4,'mlkkljlkj kjlkjd kldjf',6,14,9,20,3,NULL,0);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_comment`
--

DROP TABLE IF EXISTS `task_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_comment` (
  `commentid` int NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `creation_date` datetime(6) DEFAULT NULL,
  `commented_by_memberid` int DEFAULT NULL,
  `task_taskid` int DEFAULT NULL,
  PRIMARY KEY (`commentid`),
  KEY `FK58rbv80mb7jytp801i6rdy3tv` (`commented_by_memberid`),
  KEY `FKrm4wmhrlxwiax6vcr0caaxldc` (`task_taskid`),
  CONSTRAINT `FK58rbv80mb7jytp801i6rdy3tv` FOREIGN KEY (`commented_by_memberid`) REFERENCES `member` (`memberid`),
  CONSTRAINT `FKrm4wmhrlxwiax6vcr0caaxldc` FOREIGN KEY (`task_taskid`) REFERENCES `task` (`taskid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_comment`
--

LOCK TABLES `task_comment` WRITE;
/*!40000 ALTER TABLE `task_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `task_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_duration`
--

DROP TABLE IF EXISTS `task_duration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_duration` (
  `duration_id` int NOT NULL,
  `duration` int DEFAULT NULL,
  `duration_type` int DEFAULT NULL,
  `task_taskid` int DEFAULT NULL,
  `creation_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`duration_id`),
  KEY `FKmtk1s354y3md96c95frdsdx4p` (`task_taskid`),
  CONSTRAINT `FKmtk1s354y3md96c95frdsdx4p` FOREIGN KEY (`task_taskid`) REFERENCES `task` (`taskid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_duration`
--

LOCK TABLES `task_duration` WRITE;
/*!40000 ALTER TABLE `task_duration` DISABLE KEYS */;
INSERT INTO `task_duration` VALUES (1,1,0,21,'2022-04-06 00:28:52.893808');
/*!40000 ALTER TABLE `task_duration` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-07 21:53:52
