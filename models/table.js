const pool = require("../database/db");
const promisePool = pool.promise();

const listOfQueries = [
  "SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';",
  "SET time_zone = '+00:00';",
  // Set up the table for vehicle and reason rejection
  "CREATE TABLE `REASON_REJECTION` (`id` int(11) NOT NULL,`text` varchar(500) NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
  "CREATE TABLE `VEHICLE` (`id` int(11) NOT NULL, `model_year` int(4) NOT NULL, `make` varchar(30) NOT NULL, `model` varchar(30) NOT NULL, `rejection_percentage` varchar(5) NOT NULL, `reason_1` int(11) NOT NULL, `reason_2` int(11) NOT NULL, `reason_3` int(11) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
  // Set up primary keys and unique keys for vehicle and reason rejection tables
  "ALTER TABLE `REASON_REJECTION` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `unique_reason` (`text`) USING BTREE;",
  "ALTER TABLE `VEHICLE` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `unique_vehicle` (`model_year`,`make`,`model`,`rejection_percentage`,`reason_1`,`reason_2`,`reason_3`) USING BTREE, ADD KEY `reason_1` (`reason_1`), ADD KEY `INDEX_2` (`reason_2`), ADD KEY `INDEX_3` (`reason_3`);",
  "ALTER TABLE `REASON_REJECTION` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;",
  "ALTER TABLE `VEHICLE` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;",
  // Set up contraints of vechile.reason_# and reason_rejection.id
  "ALTER TABLE `VEHICLE` ADD CONSTRAINT `VEHICLE_ibfk_1` FOREIGN KEY (`reason_1`) REFERENCES `REASON_REJECTION` (`id`), ADD CONSTRAINT `VEHICLE_ibfk_2` FOREIGN KEY (`reason_2`) REFERENCES `REASON_REJECTION` (`id`), ADD CONSTRAINT `VEHICLE_ibfk_3` FOREIGN KEY (`reason_3`) REFERENCES `REASON_REJECTION` (`id`);",
];

const initalizeDb = async () => {
  try {
    await promisePool.query("DROP DATABASE IF EXISTS bluugo;");
    await promisePool.query("CREATE DATABASE bluugo;");
    await promisePool.query("use bluugo;");
    for (let i = 0; i < listOfQueries.length; i++) {
      await promisePool.execute(listOfQueries[i]);
    }
  } catch (e) {
    throw e;
  }
};

module.exports = { initalizeDb };
