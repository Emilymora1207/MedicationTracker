const { Medic } = require("../models");

module.exports = {
  // Sittings to updates the queue object on all medic
  updateQueue: async (userMedics) => {
    // Sittings new object to be returned with all medics
    const updatedMedics = [];

    await Promise.all(
      userMedics.map(async (medic) => {
        // Function to returns true/false if the particular medic's queue has to be refilled depending on how often they take it
        const fillQueue = await medic.fillQueue();

        // Making sure if a single medic has to be refilled then run this else just push onto updatedMedic obj
        if (fillQueue) {
          // Sittings to concat medic queue with medics returned from filter which checks for times not on the queue already
          const newQueue = medic.queue.concat(
            medic.times.filter((time) => {
              for (let i = 0; i < medic.queue.length; i++) {
                if (time == medic.queue[i].time) return false;
              }
              return true;
            })
          );

          // Sittings to updates the document on Medi model then when its returned it gets pushed into the updatedMedics array
          updatedMedics.push(
            await Medic.findOneAndUpdate(
              { _id: medic._id },
              {
                queue: [...newQueue],
                queueLastFilled: new Date().setHours(0, 0, 0, 0),
              },
              { new: true }
            )
          );
        } else updatedMedics.push(medic);
      })
    );

    return updatedMedics;
  },
};
