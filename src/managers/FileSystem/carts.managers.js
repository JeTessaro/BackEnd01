const fs = require("fs");
const { join } = require("path");
const internal = require("stream");
const path = "./dbjson/cartsDb.json";

class CartsManagerFs {
  constructor() {
    this.path = path;
  }
  readcarts = async () => {
    if (fs.existsSync(path)) {
      const cartsJson = await fs.promises.readFile(path, "utf-8");
      const cartsJs = JSON.parse(cartsJson);
      return cartsJs;
    }
    return [];
  };

  getCarts = async () => {
    try {
      const itemsCarts = await this.readcarts();
      return itemsCarts;
    } catch (error) {
      console.log(error);
    }
  };

  createCarts = async (newCarts) => {
    try {
      const itemsCarts = await this.readcarts();

      const existeProduct = itemsCarts.findIndex(
        (item) => item.code === newCarts.code
      );

      if (existeProduct !== -1) {
        itemsCarts[existeProduct].cant += newCarts.cant;
      } else {
        if (itemsCarts.length === 0) {
          newCarts.id = 1;
        } else {
          newCarts.id = itemsCarts[itemsCarts.length - 1].id + 1;
        }
        itemsCarts.push(newCarts);
      }

      await fs.promises.writeFile(path, JSON.stringify(itemsCarts, null, "\t"));
      return newCarts;
    } catch (error) {
      console.log(error);
    }
  };

  udateCarts = async (modCarts) => {
    try {
      const itemsCarts = await this.readcarts();
      const cId = itemsCarts.findId(carts.id === modCarts.Id);

      if (cId !== -1) {
        carts[id] = { ...carts[cId], ...modCarts };

        await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));

        return carts[cId];
      } else {
        return console.log("Producto no encontrado");
      }
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = CartsManagerFs;
