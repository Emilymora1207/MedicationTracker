const { AuthenticationError } = require("apollo-server-express");
const { User, Medic } = require("../models");
const { signToken } = require("../utils/auth");
const { updateQueue } = require("../utils/updateQueue");
const { default: medic } = require("../../client/src/assets/medicSeedPractice");

const resolvers = {
  Query: {
    // gets specific medic matching medicId and userId using context
    getMedic: async (parent, { medicId }, context) => {
      if (!context.user)
        throw new AuthenticationError("You should be logged in!");
      return Medic.findOne({ _id: medicId});
    },
    // gets all medics matching userId using context
    medics: async (parent, args, context) => {
      console.log(context.user)
      if (!context.user)
        throw new AuthenticationError("You should be logged in!");
      const userMedics = await User.find({ _id: context.user._id }).populate({path:'medics', select:'-__v'});
      // updates queue array of each medics
      // const updatedMedics = await updateQueue(userMedics);
      console.log(userMedics[0].medics);
      return userMedics[0];
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    // adds new user and signs token
    addUser: async (parent, { firstName, lastName, email, username, password }) => {
      const user = await User.create({ firstName, lastName, email,username, password });
      const token = signToken(user);
      return { token, user };
    },
    // checks if user exists and if password is correct, then signs token
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError(
          "Your username or password is incorrect!"
        );
      }
      // checks if password is correct
      const validPw = await user.isCorrectPassword(password);
      if (!validPw) {
        throw new AuthenticationError(
          "Your username or password is incorrect!"
        );
      }
      // signs token
      const token = signToken(user);
      return { token, user };
    },

    // adds new medic to user
    addMedic: async (parent, { medic }, context) => {
      if (!context.user)
        throw new AuthenticationError("You should be logged in!");

      // creates new medic with userId from context
      const newMedic = await Medic.create({
        ...medic,
        userId: context.user._id,
      });

      return newMedic;
    },
    // updates specific medic matching medicId and userId using context.
    updateMedic: async (parent, { medicId, medic }, context) => {
      if (!context.user)
        throw new AuthenticationError("You should be logged in!");

      // updates medic matching medicId and userId from context
      const updatedMedic = await Medic.findOneAndUpdate(
        { _id: medicId, userId: context.user._id },
        { ...medic },
        { new: true }
      );

      return updatedMedic;
    },
    // toggles isActive of specific medicine
    toggleIsActive: async (parent, { medicId }, context) => {
      if (!context.user)
        throw new AuthenticationError("You need to be logged in!");

      // toggles isActive of specific medicine matching medicId and userId from context and amount > 0
      const toggledIsActive = await Medic.findOneAndUpdate(
        { _id: medicId, userId: context.user._id, amount: { $gt: 0 } },
        [{ $set: { isActive: { $not: "$isActive" } } }],
        { new: true }
      );

      return toggledIsActive;
    },
    // updates check value on queue obj to true and decreases amount on medicine by dosage
    checkQueue: async (parent, { medicId, queueId }, context) => {
      if (!context.user)
        throw new AuthenticationError("You should be logged in!");

      const medic = await Medic.findOne({
        _id: medicId,
        "queue._id": queueId,
      });
      // finds index of queue obj matching queueId
      const index = medic.queue.findIndex((el) => el._id == queueId);

      if (index > -1) {
        medic.queue[index].checked = true;
        medic.amount -= medic.dosage;
      }
      // saves updated medic to db and returns it
      const toggledQueueChecked = await medic.save();
      return toggledQueueChecked;
    },
  },
};

module.exports = resolvers;
