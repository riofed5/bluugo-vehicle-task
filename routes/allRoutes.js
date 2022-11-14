const express = require("express");
const vehicleController = require("../controllers/vehicle");
const tableController = require("../controllers/table");

const router = express.Router();

// All routes here
router.get("/", tableController.intializeProject);

router.post("/upload", vehicleController.uploadVehicle);

router.get("/getVehicle", vehicleController.getVehicleData);

router.get("/getVehicleByKeyword", vehicleController.getVehicleDataByKeyword);

router.get("/totalRows", vehicleController.totalRowsInVehicleTables);

module.exports = router;
