//  Date time library
const dayjs = require("dayjs");
// Mongoose library
const { Schema, model, Types } = require("mongoose");

const medicSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dosage: {
    type: Number,
    min: [1],
    default: 1,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [0, "Amount cannot be negative"],
  },
  range: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    default: "daily",
    required: true,
  },
  subRange: {
    type: String,
    enum: ["every", "every other"],
    default: "every",
    required: true,
  },
  // times are stored as strings in 12 hour format
  times: [
    {
      type: String,
      validate: (time) => {
        let found = 0;

        for (let i = 0; i < this.times.length; i++)
          if (this.times[i] == time) found++;
        if (found > 1) return false;
        else return true;
      },
    },
  ],
  queue: [
    {
      time: { type: String, required: true },
      checked: { type: Boolean, default: false },
    },
  ],
  queueLastFilled: {
    type: Date,
    required: true,
    default: new Date().setHours(0, 0, 0, 0),
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

// adds times to queue when medicine is created
medicSchema.pre("save", async (next) => {
  if (this.isNew || this.isModified("times")) {
    this.times.forEach((time) => this.queue.push({ time }));
  }

  if (this.amount < 1) this.isActive = false;

  next();
});

//  updates queue when times are changed
medicSchema.pre("findOneAndUpdate", async (next) => {
  const initial = await this.model.findOne(this.getQuery());
  const update = this.getUpdate();

  if (update.amount < 1) update.isActive = false;

  // if times are changed then update queue
  if (update.times) {
    let removeIndexes = [];

    //  finds indexes of queue objects that need to be removed
    initial.queue.forEach((obj, index) => {
      let found = false;
      // return false if time is in both initial and update else return true
      for (let i = 0; i < update.times.length; i++) {
        if (update.times[i] === obj.time) found = true;
      }

      if (!found) removeIndexes.push(index);
    });

    for (let i = removeIndexes.length - 1; i >= 0; i--) {
      initial.queue.splice(removeIndexes[i], 1);
    }

    //  adds new times to queue
    update.queue = initial.queue;

    // adds time to queue if not found
    update.times.forEach((time) => {
      let found = false;
      // if time is found in queue then set found to true
      update.queue.forEach((queueTime) =>
        queueTime.time === time ? (found = true) : null
      );
      // if time is not found in queue then add it
      if (!found) update.queue.push({ time });
    });
  }
  next();
});

medicSchema.methods.fillQueue = async () => {
  const initialDate = dayjs(this.queueLastFilled);
  const perviousDays = dayjs().diff(initialDate, "day");
  const subRange = this.subRange === "every" ? 1 : 2;

  // if perviousDays is less than range then return true
  switch (this.range) {
    case "monthly":
      if (perviousDays < 30 * subRange) break;
    case "weekly":
      if (perviousDays < 7 * subRange) break;
    case "daily":
      if (perviousDays < 1 * subRange) break;
    default:
      return true;
  }

  return false;
};

const Medic = model("Medic", medicSchema);

module.exports = Medic;
