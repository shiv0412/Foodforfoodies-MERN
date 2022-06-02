import React from "react";

function Recentouter(props) {
  console.log("data on recent counter page", props.orderdata);
  return (
    <div>
      {props.orderdata.map((cvalue) => {
        return (
          <div className="order_recent_holder_curosal">
            <p>
              Order Id :{" "}
              <span style={{ color: "orangered" }}>{cvalue.orderno}</span>
            </p>
            <p>&#9673;&nbsp; &nbsp;{cvalue.cust_name}</p>
            <p>&#9673;&nbsp; &nbsp;{cvalue.cust_phone}</p>
            <p>&#9673;&nbsp; &nbsp;{cvalue.address}</p>
            <button>
              <span className="button_order_handler_one">Accept</span>
            </button>
            <button>
              <span className="button_order_handler_two">View</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Recentouter;
