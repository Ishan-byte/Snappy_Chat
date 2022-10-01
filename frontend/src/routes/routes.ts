// Routes

// Host
const host: string = "http://localhost:5000";

// Avatar Images
export const avatarAPI: URL = new URL("https://api.multiavatar.com/45678945");

// Register
export const registerRoute: URL = new URL(`${host}/api/auth/register`);

// login
export const loginRoute: URL = new URL(`${host}/api/auth/login`);

// SetAvatar
export const setAvatarRoute: URL = new URL(`${host}/api/auth/setavatar`);

// GetAvatar
export const getAvatarRoute: URL = new URL(`${host}/api/auth/getrandomavatars`);
