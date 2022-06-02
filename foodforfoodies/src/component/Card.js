import React from "react";

function Card(props) {
  return (
    <div>
      <div className="Category_Item">
        <img src={props.image} className="category_image"></img>
        <h3 className="category_title">{props.title}</h3>
      </div>
    </div>
  );
}
export default Card;
