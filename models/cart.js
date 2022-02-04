const path = require("path");
const fs = require("fs");

class Cart {
  static async add(course) {
    const data = await Cart.getCart();
    data.courses.push(course);
    data.price += course.price;
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "cart.json"),
        JSON.stringify(data),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static getCart() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "cart.json"),
        "utf-8",
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(data));
          }
        }
      );
    });
  }
}

module.exports = Cart;
