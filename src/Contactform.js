import React, { useState } from "react";
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
        "service_l2l953j", // Replace with EmailJS Service ID
        "template_k41pttm", // Replace with EmailJS Template ID
        {
          from_name: contactData.name,
          from_email: contactData.email,
          subject: contactData.subject,
          message: contactData.message,
        },
        "YiBfcSbUYWx3QqVjK" // Replace with EmailJS Public Key
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
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Your Name" value={contactData.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Your Email" value={contactData.email} onChange={handleChange} required />
      <input type="text" name="subject" placeholder="Subject" value={contactData.subject} onChange={handleChange} required />
      <textarea name="message" placeholder="Your Message" value={contactData.message} onChange={handleChange} required rows="5"></textarea>
      
      {submitStatus === "success" && <div style={{ color: "green" }}>Message sent successfully!</div>}
      {submitStatus === "error" && <div style={{ color: "red" }}>There was an error sending your message.</div>}

      <button type="submit">Send Message</button>
    </form>
  );
};

export default ContactForm;
