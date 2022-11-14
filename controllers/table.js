const { initalizeDb } = require("../models/table");

const intializeProject = async (req, res) => {
  try {
    await initalizeDb();
    res.status(200).send("Initialize project sucessfully");
  } catch (e) {
    throw e;
  }
};

module.exports = {
  intializeProject,
};
