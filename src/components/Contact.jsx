import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const form = useRef();
  const [messageSent, setMessageSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_3t8q7tz",
        "template_dnv12rf",
        form.current,
        "q1dtApKgcJqkTNoN5"
      )
      .then(
        (result) => {
          console.log(result.text);
          setMessageSent(true);
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
          alert("Error al enviar el mensaje, intenta nuevamente.");
        }
      );
  };

  return (
    <section className="contact">
      <h2>Contacto</h2>

      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <input type="text" name="user_name" placeholder="Tu nombre" required />
        <input type="email" name="user_email" placeholder="Tu email" required />
        <textarea name="message" rows="5" placeholder="Tu mensaje" required />
        <button type="submit">Enviar</button>
      </form>

      {messageSent && <p className="success-message">Mensaje enviado con éxito!</p>}

       {/* Contact info */}
      <div className="contact-info">
        <p>Email: <a href="mailto:tu-email@example.com">franggiromina@gmail.com</a></p>
        <p>
          LinkedIn:{" "}
          <a href="https://www.linkedin.com/in/rominafranggi" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/rominafranggi
          </a>
        </p>
      </div>
    </section>
  );
};

export default Contact;
