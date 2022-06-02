import React, { useEffect, useState } from "react";
import Starter from "./Itemsubstarter";

export default function Dinnerall(props) {
  const { products, onAdd } = props;
  const [itemData, setItemdata] = useState(products);
  const [menuTag, setMenutag] = useState("All Items");
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  var newArr;

  const setData = (arg) => {
    if (arg == 1) {
      newArr = products.filter((element) => {
        return element.price > 0;
      });
      setItemdata(newArr);
      setMenutag("All Items");
    } else if (arg == 2) {
      newArr = products.filter((element) => {
        return element.subcategory == "Starter";
      });
      setItemdata(newArr);
      setMenutag("Starters");
    } else if (arg == 3) {
      newArr = products.filter((element) => {
        return element.subcategory == "Combo & Thali";
      });
      setItemdata(newArr);
      setMenutag("Combo & Thali");
    } else if (arg == 4) {
      newArr = products.filter((element) => {
        return element.subcategory == "Veg";
      });
      setItemdata(newArr);
      setMenutag("Veg Items");
    } else if (arg == 5) {
      newArr = products.filter((element) => {
        return element.subcategory == "Non Veg";
      });
      setItemdata(newArr);
      setMenutag("Non-Veg Items");
    } else if (arg == 6) {
      newArr = products.filter((element) => {
        return element.subcategory == "Bread & Roti";
      });
      setItemdata(newArr);
      setMenutag("Bread & Roti");
    } else if (arg == 7) {
      newArr = products.filter((element) => {
        return element.subcategory == "Rice & Biryani";
      });
      setItemdata(newArr);
      setMenutag("Rice & Biryani");
    } else if (arg == 8) {
      newArr = products.filter((element) => {
        return element.subcategory == "Sweets & Desserts";
      });
      setItemdata(newArr);
      setMenutag("Sweets & Desserts");
    }
  };
  const setFilter = (e) => {
    e.preventDefault();
    newArr = products.filter((element) => {
      return element.price > min && element.price < max;
    });
    setItemdata(newArr);
    setMenutag("All Items");
  };

  useEffect(() => {
    setItemdata(products.reverse());
  }, []);

  return (
    <div style={{ marginTop: "100px" }}>
      <div class="container-fluid" style={{ padding: "0", margin: "0" }}>
        <h2 className="title_header_menu_items">
          Dinner Menu
          <hr className="order_option_animate" style={{ height: "2px" }} />
        </h2>

        <div className="sidebar_holder_menu_items">
          <table className="menu_item_cat_filter_menu">
            <tr>
              <button
                className="vertical_cat_menu_item_button"
                onClick={() => setData(1)}
              >
                <td>All Items</td>
              </button>
            </tr>
            <tr>
              <button
                className="vertical_cat_menu_item_button"
                onClick={() => setData(2)}
              >
                <td>Starter</td>
              </button>
            </tr>

            <tr>
              <button
                className="vertical_cat_menu_item_button"
                onClick={() => setData(3)}
              >
                <td>Combo & Thalis</td>
              </button>
            </tr>
            <tr>
              <button
                className="vertical_cat_menu_item_button"
                onClick={() => setData(4)}
              >
                <td>Veg Food</td>
              </button>
            </tr>
            <tr>
              <button
                className="vertical_cat_menu_item_button"
                onClick={() => setData(5)}
              >
                <td>Non Veg Food</td>
              </button>
            </tr>
            <tr>
              <button
                className="vertical_cat_menu_item_button"
                onClick={() => setData(6)}
              >
                <td>Bread & Roti</td>
              </button>
            </tr>
            <tr>
              <button
                className="vertical_cat_menu_item_button"
                onClick={() => setData(7)}
              >
                <td>Rice & Biryani</td>
              </button>
            </tr>
            <tr>
              <button
                className="vertical_cat_menu_item_button"
                onClick={() => setData(8)}
              >
                <td>Sweets & Desserts</td>
              </button>
            </tr>
          </table>
          <div
            style={{
              marginLeft: "12%",
              marginTop: "7%",
              color: "#808b96",
            }}
          >
            <form>
              <table className="min_max_table">
                <tr className="mob_none_tr">
                  <td>
                    <hr />
                  </td>
                  <td>
                    <hr />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="item_filter_title">Price</span>
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="min"
                      className="filter_input"
                      value={min}
                      onChange={(e) => {
                        setMin(e.target.value);
                      }}
                    />
                    <input
                      type="number"
                      placeholder="max"
                      className="filter_input"
                      value={max}
                      onChange={(e) => {
                        setMax(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr className="mob_none_tr">
                  <td>
                    <hr />
                  </td>
                  <td>
                    <hr />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="item_filter_title">Discount</span>
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="min"
                      className="filter_input"
                    />
                    <input
                      type="number"
                      placeholder="max"
                      className="filter_input"
                    />
                  </td>
                </tr>
                <tr className="mob_none_tr">
                  <td>
                    <hr />
                  </td>
                  <td>
                    <hr />
                  </td>
                </tr>
              </table>
              <input
                type="submit"
                value="Filter"
                class="btn_login_form"
                className="filter_input_button"
                onClick={setFilter}
              />
            </form>
          </div>
        </div>

        <div className="product_holder_menu_items">
          <h4 className="product_items_header_on_menu">{menuTag}</h4>
          <Starter products={itemData} onAdd={onAdd} tag="Dinner"></Starter>
        </div>
      </div>
    </div>
  );
}
