import userEvent from "@testing-library/user-event";
import react, { useState } from "react";
import Address from "./address";
import { useHistory } from "react-router-dom";

function ContactUs(props) {
  const history = useHistory();
  var [error, setError] = useState(false);
  var [errorMessages, setMessage] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const contactData = async (e) => {
    e.preventDefault();
    const { name, email, subject, phone, message } = user;
    const res = await fetch("http://localhost:5001/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, subject, phone, message }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      setError(true);
      setMessage("contact form fields can't be empty ");
    } else if (res.status === 428 || !data) {
      setError(true);
      setMessage("phone number not in proper format");
    } else if (res.status === 451 || !data) {
      setError(true);
      setMessage("Email not in proper format");
    } else {
      props.onSend();
      history.push("/");
    }
  };
  return (
    <div style={{ marginTop: "130px" }}>
      <h1 className="contact_main_title_food">Contact Us</h1>
      <p className="contact_sub_title_food">We are happy to assist you</p>
      <div class="container-fluid contact_form_holder">
        <div class="container_contact_food">
          <div class="form-container_contact_food">
            <div class="left-container_contact_food">
              <div class="left-inner-container_contact_food">
                <h2 className="h2_contact">Let's Chat</h2>
                <p className="form_p_food">
                  Whether you have a question, want to know how to place an
                  order or book tables simply connect with us.
                </p>
                <br />
                <p className="form_p_food">
                  Feel free to send me a message in the contact form.
                </p>
              </div>
            </div>
            <div class="right-container_contact_food">
              <div class="right-inner-container_contact_food">
                <form method="POST" className="form_food_contact">
                  <h2
                    class="lg-view_contact_food h2_contact"
                    style={{ color: "orangered" }}
                  >
                    Connect Now
                  </h2>
                  <h2 class="sm-view_contact_food h2_contact">Let's Chat</h2>

                  <div class="social-container_contact_food">
                    <a href="#" class="social_contact_food">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="social_contact_food">
                      <i class="fab fa-google-plus-g"></i>
                    </a>
                    <a href="#" class="social_contact_food">
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                  <input
                    className="contact_food_input"
                    type="text"
                    placeholder="Name *"
                    name="name"
                    value={user.name}
                    onChange={handleInputs}
                  />
                  <input
                    className="contact_food_input"
                    type="text"
                    placeholder="Email *"
                    name="email"
                    value={user.email}
                    onChange={handleInputs}
                  />
                  <input
                    className="contact_food_input"
                    type="text"
                    placeholder="Subject"
                    name="subject"
                    value={user.subject}
                    onChange={handleInputs}
                  />
                  <input
                    className="contact_food_input"
                    type="number"
                    placeholder="Phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputs}
                  />
                  <textarea
                    className="contact_food_input"
                    rows="4"
                    placeholder="Message"
                    name="message"
                    value={user.message}
                    onChange={handleInputs}
                  ></textarea>
                  {error ? (
                    <p style={{ textAlign: "left", color: "red" }}>
                      * {errorMessages}
                    </p>
                  ) : (
                    ""
                  )}
                  <button
                    className="contact_us_food_button"
                    onClick={contactData}
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Address></Address>
    </div>
  );
}
export default ContactUs;
