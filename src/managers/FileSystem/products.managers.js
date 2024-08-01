const fs = require("fs");
const { join } = require("path");
const path = "./dbjson/productsDb.json";

class ProductManagerFs {
  constructor() {
    this.path = path;
  }
  readproducts = async () => {
    if (fs.existsSync(path)) {
      const productsJson = await fs.promises.readFile(path, "utf-8");
      const productsJs = JSON.parse(productsJson);
      return productsJs;
    }
    return [];
  };

  getProducts = async () => {
    const products = await this.readproducts();
    return products;
  };

  createProducts = async (newProduct) => {
    try {
      const products = await this.readproducts();

      if (products.length === 0) {
        newProduct.id = 1;
      } else {
        newProduct.id = products[products.length - 1].id + 1;
      }

      products.push(newProduct);
      await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));

      return newProduct;
    } catch (error) {
      console.log(error);
    }
  };

  udateProducts = async (modProduct) => {
    try {
      const products = await this.readproducts();
      const pId = products.findId(product.id === modProduct.findId);

      if (pId !== -1) {
        products[id] = { ...products[pId], ...modProduct };

        await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));

        return products[pId];
      } else {
        return console.log("Producto no encontrado");
      }
    } catch (error) {
      console.log(error);
    }
  };
}
deleteProduct = async (delProduct) => {
  try {
    const products = await this.readproducts();

   
    const pId = products.findIndex((product) => product.id === delProduct);

    if (pId !== -1) {
      
      products.splice(pId, 1);

      await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));

      return { message: "Producto eliminado con éxito" }
    } else {
      return console.log("Producto no encontrado");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = ProductManagerFs;
