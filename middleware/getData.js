const fs = require("fs");

const getData = async (req, res, next) => {
  try {
    const data = await fs.readFileSync("./data.json", "utf8");
    console.log(data);

    const parsedData = JSON.parse(data);

    req.data = parsedData;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = getData;
