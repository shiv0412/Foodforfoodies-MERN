import React from "react";

export default function Starter(props) {
  const { products, onAdd } = props;
  products.reverse();
  return (
    <div>
      {products.map((product) => {
        return (
          <div>
            <div class="row menu_item_row_categorization">
              <div class="col-sm menu_item_col_categorization">
                <img
                  src={product.image}
                  className="menu_item_image_categorization"
                ></img>
              </div>
              <div class="col-sm menu_item_col_categorization">
                <h6 className="menu_item_heading_categorization">
                  {product.name}
                </h6>
                <p style={{ padding: "0", margin: "0", color: "orangered" }}>
                  &#9733; &#9733; &#9733;&#9733;&#9734;
                </p>
                <p className="menu_item_para_categorization">
                  <span>&#8377; {product.price}</span>
                  <br /> &#9632; tags :&nbsp;
                  <span style={{ color: "orangered" }}>
                    {product.subcategory.toLowerCase()}
                  </span>
                  &nbsp;,&nbsp;
                  <span style={{ color: "orangered" }}>
                    {props.tag == ""
                      ? product.subcategory.toLowerCase()
                      : props.tag.toLowerCase()}
                  </span>
                </p>
              </div>
              <div class="col-sm menu_item_col_categorization">
                <button
                  className="menu_item_button_categorization"
                  onClick={() => onAdd(product)}
                >
                  Add <span style={{ color: "orangered" }}>+</span>
                </button>
              </div>
            </div>
            <div class="row" style={{ width: "85%", margin: "auto" }}>
              <hr style={{ height: "1px" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
