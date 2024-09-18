import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Spinner, Alert } from "react-bootstrap";
import useAxios from "../hooks/useAxios/index.js";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const fullnameRef = useRef();

  const [success, setSuccess] = useState(false);
  const { response, error, loading, fetchData } = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;
      const full_name = fullnameRef.current.value;

      if (password === confirmPassword) {
        const obj = {
          email: email,
          password: password,
          full_name: full_name,
        };

        fetchData({
          url: "auth/signup",
          method: "POST",
          data: obj,
        });
      } else {
        alert("Password and confirm password did not match");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (response) {
      setSuccess(true);
      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
      fullnameRef.current.value = "";
      console.log("Signup successful:", response);
    }
  }, [response]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>
          <h3>Signup</h3>
          <div>
            {loading ? <Spinner animation="border" role="status" /> : ""}
            {success && <Alert variant="success">Signup Successful</Alert>}
            {error ? <Alert variant="danger">{error.message}</Alert> : ""}
          </div>
          <div>
            <Card style={{ padding: "20px", maxWidth: "500px" }}>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  ref={emailRef}
                  required
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  ref={fullnameRef}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  ref={confirmPasswordRef}
                  required
                />
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
