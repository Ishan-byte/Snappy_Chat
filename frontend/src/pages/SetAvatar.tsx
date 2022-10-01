import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/constants";
import axios from "axios";
import { getAvatarRoute, setAvatarRoute } from "../routes/routes";

// Images
import Loader from "./../assets/loader.gif";
import {
  getUserLocalStorage,
  setUserLocalStorage,
  userChecklocalStorage,
} from "../utils/helpers";

// Main Component
const SetAvatar: FC = () => {
  //Local constants
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [avatars, setAvatars] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string>();

  const navigate = useNavigate();

  //Functions
  const setProfilePicture = async () => {
    if (!selectedAvatar) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = getUserLocalStorage();
      console.log(user);
      const { data } = await axios.post(
        `${setAvatarRoute.toString()}/${user!._id}`,
        {
          image: selectedAvatar,
        }
      );

      if (data.status === "pass") {
        setUserLocalStorage("chat-app-user", data.updateduser);
        navigate("/");
      } else if (data.status === "fail") {
        toast.error(data.message, toastOptions);
      }
    }
  };

  // Hook for loading the avatar images
  useEffect(() => {
    const Imageloader = async () => {
      const { data } = await axios.get(getAvatarRoute.toString());
      const names = data.avatarNames;

      setAvatars(names);
      setisLoading(false);
    };

    Imageloader();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={Loader} alt="Loading Page" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === avatar ? "selected" : ""
                  }`}
                >
                  <img
                    src={`http://localhost:5000/profileimages/${avatar}`}
                    alt="Avatar"
                    onClick={() => {
                      setSelectedAvatar(avatar);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Profile picture
          </button>
        </Container>
      )}
    </>
  );
};

// Styles
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.4rem;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    transition: 0.4s ease-in-out;
    &:hover {
      background-color: #4e0aff;
    }
  }
`;
export default SetAvatar;
