
const validateUsername = (username) => {
  if (typeof username !== "string") {
    return false;
  }
  const length = username.length;
  return length >= 3 && length <= 20;
};

const validatePassword = (password) => {
  if (typeof password !== "string") {
    return false;
  }
  const length = password.length;
  return length >= 8 && length <= 15;
};

export { validateUsername, validatePassword };
