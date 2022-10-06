import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";

// Main Component
const Contact: FC<ContactComponentProps> = ({ contacts, currentUser }) => {
  const [activeUser, setActiveUser] = useState<userLocalStorageObject>();

  useEffect(() => {
    setActiveUser(currentUser);
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div>
      <h1 color="white">Hellp</h1>
    </div>
  );
};

// Stylesheets
const Container = styled.div``;

export default Contact;
