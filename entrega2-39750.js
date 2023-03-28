const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.products = [];
    this.path = filePath;
    this.lastId = 1
    try {
      if (fs.existsSync(this.path)) {
      const jsonFile = fs.readFileSync(this.path, 'utf-8');
      const data = JSON.parse(jsonFile)
      this.products = data
      } else {
      fs.writeFileSync(this.path, JSON.stringify(this.products),'utf-8')
      }
      
    } catch (err) {
      console.log(err) 
    }
      
  }
  
  readProducts = async () => {
    const respuesta = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(respuesta);
  };

  getProducts = async () => {
    try {
      console.log(this.products)
    } catch (err) {
      console.log(err);
    }
  };

  addProduct = async (title ,description ,price ,thumbnail ,code ,stock) => {
    try {
      const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      const existingCode = this.products.find((product) => product.code === code);

      if (!title || !description || !code || !thumbnail || !price || !stock) {
        console.log("Todos los campos son obligatorios!");
      } else if (existingCode) {
        console.log("Ya existe un producto con ese codigo");
      } else {
        if (this.products.length > 0) {
          this.lastId = this.products[this.products.length - 1].id + 1;
        }
        this.products.push({ id: this.lastId, ...newProduct });
        await fs.promises.writeFile(this.path,JSON.stringify(this.products, "utf-8", "\t"));
        console.log("Producto agregado.");
      }

    } catch (err) {
      console.log(err);
    }
  };


  getProductById = async (id) => {
    try{
      let existingId = this.products.find((product) => product.id === id);
      return existingId? console.log(existingId) : console.log(`El producto con ID ${id} no existe.`);
    } catch (err){
      console.log(err)
    }
  };

  deleteProduct = async (id) => {
    try{
      const productIndex = this.products.findIndex((product) => product.id === id);
      const productsFilter = this.products.filter((product) => product.id !== id);
      
      if (productIndex === -1) {
        return console.log(`El producto con ID ${id} no existe.`);
      } else {
        await fs.promises.writeFile(this.path,JSON.stringify(productsFilter, "utf-8", "\t"));
        console.log(`El producto con ID ${id} ha sido eliminado correctamente.`);
      }
      
    } catch (err){
      console.log(err)
    }
  };

  updateProduct = async ({ id, ...obj }) => {
    try {
      const productIndex = this.products.findIndex((product) => product.id === id);
  
      if (productIndex === -1) {
        return console.log(`El producto con ID ${id} no existe.`);
      } else {
        await this.deleteProduct(id);
        let oldProduct = await this.readProducts();
        let productModify = [...oldProduct, { id, ...obj }];
        await fs.promises.writeFile(this.path, JSON.stringify(productModify, "utf-8", "\t"));
        console.log(`El producto con ID ${id} ha sido modificado y agregado`);
      }
    } catch (err) {
      console.log(err);
    }
  };

}



//TESTING

const testing = new ProductManager("./productos.json");

//*TEST1* valida si existe el archivo y lo muestra, si no existe lo crea

/* testing.getProducts() */


//*TEST2* agrego producto con validaciones de campo, code no repetible y id autoincrementable

/* testing.addProduct(
  "producto de prueba",
  "este es unproducto de prueba",
  200,
  "sin imagen",
  "abc123",
  25
);

testing.addProduct(
  "producto de prueba 2",
  "este es unproducto de prueba 2",
  2002,
  "sin imagen2",
  "abc1234",
  252
);  
testing.addProduct(
  "producto de prueba 3",
  "este es unproducto de prueba 3",
  2003,
  "sin imagen3",
  "abc12345",
  252
);  
testing.addProduct(
  "producto de prueba 4",
  "este es unproducto de prueba 4",
  2003,
  "sin imagen3",
  "abc123456",
  252
); */  


// *TEST3* se llama al metodo getProduct mostrando los productos

/* testing.getProducts()  */


// *TEST4* se llama al metodo getProductById muestra el objeto por id si no existe devuelve error

 /* testing.getProductById(3) */



// *TEST5* actualiza el producto sin perder el id

/* testing.updateProduct({
  id: 3,
  title: "PRODUCTO MODIFICADO",
  description: "PRODUCTO MODIFICADO",
  price: 20063,
  thumbnail: "PRODUCTO MODIFICADO",
  code: "abc12345",
  stock: 253
}) */


// *TEST6* se llama al metodo deleteProduct eliminando el producto pasado por id de la lista, si no exite tira error

/* testing.deleteProduct(3) */
