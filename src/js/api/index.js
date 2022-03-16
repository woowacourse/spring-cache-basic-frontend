export const request = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};
