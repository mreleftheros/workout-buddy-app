const baseUrl = "https://flying-vigorous-cicada.glitch.me/api/auth";

export const signup_post = async (username, password) => {
  const res = await fetch(baseUrl + "/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return await res.json();
};

export const login_post = async (username, password) => {
  const res = await fetch(baseUrl + "/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return await res.json();
};
