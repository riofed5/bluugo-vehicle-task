const pool = require("../database/db");
const promisePool = pool.promise();

const addReason = async (params) => {
  try {
    const [rows] = await promisePool.execute(
      `INSERT INTO bluugo.REASON_REJECTION (id,text) VALUES (NULL, '${params}');`
    );
    return rows;
  } catch (e) {
    console.log("error", e.message);
  }
};

module.exports = { addReason };
