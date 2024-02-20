const mongoose = require("mongoose");
const connect = async (uri) => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri)
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log("Error connecting to database.");
      console.log(err);
    });
};

module.exports = connect;