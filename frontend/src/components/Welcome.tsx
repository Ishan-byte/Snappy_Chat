import React, { FC } from "react";
import styled from "styled-components";
import Robot from "./../assets/robot.gif";
//interfaces
import { WelcomeComponentProps } from "../utils/interface";

const Welcome: FC<WelcomeComponentProps> = ({ user }) => {
  return (
    <Container>
      <img src={Robot} />
      <h1>
        Welcome, <span>{user?.username} !</span>
      </h1>
      <h3> Please Select a chat to start Messaging</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
`;
export default Welcome;
