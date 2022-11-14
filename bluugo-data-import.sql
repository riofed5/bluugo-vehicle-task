-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 10, 2022 at 11:06 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bluugo`
--

-- --------------------------------------------------------

--
-- Table structure for table `REASON_REJECTION`
--

CREATE TABLE `REASON_REJECTION` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `VEHICLE`
--

CREATE TABLE `VEHICLE` (
  `id` int(11) NOT NULL,
  `model_year` int(4) NOT NULL,
  `make` varchar(10) NOT NULL,
  `model` int(11) NOT NULL,
  `rejection_percentage` decimal(10,1) NOT NULL,
  `reason_1` int(11) NOT NULL,
  `reason_2` int(11) NOT NULL,
  `reason_3` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `REASON_REJECTION`
--
ALTER TABLE `REASON_REJECTION`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `VEHICLE`
--
ALTER TABLE `VEHICLE`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `model_year` (`model_year`,`make`,`model`,`rejection_percentage`,`reason_1`,`reason_2`,`reason_3`) USING BTREE,
  ADD KEY `reason_1` (`reason_1`),
  ADD KEY `INDEX_2` (`reason_2`),
  ADD KEY `INDEX_3` (`reason_3`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `REASON_REJECTION`
--
ALTER TABLE `REASON_REJECTION`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `VEHICLE`
--
ALTER TABLE `VEHICLE`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `VEHICLE`
--
ALTER TABLE `VEHICLE`
  ADD CONSTRAINT `VEHICLE_ibfk_1` FOREIGN KEY (`reason_1`) REFERENCES `REASON_REJECTION` (`id`),
  ADD CONSTRAINT `VEHICLE_ibfk_2` FOREIGN KEY (`reason_2`) REFERENCES `REASON_REJECTION` (`id`),
  ADD CONSTRAINT `VEHICLE_ibfk_3` FOREIGN KEY (`reason_3`) REFERENCES `REASON_REJECTION` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
