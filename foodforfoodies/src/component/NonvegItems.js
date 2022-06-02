import React, { useState } from "react";
import Product from "./Product";
import Categories from "../component/Category";
import Categorydesk from "./Categorydesk";

export default function MainItems(props) {
  const { products, onAdd } = props;
  const [filterproducts, setFilter] = useState(products);
  const [minprice, setMinprice] = useState(0);
  const [maxprice, setMaxprice] = useState(1000000);

  const setPrice = (min, max) => {
    setMinprice(min);
    setMaxprice(max);
  };

  var newarr = filterproducts.filter((element) => {
    return element.price < maxprice && element.price > minprice;
  });

  console.log("filter hue kya ", filterproducts);

  return (
    <div class="container-fluid" style={{ marginBottom: "1100px" }}>
      <Categories />
      <div>
        <div className="desktop_category_curosal">
          <Categorydesk filterFunction={setPrice}></Categorydesk>
        </div>
        <div className="category_wise_items_holder">
          <h2
            style={{
              textAlign: "center",
              color: "#566573 ",
              fontFamily: "serif",
            }}
          >
            ***Non-Veg Delight***
          </h2>
          {newarr.map((product) => (
            <Product
              key={product._id}
              product={product}
              onAdd={onAdd}
            ></Product>
          ))}
        </div>
      </div>
    </div>
  );
}
