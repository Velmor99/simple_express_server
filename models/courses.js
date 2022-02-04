const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class Courses {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuidv4();
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "data.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }

  toData() {
    return ({
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id,
    });
  }

  async Save() {
    const courses = await Courses.getAll();
    courses.push(this.toData());
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "data.json"),
        JSON.stringify(courses),
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
}

module.exports = Courses;
