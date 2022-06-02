import React from "react";

function Insights(props) {
  var email = props.userdata.email;
  var number = props.orderdata.filter((element) => {
    return element.d_email == email && element.status !== "Completed";
  });
  var x = number.length;

  return (
    <div className="insight_main">
      <div
        className="dboy_insights_data_holder"
        style={{
          borderColor: props.color,
        }}
      >
        <h3 className="insights_header_dboy">{props.name} Orders</h3>
        <p className="insights_number_dboy">{x}</p>
      </div>
    </div>
  );
}

export default Insights;
