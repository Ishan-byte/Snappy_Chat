interface RegisterInputValues {
  username: string;
  email: string;
  password: string;
  repassword: string;
}

interface LoginInputValues{
  username: string;
  password: string;
}

interface userLocalStorageObject{
  avatarImage: string,
  email: string,
  isAvatarImageSet: boolean,
  password: string,
  username: string,
  _v: number,
  _id: string,
}

