// Necessary Imports
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Contact from "../components/Contact";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// External Functions
import { getUserLocalStorage, userChecklocalStorage } from "../utils/helpers";
import { getAllUsersRoute } from "../routes/routes";

// Main
const Chat: FC = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<userLocalStorageObject[]>([]);
  const [currentUser, setCurrentUser] = useState<userLocalStorageObject | undefined>();

  useEffect(() => {
    if (!userChecklocalStorage) {
      navigate("/");
    } else {
      setCurrentUser(getUserLocalStorage);
    }
  }, []);

  useEffect(() => {
    setuser();
  }, [currentUser]);

  // Functions
  const setuser = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const { data } = await axios.get(
          `${getAllUsersRoute.toString()}/${currentUser._id}`
        );
        setContacts(data.users);
      } else {
        navigate("/setavatar");
      }
    }
  };

  return (
    <Container>
      <div className="container">
        <Contact contacts={contacts} currentUser={currentUser} />
      </div>
    </Container>
  );
};

// Stylesheet
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100vw;
  height: 100vh;
  background-color: var(--primary-color);

  .container {
    display: grid;
    grid-template-columns: 25% 75%;
    width: 85vw;
    height: 85vh;
    background-color: #00000076;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
