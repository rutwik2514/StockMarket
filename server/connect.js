const mongoose = require("mongoose");

// Connecting to database via mongoose
const connect = async (uri) => {
    console.log("uri", uri)
//   mongoose.set("strictQuery", true);
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