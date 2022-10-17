// checks user data is available in the web browser's localStorage or not
export function userChecklocalStorage() {
  if (localStorage.getItem("chat-app-user")) {
    return true;
  } else {
    return false;
  }
}

// retrieves user data from the local storage
export const getUserLocalStorage = async () => {
  var userData = await JSON.parse(localStorage.getItem("chat-app-user")!);
  return userData;
};

export const setUserLocalStorage = (key: string, body: Object) => {
  localStorage.setItem(key, JSON.stringify(body));
};

export const clearUserLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
