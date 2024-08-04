const fs = require("fs");
const { join } = require("path");
const path = "./dbjson/productsDb.json";

class ProductsManagerFs {
  constructor() {
    this.path = path;
  }

  readProducts = async () => {
    try {
      if (fs.existsSync(path)) {
        const productsJson = await fs.promises.readFile(path, "utf-8");
        const productsJs = JSON.parse(productsJson);
        return productsJs;
      }
    } catch (error) {
      console.log(error);
    }

    return [];
  };

  getProducts = async () => {
    try {
      const products = await this.readProducts();
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  createProducts = async (newProduct) => {
    if (
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.code ||
      !newProduct.stock ||
      !newProduct.category
    ) {
      console.log("Producto incompleto");
      return "Producto incompleto";
    }

    try {
      const products = await this.readProducts();

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

  updateProducts = async (modProduct) => {
    try {
      const products = await this.readProducts();
      const pId = products.findIndex((product) => product.id === modProduct.id);

      if (pId !== -1) {
        products[pId] = { ...products[pId], ...modProduct };

        await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));

        return products[pId];
      } else {
        console.log("Producto no encontrado");
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteProducts = async (delProductId) => {
    try {
      const products = await this.readProducts();
      console.log(delProductId);

      const pId = products.find(
        (product) => Number(product.id) === Number(delProductId)
      );

      if (pId !== -1) {
        products.splice(pId, 1);

        await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));

        return { message: "Producto eliminado con éxito" };
      } else {
        console.log("Producto no encontrado");
        return { message: "Producto no encontrado" };
      }
    } catch (error) {
      console.log(error);
      return { message: "Error al eliminar el producto" };
    }
  };
}

module.exports = ProductsManagerFs;
