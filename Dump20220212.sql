-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: projectmonitor
-- ------------------------------------------------------
-- Server version	8.0.26

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
  `category_title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`categoryid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category_tasks`
--

DROP TABLE IF EXISTS `category_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_tasks` (
  `category_categoryid` int NOT NULL,
  `tasks_taskid` int NOT NULL,
  PRIMARY KEY (`category_categoryid`,`tasks_taskid`),
  UNIQUE KEY `UK_imx65sdron4n1pr7b68u98y7e` (`tasks_taskid`),
  CONSTRAINT `FK30ysnstt2ldj7dqs6bw1yi30s` FOREIGN KEY (`category_categoryid`) REFERENCES `category` (`categoryid`),
  CONSTRAINT `FKt1xfqxtqjkmase1olyn0hok7b` FOREIGN KEY (`tasks_taskid`) REFERENCES `task` (`taskid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `memberid` int NOT NULL,
  `role` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `telephone` int DEFAULT NULL,
  PRIMARY KEY (`memberid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `member_tasks`
--

DROP TABLE IF EXISTS `member_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_tasks` (
  `member_memberid` int NOT NULL,
  `tasks_taskid` int NOT NULL,
  PRIMARY KEY (`member_memberid`,`tasks_taskid`),
  UNIQUE KEY `UK_6t6c114x6fu7nfwofk2oxje27` (`tasks_taskid`),
  CONSTRAINT `FKjl3ulhkq1gw47xu0t49gc2hiw` FOREIGN KEY (`tasks_taskid`) REFERENCES `task` (`taskid`),
  CONSTRAINT `FKsdoby2tc6p041lj3gwpfnxtht` FOREIGN KEY (`member_memberid`) REFERENCES `member` (`memberid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `priority_tasks`
--

DROP TABLE IF EXISTS `priority_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `priority_tasks` (
  `priority_priorityid` int NOT NULL,
  `tasks_taskid` int NOT NULL,
  PRIMARY KEY (`priority_priorityid`,`tasks_taskid`),
  UNIQUE KEY `UK_addhq2j0g6m23jdj4oducqbwt` (`tasks_taskid`),
  CONSTRAINT `FK8x9685oheltt7euvkrw89wlnw` FOREIGN KEY (`tasks_taskid`) REFERENCES `task` (`taskid`),
  CONSTRAINT `FKl97wf37s6d28cgp79wie68xew` FOREIGN KEY (`priority_priorityid`) REFERENCES `priority` (`priorityid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `projectid` int NOT NULL,
  `project_status_project_statusid` int DEFAULT NULL,
  `members_memberid` int DEFAULT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `project_description` varchar(255) DEFAULT NULL,
  `project_title` varchar(255) DEFAULT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`projectid`),
  KEY `FKfckrmngrujd2yixnogf6eap0j` (`project_status_project_statusid`),
  CONSTRAINT `FKfckrmngrujd2yixnogf6eap0j` FOREIGN KEY (`project_status_project_statusid`) REFERENCES `project_status` (`project_statusid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_members`
--

DROP TABLE IF EXISTS `project_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_members` (
  `project_projectid` int NOT NULL,
  `members_memberid` int NOT NULL,
  PRIMARY KEY (`project_projectid`,`members_memberid`),
  UNIQUE KEY `UK_7dr46pq5a5nh6mnx3183rft8c` (`members_memberid`),
  CONSTRAINT `FKb3v244uuumtsbmxjwcgtnmxmj` FOREIGN KEY (`project_projectid`) REFERENCES `project` (`projectid`),
  CONSTRAINT `FKtkrf974s3jpvxeddqhemo8mab` FOREIGN KEY (`members_memberid`) REFERENCES `member` (`memberid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_report`
--

DROP TABLE IF EXISTS `project_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_report` (
  `project_projectid` int NOT NULL,
  `report_reportid` int NOT NULL,
  PRIMARY KEY (`project_projectid`,`report_reportid`),
  UNIQUE KEY `UK_84v0ws7sud7y4vlfonwl95hs4` (`report_reportid`),
  CONSTRAINT `FK1j4v62o4dhpjvm1kwav0h41kg` FOREIGN KEY (`report_reportid`) REFERENCES `report` (`reportid`),
  CONSTRAINT `FK5ag6wvq08i0m85wpc5bn0kp3g` FOREIGN KEY (`project_projectid`) REFERENCES `project` (`projectid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_sprint`
--

DROP TABLE IF EXISTS `project_sprint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_sprint` (
  `project_projectid` int NOT NULL,
  `sprint_sprintid` int NOT NULL,
  PRIMARY KEY (`project_projectid`,`sprint_sprintid`),
  UNIQUE KEY `UK_2rux3plqd9qoy1ergr53al7oa` (`sprint_sprintid`),
  CONSTRAINT `FK6uce1vx4ikb1f5sl9o295eg5j` FOREIGN KEY (`project_projectid`) REFERENCES `project` (`projectid`),
  CONSTRAINT `FK8dtpd2xhu9bbwvnq2wojxhcvj` FOREIGN KEY (`sprint_sprintid`) REFERENCES `sprint` (`sprintid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_status`
--

DROP TABLE IF EXISTS `project_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_status` (
  `project_statusid` int NOT NULL,
  `project_status_title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`project_statusid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_status_projects`
--

DROP TABLE IF EXISTS `project_status_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_status_projects` (
  `project_status_project_statusid` int NOT NULL,
  `projects_projectid` int NOT NULL,
  PRIMARY KEY (`project_status_project_statusid`,`projects_projectid`),
  UNIQUE KEY `UK_15ah8vxsq9iqrwgd0r87recvr` (`projects_projectid`),
  CONSTRAINT `FKbj5cydduk9uyeopdumvcpuqp4` FOREIGN KEY (`project_status_project_statusid`) REFERENCES `project_status` (`project_statusid`),
  CONSTRAINT `FKowmr4rmn85rrx6mdnwtg3s80w` FOREIGN KEY (`projects_projectid`) REFERENCES `project` (`projectid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_tasks`
--

DROP TABLE IF EXISTS `project_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_tasks` (
  `project_projectid` int NOT NULL,
  `tasks_taskid` int NOT NULL,
  PRIMARY KEY (`project_projectid`,`tasks_taskid`),
  UNIQUE KEY `UK_slg0vghoheffdex4umcc4b7sm` (`tasks_taskid`),
  CONSTRAINT `FKdq45awkwc6uw89kmdbugugmdy` FOREIGN KEY (`tasks_taskid`) REFERENCES `task` (`taskid`),
  CONSTRAINT `FKsd498tt4rgox9rddojs78m4i6` FOREIGN KEY (`project_projectid`) REFERENCES `project` (`projectid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `reportid` int NOT NULL,
  `project_projectid` int DEFAULT NULL,
  `creation_date` datetime(6) DEFAULT NULL,
  `report_ttile` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`reportid`),
  KEY `FK19r34dajrbet0nrcu0cn085cy` (`project_projectid`),
  CONSTRAINT `FK19r34dajrbet0nrcu0cn085cy` FOREIGN KEY (`project_projectid`) REFERENCES `project` (`projectid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `sprint_task`
--

DROP TABLE IF EXISTS `sprint_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sprint_task` (
  `sprint_sprintid` int NOT NULL,
  `task_taskid` int NOT NULL,
  PRIMARY KEY (`sprint_sprintid`,`task_taskid`),
  UNIQUE KEY `UK_dues182921e5dwbcbqydh56lo` (`task_taskid`),
  CONSTRAINT `FK1fig25xv4846g878ktaap7r27` FOREIGN KEY (`sprint_sprintid`) REFERENCES `sprint` (`sprintid`),
  CONSTRAINT `FK9ebee2vqkc3strqclqnwmyxxg` FOREIGN KEY (`task_taskid`) REFERENCES `task` (`taskid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `task_duration` int DEFAULT NULL,
  `task_estimation` int DEFAULT NULL,
  `task_title` varchar(255) DEFAULT NULL,
  `category_categoryid` int DEFAULT NULL,
  `member_memberid` int DEFAULT NULL,
  `priority_priorityid` int DEFAULT NULL,
  `project_projectid` int DEFAULT NULL,
  `sprint_sprintid` int DEFAULT NULL,
  `task_status_task_statusid` int DEFAULT NULL,
  PRIMARY KEY (`taskid`),
  KEY `FKasrfvh0injf09hj48civ4e6nl` (`category_categoryid`),
  KEY `FK6maiiwf6r8nfv0yvi5fnxovd` (`member_memberid`),
  KEY `FKj5tp5u53sldaa06i1uhjg01st` (`priority_priorityid`),
  KEY `FK5b3eoctebn1jeny30rc3eioqk` (`project_projectid`),
  KEY `FKaiasrnn6nmprsevyojxf3h586` (`sprint_sprintid`),
  KEY `FKdjel3ccfwmhvnx11mj1y87oqg` (`task_status_task_statusid`),
  CONSTRAINT `FK5b3eoctebn1jeny30rc3eioqk` FOREIGN KEY (`project_projectid`) REFERENCES `project` (`projectid`),
  CONSTRAINT `FK6maiiwf6r8nfv0yvi5fnxovd` FOREIGN KEY (`member_memberid`) REFERENCES `member` (`memberid`),
  CONSTRAINT `FKaiasrnn6nmprsevyojxf3h586` FOREIGN KEY (`sprint_sprintid`) REFERENCES `sprint` (`sprintid`),
  CONSTRAINT `FKasrfvh0injf09hj48civ4e6nl` FOREIGN KEY (`category_categoryid`) REFERENCES `category` (`categoryid`),
  CONSTRAINT `FKdjel3ccfwmhvnx11mj1y87oqg` FOREIGN KEY (`task_status_task_statusid`) REFERENCES `task_status` (`task_statusid`),
  CONSTRAINT `FKj5tp5u53sldaa06i1uhjg01st` FOREIGN KEY (`priority_priorityid`) REFERENCES `priority` (`priorityid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `task_status`
--

DROP TABLE IF EXISTS `task_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_status` (
  `task_statusid` int NOT NULL,
  `task_status_title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`task_statusid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `task_status_tasks`
--

DROP TABLE IF EXISTS `task_status_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_status_tasks` (
  `task_status_task_statusid` int NOT NULL,
  `tasks_taskid` int NOT NULL,
  PRIMARY KEY (`task_status_task_statusid`,`tasks_taskid`),
  UNIQUE KEY `UK_4eqdxkdv10fguge74myd56wa` (`tasks_taskid`),
  CONSTRAINT `FKbh9p7306n78lox5sv5xx9e4fr` FOREIGN KEY (`tasks_taskid`) REFERENCES `task` (`taskid`),
  CONSTRAINT `FKi02wbk9fm1d79aywqwf6vhfhx` FOREIGN KEY (`task_status_task_statusid`) REFERENCES `task_status` (`task_statusid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-12 13:24:18
