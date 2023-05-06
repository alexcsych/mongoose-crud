const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 64,
    },
    brand: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 64,
    },
    yearOfManufacture: {
      type: Number,
      min: 2000,
      // max: () => {
      //   let date = new Date();
      //   let year = date.getFullYear();
      //   return year;
      // },
      validate: {
        validator: v => {
          let date = new Date();
          let year = date.getFullYear();
          return v <= year;
        },
      },
    },
    ramSize: {
      type: Number,
      min: 2,
      validate: {
        validator: v => v % 2 === 0,
      },
    },
    nfc: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.ObjectId,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;
