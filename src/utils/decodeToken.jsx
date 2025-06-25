export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId || payload.id;
  } catch (err) {
    console.error("Failed to decode token", err);
    return null;
  }
};
