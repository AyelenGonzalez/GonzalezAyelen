class ProductManager {
  constructor() {
    this.products = [];
    this.currentId = 0;
  }

  addProduct(product) {
    // Validamos que todos los campos sean obligatorios
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.log('Error: todos los campos son obligatorios');
      return;
    }

    // Validamos que el campo "code" no esté repetido
    const codeExists = this.products.some(p => p.code === product.code);
    if (codeExists) {
      console.log('Error: ya existe un producto con ese código');
      return;
    }

    // Creamos el producto con un id autoincrementable
    const newProduct = {
      id: ++this.currentId,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock
    };

    // Agregamos el producto al arreglo de productos
    this.products.push(newProduct);
    console.log('Producto agregado:', newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (product) {
      return product;
    } else {
      console.log('Error: producto no encontrado');
    }
  }
}
