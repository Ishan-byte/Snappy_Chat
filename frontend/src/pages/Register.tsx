import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { expression, toastOptions } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//routes
import { registerRoute } from "../routes/routes";

// Logo
import Logo from "./../assets/logo.svg";

// Interfaces
import { RegisterInputValues } from "../utils/interface";

// Register Component
const Register: FC = () => {
  // Constants
  const navigate = useNavigate();

  // States
  const [values, setValues] = useState<RegisterInputValues>({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  // Functions
  // on submitting the form
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (handleValidation()) {
      // const body = values;

      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute.toString(), {
        username,
        email,
        password,
      });

      // In case the api call fails
      if (data.status === "fail") {
        toast.error(data.message, toastOptions);
      }

      if (data.status === "pass") {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/setavatar");
      }
    }
  };

  // on a specific value change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // for validating input values
  const handleValidation = (): boolean => {
    const { username, email, password, repassword }: RegisterInputValues =
      values;

    // Blank check
    if (!username || !email || !password || !repassword) {
      toast.error("Please fill all the required information", toastOptions);
      return false;
    }
    // Short Username
    else if (username.length < 3) {
      toast.error("Username must be greater than 3 letters", toastOptions);
      return false;
    }
    // Short Password
    else if (password.length < 8) {
      toast.error(
        "Password length must be greater than 8 letters",
        toastOptions
      );
      return false;
    }
    // Invalid email
    else if (!expression.test(email)) {
      toast.error("Invalid Email", toastOptions);
      return false;
    }
    // Validate Password and Re-Password
    else if (password !== repassword) {
      toast.error("Invalid password", toastOptions);
      return false;
    }

    return true;
  };

  // Main
  return (
    <>
      <FormContainer>
        <form
          noValidate
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="brand">
            <img src={Logo} alt="Logo of the Application" />
            <h1>Snappy</h1>
          </div>

          {/* UserName */}
          <input
            type="text"
            placeholder="User Name"
            name="username"
            onChange={(event) => {
              handleChange(event);
            }}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(event) => {
              handleChange(event);
            }}
          />

          {/* UserName */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => {
              handleChange(event);
            }}
          />

          {/* Re-enter Password */}
          <input
            type="password"
            placeholder="Re-enter Password"
            name="repassword"
            onChange={(event) => {
              handleChange(event);
            }}
          />
          {/* Submit Button */}
          <button type="submit">Submit</button>
          <span>
            Already have an account ? <Link to="/login"> Login</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
};

// STYLES
const FormContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
  gap: 1;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 3rem 5rem;
    background-color: #00000076;
    border-radius: 2rem;

    input {
      padding: 1rem;
      background-color: transparent;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 0.4rem;
      font-size: 1rem;
      font-weight: bold;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0aff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        text-decoration: none;
        color: #4e0eff;
        font-weight: bold;
      }
    }
  }
`;

export default Register;
