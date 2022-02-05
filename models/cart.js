const path = require("path");
const fs = require("fs");

class Cart {
  static async add(course) {
    const data = await Cart.getCart();
    const idx = data.courses.findIndex((c) => c.id === course.id);
    const candidate = data.courses[idx];
    if (candidate) {
      candidate.count++;
      data.courses[idx] = candidate;
    } else {
      course.count = 1;
      data.courses.push(course);
    }
    data.price += +course.price;
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

  static async remove(id) {
    const data = await Cart.getCart();
    const idx = data.courses.findIndex((c) => c.id === id);
    console.log(idx);
    const course = data.courses[idx];
    console.log(course);
    if (course.count === 1) {
      data.courses = data.courses.filter((c) => c.id !== id);
    } else {
      data.courses[idx].count--;
    }
    data.price -= course.price;
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "cart.json"),
        JSON.stringify(data),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
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
