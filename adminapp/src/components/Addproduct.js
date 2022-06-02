import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export const AddProduct = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Fresh Arrival");
  const [subcategory, setSubcategory] = useState("Starter");

  const addToList = (event) => {
    event.preventDefault();
    const putdata = new FormData();
    putdata.append("name", name);
    putdata.append("profile", image);
    putdata.append("price", price);
    putdata.append("category", category);
    putdata.append("subcategory", subcategory);

    Axios.post("http://localhost:4000/upload", putdata)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    history.push("/additem");
  };

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <h3
        style={{
          textAlign: "center",
          padding: "20px 0px",
          color: "#566573",
          fontFamily: "fantasy",
          letterSpacing: "1px",
        }}
      >
        Add New Product
      </h3>
      <div
        style={{
          padding: "30px 0px",
          border: "2px solid orangered",
          textAlign: "center",
          boxShadow: "1px 1px 5px 1px grey",
        }}
      >
        <form>
          <table style={{ display: "inline-block", textAlign: "left" }}>
            <tr>
              <td style={{ padding: "10px" }}>Product Name</td>
              <td style={{ padding: "10px" }}>
                <input
                  type="text"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Product Image</td>
              <td style={{ padding: "10px" }}>
                <input
                  type="file"
                  onChange={(event) => {
                    setImage(event.target.files[0]);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Product Price</td>
              <td style={{ padding: "10px" }}>
                <input
                  type="number"
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Product Category</td>
              <td style={{ padding: "10px" }}>
                <select
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                >
                  <option value="Fresh Arrival">Fresh Arrival</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Also Like">Featured</option>
                  <option value="Veg">Veg</option>
                  <option value="Non Veg">Non Veg</option>
                  <option value="SidesandDrinks">SidesandDrinks</option>
                </select>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Product Sub Category</td>
              <td style={{ padding: "10px" }}>
                <select
                  onChange={(event) => {
                    setSubcategory(event.target.value);
                  }}
                >
                  <option value="Starter">Starter</option>
                  <option value="Combo & Thali">Combos & Thali</option>
                  <option value="Veg">Veg Food</option>
                  <option value="Non Veg">Non Veg Food</option>
                  <option value="Bread & Roti">Bread & Roti</option>
                  <option value="Rice & Biryani">Rice & Biryani</option>
                  <option value="Sweets & Desserts">Sweets & Desserts</option>
                </select>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <br />
                <br />
                <button
                  className="add_product_button_admin"
                  onClick={addToList}
                >
                  Add Product
                </button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
