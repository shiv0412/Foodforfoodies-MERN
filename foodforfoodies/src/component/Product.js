import React from "react";

export default function Product(props) {
  const { product, onAdd } = props;
  return (
    <div>
      <div className="food_item_container">
        <div className="item_image_container">
          <img
            src={product.image}
            alt={product.name}
            className="product_image"
          />
        </div>

        <h3 className="product_title">
          {product.name} <br />
          &#9733;&#9733;&#9733;&#9733;&#9734;
        </h3>
        <h4 className="product_price">&#8377; {product.price}</h4>

        <button className="product_add" onClick={() => onAdd(product)}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}
