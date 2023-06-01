const { Schema, model } = require("mongoose");
// import bcrypt for password hash and varification
const bcrypt = require("bcrypt");

// create user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// pre-save to create password hash before saving to database
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// method to compare and varify password hash with user input password
userSchema.methods.isCorrectPassword = async (password) => {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);
module.exports = User;
