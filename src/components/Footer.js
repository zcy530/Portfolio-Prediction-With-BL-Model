import { Container, Row, Col } from "react-bootstrap";
import { MailchimpForm } from "./MailchimpForm";
import logo from "../assets/img/logo.svg";
import wechatfill from '../assets/img/wechat-fill.png';
import outlook from '../assets/img/outlook.png';
import github from '../assets/img/github.png';

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <MailchimpForm />
          <Col size={12} sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
                <a href="#"><img src={wechatfill} alt="" /></a>
                <a href="#"><img src={outlook} alt="" /></a>
                <a href="#"><img src={github} alt="" /></a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
