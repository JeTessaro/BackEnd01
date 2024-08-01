const fs = require("fs");
const { join } = require("path");
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
    const itemsCarts = await this.readcarts();
    return itemsCarts;
  };

  createCarts = async (newCarts) => {
    try {
      const itemsCarts = await this.readcarts()

      if (itemsCarts.length === 0) {
        newCarts.id = 1
      } else {
        newCarts.id = carts[carts.length - 1].id + 1
      }

      carts.push(newCarts)
      await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"))

      return newCarts
    } catch (error) {
      console.log(error)
    }
  };

  udateCarts = async (modCarts) => {
    try {
      const itemsCarts = await this.readcarts()
      const cId = carts.findId(carts.id === modCarts.findId)

      if (cId !== -1) {
        carts[id] = { ...carts[cId], ...modCarts }

        await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"))

        return carts[cId]
      } else {
        return console.log("Producto no encontrado");
      }
    } catch (error) {
      console.log(error);
    }
  };
}
deleteCarts = async (delCarts) => {
  try {
    const carts = await this.readcarts();

   
    const cId = carts.findIndex((carts) => carts.id === delCarts);

    if (id !== -1) {
      
      carts.splice(id, 1);

      await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));

      return { message: "Producto eliminado con éxito" }
    } else {
      return console.log("Producto no encontrado");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = CartsManagerFs;

