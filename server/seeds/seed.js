const db = require("../config/connection");
const { User, Medic } = require("../models");
const userSeeds = require("./userSeeds.json");
const medicSeeds = require("./medicSeeds.json");

db.once("open", async () => {
  try {
    await Medic.deleteMany({});
    await User.deleteMany({});
    const listUser = await User.create(userSeeds);

    for (let i = 0; i < listUser.length; i++) {
      await Medic.create({ ...medicSeeds[i], userId: listUser[i]._id });
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
