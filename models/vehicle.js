const pool = require("../database/db");
const promisePool = pool.promise();

const addVehicle = async (params) => {
  try {
    await promisePool.query("use bluugo;");

    const [rows] = await promisePool.execute(
      `INSERT INTO VEHICLE (id, model_year, make, model, rejection_percentage, reason_1, reason_2, reason_3) VALUES (NULL, ${params[0]},'${params[1]}','${params[2]}','${params[3]}','${params[4]}','${params[5]}','${params[6]}');`
    );
    return rows;
  } catch (e) {
    console.log("error", e.message);
  }
};

const getVehicleByKeyword = async (params) => {
  try {
    await promisePool.query("use bluugo;");

    let subQuery = "WHERE ";
    let condition = "";
    for (let i = 0; i < params.length; i++) {
      condition += `( a.model_year like '%${params[i]}%' or a.make like '%${params[i]}%' or a.model like '%${params[i]}%' or a.rejection_percentage like '%${params[i]}%' or b.text like '%${params[i]}%' or c.text like '%${params[i]}%' or d.text like '%${params[i]}%' )`;
      if (i !== params.length - 1) {
        condition += " AND ";
      }
    }

    subQuery += condition;

    const query = `Select a.model_year, a.make, a.model, a.rejection_percentage, b.text as reason_1, c.text as reason_2, d.text as reason_3 From VEHICLE a Join REASON_REJECTION b On a.reason_1 = b.id Join REASON_REJECTION c On a.reason_2 = c.id Join REASON_REJECTION d On a.reason_3 = d.id ${subQuery} LIMIT 50;`;

    const [rows] = await promisePool.execute(query);
    return rows;
  } catch (e) {
    throw e;
  }
};

const getVehicle = async (params) => {
  try {
    const page = params[0];
    // page= 1 then from =1 and to = 50; page= 2 then from =51 and to = 100
    const limit = 50;
    const from = (page - 1) * limit + 1;
    const to = page * limit;

    await promisePool.query("use bluugo;");

    //
    const query = `Select a.id, a.model_year, a.make, a.model, a.rejection_percentage, b.text as reason_1, c.text as reason_2, d.text as reason_3 From VEHICLE a Join REASON_REJECTION b On a.reason_1 = b.id Join REASON_REJECTION c On a.reason_2 = c.id Join REASON_REJECTION d On a.reason_3 = d.id WHERE a.id>=${from} AND a.id<=${to};`;
    const [rows] = await promisePool.execute(query);

    return rows;
  } catch (e) {
    throw e;
  }
};

const countTotalRows = async () => {
  try {
    await promisePool.query("use bluugo;");

    const query = "SELECT COUNT(*) as total from VEHICLE;";
    const [rows] = await promisePool.execute(query);

    return rows;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  addVehicle,
  getVehicle,
  getVehicleByKeyword,
  countTotalRows,
};
