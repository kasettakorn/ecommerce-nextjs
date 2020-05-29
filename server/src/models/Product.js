var mongoose = require("mongoose");

var productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
    },
    price: {
      type: Number,
    },
    createDate: {
      type: Date,
    },
    updateDate: {
      type: Date,
    },
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "Products",
  }
);

var Product = mongoose.model("Product", productSchema);
module.exports = Product;
