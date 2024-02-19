import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../styles/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/global";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    //use async if await is used inside
    e.preventDefault(); //to prevent default refresh
    try {
      const response = await axios.post(`${API_URL}/signin/verify`, formData);
      console.log(response);
      if (response.data === true) {
        alert("Registeration link sent to your email id");
      } else if (response.data === false) {
        alert("user already exists");
      }
    } catch (error) {
      console.error("Error during registeration", e);
    }
  };
  return (
    <Container>
      <h1>Registeration Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </Container>
  );
};

export default SignUp;
