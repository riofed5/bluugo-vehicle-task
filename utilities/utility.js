const reasonModel = require("../models/reason");
const vehicleModel = require("../models/vehicle");

const getArrayOfReason = (data) => {
  const setOfReason = new Set();

  for (let i = 0; i < data.length; i++) {
    const singleData = data[i];

    setOfReason.add(singleData.reason_1);
    setOfReason.add(singleData.reason_2);
    setOfReason.add(singleData.reason_3);
  }

  return Array.from(setOfReason);
};

const modifyData = (data, arrayReason) => {
  if (!arrayReason) {
    throw Error(`array of reason not exists`);
  }

  return [...data].map((single) => {
    return {
      ...single,
      reason_1: +arrayReason.indexOf(single.reason_1) + 1,
      reason_2: +arrayReason.indexOf(single.reason_2) + 1,
      reason_3: +arrayReason.indexOf(single.reason_3) + 1,
    };
  });
};

const uploadReasonToTable = async (reasonsArray) => {
  try {
    for (let i = 0; i < reasonsArray.length; i++) {
      const params = [reasonsArray[i]];
      const reason = await reasonModel.addReason(params);
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const uploadVehicleToTable = async (vehicleArray) => {
  try {
    for (let i = 0; i < vehicleArray.length; i++) {
      const single = vehicleArray[i];
      const params = [
        single.model_year,
        single.make,
        single.model,
        single.rejection_percentage,
        single.reason_1,
        single.reason_2,
        single.reason_3,
      ];

      const reason = await vehicleModel.addVehicle(params);
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = {
  getArrayOfReason,
  modifyData,
  uploadReasonToTable,
  uploadVehicleToTable,
};
