import React, { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_l2l953j",
        "template_k41pttm",
        {
          from_name: contactData.name,
          from_email: contactData.email,
          subject: contactData.subject,
          message: contactData.message,
        },
        "YiBfcSbUYWx3QqVjK"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setSubmitStatus("success");
          setContactData({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          console.log("FAILED...", error);
          setSubmitStatus("error");
        }
      );
  };

  return (
    <div className="projects-page">
      <div className="cosmic-bg" aria-hidden>
        <div className="cosmic-bg__bloom cosmic-bg__bloom--3" />
        <div className="cosmic-bg__grid" />
      </div>
      <header className="page-header">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/" className="logo" style={{ textDecoration: "none" }}>
            Contact
          </Link>
          <Link to="/" className="btn btn--ghost">
            Back to Home
          </Link>
        </div>
      </header>
      <div className="contact-page" style={{ position: "relative", zIndex: 1 }}>
        <div className="contact-page__panel">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={contactData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={contactData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={contactData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={contactData.message}
              onChange={handleChange}
              required
              rows="5"
            />

            {submitStatus === "success" && <div className="alert alert--success">Message sent successfully!</div>}
            {submitStatus === "error" && (
              <div className="alert alert--error">There was an error sending your message.</div>
            )}

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
