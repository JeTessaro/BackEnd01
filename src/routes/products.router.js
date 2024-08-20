const { Router } = require("express");
const ProductsManagerFs = require("../managers/FileSystem/product.managers");

const router = Router();

const productsManagerFs = new ProductsManagerFs();

router.get("/", async (req, res) => {
  try {
    const productsDb = await productsManagerFs.getProducts();
    res.render({ status: "success", data: productsDb });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const response = await productsManagerFs.createProducts(body);

    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const { body } = req;
    const response = await productsManagerFs.updateProducts(body);

    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { body } = req;
    const response = await productsManagerFs.deleteProducts(body);

    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
