const mongoose = require("mongoose");
const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    categoryImage: { type: String },
    parentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subcategorySchema);
