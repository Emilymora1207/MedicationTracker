//Sitting my connections
const mongoose = require("mongoose");

// Mongoose to allow querying on properties that are not defined in the schema.
mongoose.set("strictQuery", false);

// establish a connection to a MongoDB database using Mongoose.
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/MedicationTracker",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
