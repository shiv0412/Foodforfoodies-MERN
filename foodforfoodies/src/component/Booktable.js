import react, { useState } from "react";
import table from "../images/backbook.jfif";
import { useHistory } from "react-router-dom";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";

function Booktable(props) {
  const history = useHistory();
  var [error, setError] = useState(false);
  var [errorMessages, setMessage] = useState("");
  const startdate = new Date();
  const month = startdate.getMonth() + 1;
  const datenext = new Date().getDate() + 5;
  const enddate = startdate.getFullYear() + " " + month + " " + datenext;
  const [user, setUser] = useState({
    username: "",
    email: "",
    name: "",
    phone: "",
    date: "",
    persons: "",
    ocassion: "",
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const bookData = async (e) => {
    e.preventDefault();
    const { username, email, name, phone, date, persons, ocassion } = user;
    const res = await fetch("http://localhost:5001/bookingtables", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        name,
        phone,
        date,
        persons,
        ocassion,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      setError(true);
      setMessage("Booking form fields can't be empty ");
    } else if (res.status === 428 || !data) {
      setError(true);
      setMessage("Phone number not in proper format");
    } else if (res.status === 423 || !data) {
      setError(true);
      setMessage("username not correct or unregistered");
    } else if (res.status === 451 || !data) {
      setError(true);
      setMessage("Email not in proper format");
    } else {
      props.onBooking();
      history.push("/veg");
    }
  };

  return (
    <div>
      <div class="container-fluid book_background_holder">
        <div class="container book_table_upper_holder">
          <div class="row">
            {/* <div class=" col-sm book_table_image_div">
              <img src={table}></img>
            </div> */}
            <div class=" col-sm book_table_form_div">
              <div className="form_holder">
                <h1 className="book_title">Book Your Table</h1>
                <h4 className="book_form_title">BOOKING FORM</h4>
                <p className="book_form_tag">
                  PLEASE FILL OUT ALL REQUIRED* FIELDS. THANKS!
                </p>
                <form method="POST">
                  <div class="row">
                    <div style={{ marginBottom: "20px" }}>
                      <input
                        type="text"
                        class="form-control"
                        name="username"
                        id="username"
                        value={user.username}
                        onChange={handleInputs}
                        placeholder="Enter your username"
                        style={{
                          border: "2px dashed #A6ACAF",
                          backgroundColor: "#ECF0F1 ",
                          color: "orangered",
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                      <input
                        type="text"
                        class="form-control"
                        name="email"
                        id="email"
                        value={user.email}
                        onChange={handleInputs}
                        placeholder="Enter your email"
                        style={{
                          border: "2px dashed #A6ACAF",
                          backgroundColor: "#ECF0F1 ",
                          color: "orangered",
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter your name"
                        style={{
                          border: "2px dashed #A6ACAF",
                          backgroundColor: "#ECF0F1 ",
                          color: "orangered",
                        }}
                        name="name"
                        id="name"
                        value={user.name}
                        onChange={handleInputs}
                      />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Enter contact number"
                        style={{
                          border: "2px dashed #A6ACAF",
                          backgroundColor: "#ECF0F1 ",
                          color: "orangered",
                        }}
                        name="phone"
                        id="phone"
                        value={user.phone}
                        onChange={handleInputs}
                      />
                    </div>
                    <details>
                      <summary style={{ color: "red", paddingBottom: "15px" }}>
                        Check Availability
                      </summary>
                      <div style={{ marginBottom: "20px", width: "100%" }}>
                        <CalendarComponent
                          min={startdate}
                          max={enddate}
                          style={{ width: "50%", color: "red" }}
                        ></CalendarComponent>
                      </div>
                    </details>
                    <div style={{ marginBottom: "20px" }}>
                      <input
                        type="datetime-local"
                        class="form-control"
                        placeholder="Enter date and time"
                        style={{
                          border: "2px dashed #A6ACAF",
                          backgroundColor: "#ECF0F1 ",
                          color: "orangered",
                        }}
                        name="date"
                        id="date"
                        value={user.date}
                        onChange={handleInputs}
                      />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Enter number of persons"
                        style={{
                          border: "2px dashed #A6ACAF",
                          backgroundColor: "#ECF0F1 ",
                          color: "orangered",
                        }}
                        name="persons"
                        value={user.persons}
                        onChange={handleInputs}
                      />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter ocassion"
                        style={{
                          border: "2px dashed #A6ACAF",
                          backgroundColor: "#ECF0F1 ",
                          color: "orangered",
                        }}
                        name="ocassion"
                        value={user.ocassion}
                        onChange={handleInputs}
                      />
                    </div>
                  </div>
                  {error ? (
                    <p style={{ textAlign: "left", color: "red" }}>
                      * {errorMessages}
                    </p>
                  ) : (
                    ""
                  )}
                  <div style={{ textAlign: "center" }}>
                    <button className="table_book_button" onClick={bookData}>
                      Book My Table
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div class=" col-sm book_table_image_div">
              <img src={table}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Booktable;
