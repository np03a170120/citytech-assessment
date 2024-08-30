const TOKEN_KEY = "access_token";
const NAME_KEY = "user_name";

function getStoredUser() {
  const token = localStorage.getItem(TOKEN_KEY);
  const username = localStorage.getItem(NAME_KEY);
  return token && username ? { token, username } : null;
}

function setStoredUser(token: string | null, username: string | null) {
  if (token && username) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(NAME_KEY, username);
  } else {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(NAME_KEY);
  }
}

export { getStoredUser, setStoredUser };
