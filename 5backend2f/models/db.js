const mongoose = require("mongoose");

const mongo_url = process.env.MONGODB_URL;
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("connection done with mongodb");
  })
  .catch((error) => {
    console.error("MONGODB CONNECTION ERROR ", error);
    process.exit(1);
  });
