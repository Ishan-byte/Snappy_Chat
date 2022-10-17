import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/constants";
import axios from "axios";

// Hooks
import { useNavigate } from "react-router-dom";
import { userChecklocalStorage } from "../utils/helpers";

//routes
import { loginRoute } from "../routes/routes";

// Logo
import Logo from "./../assets/logo.svg";

// interfaces
import { LoginInputValues } from "../utils/interface";

// Register Component
const Login: FC = () => {
  // Constants
  const navigate = useNavigate();

  // hook for redirecting user to the main page
  // if he/she has already logged in before in the browser
  useEffect(() => {
    if (userChecklocalStorage()) {
      navigate("/");
    }
  }, []);

  // States
  const [values, setValues] = useState<LoginInputValues>({
    username: "",
    password: "",
  });

  // Functions

  // on submitting the form
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute.toString(), {
        username,
        password,
      });

      // In case the api call fails
      if (data.status === "fail") {
        toast.error(data.message, toastOptions);
      }

      if (data.status === "pass") {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
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
    const { username, password }: LoginInputValues = values;

    // Blank check
    if (!username || !password) {
      toast.error("Please fill all the required information", toastOptions);
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

          {/* Email */}
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(event) => {
              handleChange(event);
            }}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => {
              handleChange(event);
            }}
          />
          {/* Submit Button */}
          <button type="submit">Login</button>
          <span>
            Don't have an account yet? <Link to="/register">Sign up</Link>
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

export default Login;
