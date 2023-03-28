const baseUrl = "https://flying-vigorous-cicada.glitch.me/api/workouts";

export const index_get = async auth => {
  try {
    const res = await fetch(baseUrl, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const index_post = async (token, body) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};

export const idParam_delete = async (token, id) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) return true;
  return false;
};

export const idParam_toggle = async (token, id, done) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ done }),
  });
  if (res.ok) return true;
  return false;
};

export const idParam_patch = async (token, id, body) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};
