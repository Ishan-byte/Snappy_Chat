import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "./../assets/logo.svg";

//Interfaces
import {
  ContactComponentProps,
  userLocalStorageObject,
} from "../utils/interface";

// Main Component
const Contact: FC<ContactComponentProps> = ({
  contacts,
  currentUser,
  setCurrentContact,
}) => {
  // Local States
  const [user, setUser] = useState<userLocalStorageObject | undefined>();
  const [currentUserName, setCurrentUserName] = useState<string>();
  const [currentUserImage, setCurrentUserImage] = useState<string>();
  const [currentSelected, setCurrentSelected] = useState<number>();

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  // Functions
  useEffect(() => {
    if (user) {
      setCurrentUserName(user.username);
      setCurrentUserImage(user.avatarImage);
    }
  }, [user]);

  const changeCurrentChat = (
    contact: userLocalStorageObject,
    index: number
  ) => {
    setCurrentSelected(index);
    setCurrentContact(contact);
  };

  // Main
  return (
    <>
      {currentUserName && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="Logo of our application" />
            <h3>Snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    currentSelected === index ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    changeCurrentChat(contact, index);
                  }}
                >
                  <div className="avatar">
                    <img
                      src={`http://localhost:5000/profileimages/${contact.avatarImage}`}
                    />
                  </div>

                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`http://localhost:5000/profileimages/${currentUserImage}`}
              />
            </div>

            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

// Stylesheets
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;

      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }

    .selected {
      background-color: #9186f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contact;
