const express = require("express");
const fs = require("fs");
const cors = require("cors");
const voucher_codes = require("voucher-code-generator");
const e = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Grandma bakery server running!");
});

app.get("/products", (req, res) => {
  fs.readFile("./data/products.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      const products = JSON.parse(jsonString);
      res.send(products);
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
});

app.get("/cartProducts", (req, res) => {
  fs.readFile("./data/cartProduct.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      const cartProducts = JSON.parse(jsonString);
      res.send(cartProducts);
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
});

app.post("/cartProducts", (req, res) => {
  const product = req.body;

  fs.readFile("./data/cartProduct.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const cartProducts = JSON.parse(data);
      cartProducts.push(product);
      fs.writeFile(
        "./data/cartProduct.json",
        JSON.stringify(cartProducts),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("added");
          }
        }
      );
    }
  });
});

app.post("/cartAmount", (req, res) => {
  const total = req.body;
  const amount = total.total;
  fs.writeFileSync("./data/cartAmount.json", JSON.stringify(amount, null, 1));
  console.log(amount);
});

app.get("/cartAmount", (req, res) => {
  fs.readFile("./data/cartAmount.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      res.status(200).send(parsedData);
    }
  });
});

app.get("/cartAllData", (req, res) => {
  fs.readFile("./data/cartAllData.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      const cartAllData = JSON.parse(jsonString);
      res.send(cartAllData);
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
});

app.post("/cartAllData", (req, res) => {
  const product = req.body;
  console.log(product);

  fs.readFile("./data/cartAllData.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const cartAllData = JSON.parse(data);
      cartAllData.push(product);
      fs.writeFile(
        "./data/cartAllData.json",
        JSON.stringify(cartAllData),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("added");
          }
        }
      );
    }
  });
});

app.get("/coupons", (req, res) => {
  fs.readFile("./data/coupons.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      const coupons = JSON.parse(jsonString);
      res.send(coupons);
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
});

app.post("/coupons", (req, res) => {
  const coupon = req.body;
  console.log(coupon);

  fs.readFile("./data/coupons.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const coupons = JSON.parse(data);
      coupons.push(coupon);
      fs.writeFile("./data/coupons.json", JSON.stringify(coupons), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("added");
        }
      });
    }
  });
});

app.get("/discount", (req, res) => {
  const discountCode = voucher_codes.generate({
    length: 8,
  });
  res.send(discountCode[0]);
});

app.listen(port, () => {
  console.log(`Grandma bakery app listening on port ${port}`);
});
