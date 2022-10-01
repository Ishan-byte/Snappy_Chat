import React, { useEffect, useState } from "react";
import { getUserLocalStorage } from "../utils/helpers";

const Chat = () => {
  // Local states
  const [user, setUser] = useState<userLocalStorageObject>();

  // Functions
  useEffect(() => {
    const user = getUserLocalStorage();
    setUser(user);
  }, [user]);

  return (
    <div>
      {user ? (
        <img
          src={`http://localhost:5000/profileimages/${user?.avatarImage}`}
          alt="Chat App User"
        />
      ) : (
        <div>Chat App</div>
      )}
    </div>
  );
};

export default Chat;
