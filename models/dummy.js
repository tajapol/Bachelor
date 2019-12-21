// product class

const products = [];

module.exports = class Products {
  constructor(t) {
    this.title = t;
  }

  save() {
    products.push(this);
  }

  //makes sue that I can call the method directly on the class itself and on instantiated object
  static fetchAll() {
    return this.products;
  }
};
