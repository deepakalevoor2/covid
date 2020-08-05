/**
 * Make any changes you need to make to the database here
 */
async function up() {
  const mongoose = require("mongoose");
  const User = require("../models/user");
  // const capacitySchema = new mongoose.Schema({
  //   bedCount: { type: Number, default: 150 },
  //   ventilatorCount: { type: Number, default: 50 },
  // });
  // return await createCollection("capacity", {
  //   validator: {
  //     $jsonSchema: {
  //       bsonType: "object",
  //       properties: {
  //         bedCount: {
  //           bsonType: "number",
  //           description: "must be a number and is required",
  //         },
  //         ventilatorCount: {
  //           bsonType: "number",
  //           description:
  //             "must be a string and match the regular expression pattern",
  //         },
  //       },
  //     },
  //   },
  // });
  const users = User.find();

  //const Capacity = mongoose.model("Capacity", capacitySchema);
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  // Write migration here
}

module.exports = { up, down };
