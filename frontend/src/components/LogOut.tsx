import React, { FC } from "react";
import styled from "styled-components";
import { clearUserLocalStorage } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

const LogOut: FC = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    clearUserLocalStorage("chat-app-user");
    navigate("/");
  };
  return (
    <Button onClick={onLogOutClick}>
      <BiPowerOff />
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

export default LogOut;
