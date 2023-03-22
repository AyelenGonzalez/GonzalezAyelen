const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  addProduct = (product) => {
    const products = this.getProducts();
    const newProduct = {
      ...product,
      id: products.length + 1,
    };
    products.push(newProduct);
    fs.writeFileSync(this.filePath, JSON.stringify(products));
    return newProduct;
  }

  getProducts = () => {
    try {
      const products = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(products);
    } catch (error) {
      console.error(`Error while reading file: ${error}`);
      return [];
    }
  }

  getProductById = (id) => {
    const products = this.getProducts();
    return products.find((product) => product.id === id);
  }

  updateProduct = (id, fieldsToUpdate) => {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      const updatedProduct = {
        ...products[index],
        ...fieldsToUpdate,
        id,
      };
      products[index] = updatedProduct;
      fs.writeFileSync(this.filePath, JSON.stringify(products));
      return updatedProduct;
    } else {
      throw new Error(`Product with id ${id} not found`);
    }
  }

  deleteProduct = (id) => {
    const products = this.getProducts();
    const filteredProducts = products.filter((product) => product.id !== id);
    if (filteredProducts.length !== products.length) {
      fs.writeFileSync(this.filePath, JSON.stringify(filteredProducts));
      return true;
    } else {
      throw new Error(`Product with id ${id} not found`);
    }
  }
}
