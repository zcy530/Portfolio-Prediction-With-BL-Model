import { useState, useEffect } from "react";
import { Col, Row, Alert } from "react-bootstrap";
import bl1 from "../assets/img/blm1.png";

export const Newsletter = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (status === 'success') clearFields();
  }, [status])

  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
    email.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email
    })
  }

  const clearFields = () => {
    setEmail('');
  }

  return (
    <div></div>
      // <Col lg={12}>
      //   <div className="newsletter-bx">

      //   </div>
      // </Col>
  )
}
