const multer = require("multer");
const fs = require("fs");
const {
  uploadReasonToTable,
  modifyData,
  getArrayOfReason,
  uploadVehicleToTable,
} = require("../utilities/utility");

const vehicleModel = require("../models/vehicle");

// Save the file from client to /public
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

const uploadVehicle = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    try {
      fs.readFile(req.file.path, "utf8", async function (err, data) {
        if (err) {
          console.log(err);
          throw e;
        }
        const json = JSON.parse(data);
        if (json.length > 0) {
          const reasons = getArrayOfReason(json);
          const modifiedData = modifyData(json, reasons);

          // Add reason, vehicle to table
          const reasonStatus = await uploadReasonToTable(reasons);
          const vehicleStatus = await uploadVehicleToTable(modifiedData);

          if (vehicleStatus && reasonStatus) {
            res.status(200).send("Sucessfully");
          } else {
            res.status(409).send("Failed to upload");
          }
        }
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  });
};

const totalRowsInVehicleTables = async (req, res) => {
  try {
    const totalRows = await vehicleModel.countTotalRows();
    res.json(totalRows);
  } catch (e) {
    throw e;
  }
};

const getVehicleDataByKeyword = async (req, res) => {
  try {
    const rawParams = req.query.searchKey?.split(" ");

    // Remove duplicate keywords
    const params = Array.from(new Set(rawParams));

    const result = await vehicleModel.getVehicleByKeyword(params);
    res.json(result);
  } catch (e) {
    throw e;
  }
};

const getVehicleData = async (req, res) => {
  try {
    const params = [req.query.page];
    const result = await vehicleModel.getVehicle(params);
    res.json(result);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  uploadVehicle,
  getVehicleData,
  getVehicleDataByKeyword,
  totalRowsInVehicleTables,
};
