const db = require("../config/connection");
const { User, Medicine } = require("../models");
const userSeeds = require("./userSeeds.json");
const medicineSeeds = require("./medicineSeeds.json");

db.once("open", async () => {
  try {
    await Medicine.deleteMany({});
    await User.deleteMany({});

    const userList = await User.create(userSeeds);

    for (let i = 0; i < userList.length; i++) {
      await Medicine.create({ ...medicineSeeds[i], userId: userList[i]._id });
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
