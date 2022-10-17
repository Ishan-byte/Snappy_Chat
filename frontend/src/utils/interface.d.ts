import { Dispatch, FunctionComponent, SetStateAction } from "react";
// Props

// Components
export interface ContactComponentProps {
  contacts: userLocalStorageObject[];
  currentUser: userLocalStorageObject | undefined;
  setCurrentContact: Dispatch<
    SetStateAction<userLocalStorageObject | undefined>
  >;
}

export interface WelcomeComponentProps {
  user: userLocalStorageObject | undefined;
}

export interface ChatContainerComponentProps {
  contact: userLocalStorageObject | undefined;
}

export interface ChatInputComponentProps {
  handleSendMsg: (msg: string) => void;
}

// Pages
export interface RegisterInputValues {
  username: string;
  email: string;
  password: string;
  repassword: string;
}

export interface LoginInputValues {
  username: string;
  password: string;
}

// Others
export interface userLocalStorageObject {
  avatarImage: string;
  email: string;
  isAvatarImageSet: boolean;
  password: string;
  username: string;
  _v: number;
  _id: string;
}
