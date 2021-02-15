// Script.js

window.addEventListener('DOMContentLoaded', () => {
  fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(function(data) {
    localStorage.setItem("products" , JSON.stringify(data));
    let products = JSON.parse(localStorage.getItem("products"));
    let cart =[0];
    localStorage.setItem("Cart",JSON.stringify(cart));
    for (let i =0; i<products.length; i++)
    {
      let productItem = new ProductItem(products[i].id, products[i].image, products[i].description, products[i].title, products[i].price);
      document.getElementById('product-list').appendChild(productItem);
    }

  });
});

