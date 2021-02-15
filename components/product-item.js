// product-item.js

class ProductItem extends HTMLElement {
  constructor(id, image, alt, title, price ) {
    super();
    let shadow = this.attachShadow({mode: 'open'});

    let list = document.createElement('li');
    list.setAttribute('class','product');
    list.setAttribute('id',id);

    
    

    let img = document.createElement('img');
    img.setAttribute('src', image);
    img.setAttribute('alt', alt);
    img.setAttribute('width','200');

    let p1 = document.createElement('p');
    p1.setAttribute('class','title');
    p1.innerHTML= title;

    let p2 = document.createElement('p');
    p2.setAttribute('class','price');
    p2.innerHTML= price;

    let button = document.createElement('button');
    button.setAttribute('onclick',"alert('Added to Cart!')");
    button.innerHTML="Add to Cart";
    button.addEventListener('click',  function Clicked(){
      if (button.innerHTML == "Add to Cart"){
        document.getElementById('cart-count').innerHTML = parseInt(document.getElementById('cart-count').innerHTML, 10) + 1; 
        button.innerHTML="Remove from Cart";
        addToCart();
      }
      else{
        document.getElementById('cart-count').innerHTML -=1; 
        button.innerHTML="Add to Cart";
        removeFromCart();
      }
    });

    function addToCart()
    {
      let dacart = JSON.parse(localStorage.getItem("Cart"));
      dacart.push(id);
      localStorage.setItem("Cart", dacart);
    }
    function removeFromCart()
    {
      let recart = JSON.parse(localStorage.getItem("Cart"));
      recart = arrayRemove(recart, id); 
      localStorage.setItem("Cart", recart);
    }

    function arrayRemove(arr, value) { 
    
      return arr.filter(function(ele){ 
          return ele != value; 
      });
    }
    
    let CartIds = JSON.parse(localStorage.getItem("Cart"));
    for (let i =0; i<CartIds.length; i++)
    {
      if (CartIds[i] == id)
      {
        document.getElementById('cart-count').innerHTML = parseInt(document.getElementById('cart-count').innerHTML, 10) + 1; 
        button.innerHTML="Remove from Cart";
      } 
    }

    let style = document.createElement('style');
    style.textContent =`
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    `;
    shadow.appendChild(style);
    shadow.appendChild(list);
    list.appendChild(img);
    list.appendChild(p1);
    list.appendChild(p2);
    list.appendChild(button);
  }
}

customElements.define('product-item', ProductItem);