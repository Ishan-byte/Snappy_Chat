import React, { FC } from "react";
import styled from "styled-components";
//interfaces
import { ChatContainerComponentProps } from "../utils/interface";

//Components
import LogOut from "./LogOut";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

const ChatContainer: FC<ChatContainerComponentProps> = ({ contact }) => {
  const handleSendMsg = (msg: string) => {
    console.log(msg);
  };

  return (
    <>
      {contact && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`http://localhost:5000/profileimages/${contact.avatarImage}`}
                  alt=""
                />
              </div>
              <div className="username">
                <h3>{contact.username}</h3>
              </div>
            </div>
            <LogOut />
          </div>
          <Messages />
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  padding-top: 1rem;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
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
  }
`;
export default ChatContainer;
