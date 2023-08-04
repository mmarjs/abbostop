import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordian from "../components/Contact/Accordian";
import Link  from "next/link";
import { API_URL } from "../config";

const Contact = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    body: "",
  });
  const [messageStatus, setMessageStatus] = useState(null);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value);
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let input = document.getElementsByTagName("input");
    let textarea = document.getElementsByTagName("textarea");
    let flag = true;
    for (let [key, value] of Object.entries(input)) {
      console.log("value :" + value.value);
      if ((value.required && value.value == "") || value.value === undefined) {
        value.className = "border-1 border-danger shadow-danger contact-input";
        console.log(value.value);
        flag = false;
      } else if (value.required && value.value) {
        value.className = "contact-input";
        console.log(value.value);
      }
    }
    for (let [key, value] of Object.entries(textarea)) {
      console.log("value :" + value.value);
      if ((value.required && value.value == "") || value.value === undefined) {
        value.className = "border-1 border-danger shadow-danger contact-input";
        console.log(value.value);
        flag = false;
      } else if (value.required && value.value) {
        value.className = "contact-input";
        console.log(value.value);
      }
    }
    console.log(flag);
    if (flag) {
      let data = {
        name: contact?.name,
        email: contact?.email,
        body: contact?.body,
      };
      let config = {
        method: "post",
        url: `${API_URL}/contact/email`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          setMessageStatus(true);
          // setContact({name:'',email:"",body:""})
        })
        .catch((error) => {
          setMessageStatus(false);
          console.log(error);
          // setContact({name:'',email:"",body:""})
        });
      setContact({ name: "", email: "", body: "" });

      console.log(contact);
    }
  };
  
  useEffect(() => {
    document.title = "Neem Direct Contact Op Met Abbo Stop & Stel Je Vragen";
  }, []);
  return (
    <main>
      <div className="bgForPage cantact bg-light">
        <section className="breadcrumbs category bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-6 breadcrumb-section">
                <ol>
                  <li>
                    <Link href="/">Opzeggen</Link>
                  </li>
                  <li className="active">
                    <Link href="#">Contact</Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="contact">
          <div className="container ">
            <h1 className="text-center mt-5">Contact</h1>
            <p className="sub-heading p-align">
              Wil je contact opnemen met ons? We horen graag van je. Je kunt ons
              op de volgende manieren bereiken:
            </p>
            <div className="contact-card-contaner">
              <div className="contact-card">
                <img src={'/assets/images/Icon_Mail.svg'} />
                <p className="head">Mail</p>
                <p>support@abbostop.nl</p>
              </div>
              <div className="contact-card">
                <img src={'/assets/images/Icon_Address.svg'} className="mt-4" />
                <p className="head">Adres</p>
                {/* <p>Postbus 9513, 9703 LM, Amsterdam</p> */}
                <p>Wilhelminaplein 1-40, 3072DE Rotterdam</p>
              </div>
              <div className="contact-card">
                <img src={'/assets/images/Icon_work_schedule.svg'} />
                <p className="head">Werkrooster</p>
                <p>Iedere werkdag van 9.00 uur tot 17.00 uur</p>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-map"></div>
        <section className="form bg-light">
          <div className="container">
            <div className="card shadow form-card">
              <h1>
                Stuur ons een{" "}
                <span id="head-span" className="mx-1">
                  {" "}
                  bericht{" "}
                </span>
              </h1>
              <p>
                Als je vragen hebt of hulp nodig hebt, vul dan het onderstaande
                formulier in. We doen ons best om zo snel mogelijk te reageren.
              </p>
              <form className="contact-form">
                <div className="d-flex">
                  <input
                    type="text"
                    className="contact-input"
                    placeholder="Naam"
                    name="name"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex">
                  <input
                    type="email"
                    name="email"
                    className="contact-input"
                    placeholder="E-mail"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex">
                  <textarea
                    type="textarea"
                    rows="5"
                    name="body"
                    className="contact-input"
                    placeholder="Bericht"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <button onClick={handleSubmit} className="submit-btn">
                    Verzenden
                  </button>
                </div>
              </form>
              <div className="mt-2">
                {messageStatus == true ? (
                  <>
                    <span>
                      {" "}
                      <i className="fa-solid text-success fa-check px-2"></i>
                      Bedankt voor uw bericht! We hebben uw bericht succesvol
                      ontvangen en zullen zo spoedig een reactie geven.
                    </span>
                  </>
                ) : (
                  <></>
                )}
                {messageStatus == false ? (
                  <>
                    <span>
                      <i className="px-2 fa-solid text-danger fa-xmark"></i>
                      Helaas is er een probleem opgetreden bij het versturen van
                      uw bericht. Controleer uw gegevens en probeer het opnieuw.
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </section>
        <section id="accordian" className="bg-light">
          <div className="container ">
            <Accordian />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contact;
