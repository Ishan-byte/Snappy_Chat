// Necessary Imports
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Contact from "../components/Contact";
import Welcome from "../components/Welcome";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Interfaces
import { userLocalStorageObject } from "../utils/interface";

// External Functions
import { getUserLocalStorage, userChecklocalStorage } from "../utils/helpers";
import { getAllUsersRoute } from "../routes/routes";
import ChatContainer from "../components/ChatContainer";

// Main
const Chat: FC = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<userLocalStorageObject[]>([]);
  const [currentUser, setCurrentUser] = useState<
    userLocalStorageObject | undefined
  >();
  const [currentContact, setCurrentContact] = useState<
    userLocalStorageObject | undefined
  >();

  useEffect(() => {
    async function test() {
      if (userChecklocalStorage()) {
        const user = await getUserLocalStorage();
        setCurrentUser(user);
      } else {
        navigate("/login");
      }
    }
    test();
  }, []);

  useEffect(() => {
    getUsers();
  }, [currentUser]);


  // Functions
  const getUsers = async () => {
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
        <Contact
          contacts={contacts}
          currentUser={currentUser}
          setCurrentContact={setCurrentContact}
        />
        {currentContact === undefined ? (
          <Welcome user={currentUser} />
        ) : (
          <ChatContainer contact={currentContact} />
        )}
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
