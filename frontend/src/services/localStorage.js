export const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (e) {
    console.log(e);
  }
};

export const getItem = (key) => {
  try {
    let item = localStorage.getItem(key);
    if (item === null) {
      return undefined;
    }
    return JSON.parse(item);
  } catch (e) {
    console.log(e);
  }
};
