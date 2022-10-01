// checks user data is available in the web browser's localStorage or not
export function userChecklocalStorage() {
  if (!localStorage.getItem("chat-app-user")) {
    return false;
  }
  return true;
}

// retrieves user data from the local storage
export const getUserLocalStorage = () => {
  var userData = JSON.parse(localStorage.getItem("chat-app-user")!);
  return userData;
};

export const setUserLocalStorage = (key: string, body: Object) => {
  localStorage.setItem(key, JSON.stringify(body));
};
