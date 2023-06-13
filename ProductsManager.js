const fs = require('fs')
class ProductManager {
   constructor(ProductsPath) {
      this.products = [];
      this.productsId = 0;
      this.ProductsPath = ProductsPath;
      this.loadProducts();
   }

   loadProducts(){
      try{
         const data = fs.readFileSync(this.ProductsPath, 'utf8');
         this.products=JSON.parse(data);
         this.updateProductsId();
      }
      catch(error){
         this.products=[];
      }
   }

   saveProducts(){
      const data = JSON.stringify(this.products);
      fs.writeFileSync(this.ProductsPath, data, 'utf8')
   }

   updateProductsId(){
      if(this.products.length>0){
         this.productsId = Math.max(...this.products.map(product => product.id));
      }
   }
   
   addProduct = (title, description, price, image, code, stock) => {
     
      if (!title || !description || !price || !image || !code || !stock) {
         console.log("Todos los campos son obligatorios.");
         return;
      }

      
      const codeExists = this.products.some(product => product.code === code);
      if (codeExists) {
         console.log("El código ya existe.");
         return;
      }

      const product = {
         id: ++this.productsId,
         title,
         description,
         price,
         image,
         code,
         stock,
      };
      this.products.push(product);
      this.saveProducts()
   };

   getProductById(idProduct) {
      const product = this.products.find(product => product.id === idProduct);
      if (!product) {
         console.log("No encontrado.");
         return;
      }
      return product;
   }

   updateProduct(idProduct, updatedFields) {
      const product = this.products.find(product => product.id === idProduct);
      if (!product) {
         console.log("No encontrado.");
         return;
      }

      Object.assign(product, updatedFields);
      this.saveProducts();
   }

   deleteProduct(idProduct) {
      const index = this.products.findIndex(product => product.id === idProduct);
      if (index === -1) {
         console.log("No encontrado.");
         return;
      }

      this.products.splice(index, 1);
      this.saveProducts();
   }
   getProducts() {
      return this.products;
   }
}

// funcionamiento:
// agregue para crear 3 productos, mostrarlos con el console.log().
// actualize el producto 2, lo mostre en consola.
// elimine el producto 1  y mostre en consola, usando todas las funcionalidades.


const productManager = new ProductManager('products.json');

productManager.addProduct("remera", "azul", 80, 'sin imagen', 'ABC123', 10);
productManager.addProduct("jeans", "negro", 20, 'sin imagen', 'ABC124', 15);
productManager.addProduct("zapatillas", "rojas", 50, 'sin imagen', 'ABC125', 20);

console.log(productManager.getProducts());

const updatedFields = {
   title: "gorra",
   description: "nueva descripción",
   price: 100,
   image: "nueva imagen",
   code: "XYZ789",
   stock: 5
};
productManager.updateProduct(2, updatedFields);

console.log(productManager.getProductById(2));

productManager.deleteProduct(1);

console.log(productManager.getProducts());