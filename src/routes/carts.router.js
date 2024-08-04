const { Router } = require("express");
const CartsManagerFs = require("../managers/FileSystem/carts.managers");

const router = Router();

const cartsManagerFs = new CartsManagerFs();

router.get("/", async (req, res) => {
  try {
    const cartsDb = await cartsManagerFs.getCarts();
    res.send({ status: "success", data: cartsDb });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const response = await cartsManagerFs.createCarts(body);

    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
