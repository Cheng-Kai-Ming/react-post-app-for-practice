import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginForm = event.currentTarget;

    if (loginForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      email: form.email,
      password: form.password
    }
    
    axios.post('http://localhost:8000/api/auth/login/', data)
      .then(response => {
        localStorage.setItem('auth', JSON.stringify({
          access: response.data.access,
          refresh: response.data.refresh,
          user: response.data.user
        }));

        navigate('/');
      })
      .catch(error => {
        if (error.message) {
          setError('Invalid email or password');
        }
      });
  }

  return (
    <Form
      id="registration-form"
      className="border p-4 rounded"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3">
        <Form.Label>email</Form.Label>
        <Form.Control
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          type="email"
          placeholder="Enter email"
        />
        <Form.Control.Feedback type="invalid">
          Please enter a email.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          type="password"
          placeholder="Enter password"
        />
        <Form.Control.Feedback type="invalid">
          Please enter a password.
        </Form.Control.Feedback>
      </Form.Group>

      <div className="text-content text-danger">
        {error && <p>{error}</p>}
      </div>

      <Button type="submit" variant="primary" type="submit">
        Login
      </Button>
    </Form>
  )
}

export default LoginForm;
