const API_BASE_URL = `http://localhost:3000/api/v1`;

export const register = async (requestRegister) => {
  const url = `${API_BASE_URL}/signup`;
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: requestRegister.username,
        password: requestRegister.password,
      }),
      credentials: "include",
    });

    const data = await resp.json();

    return { status: resp.status, data };
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
};

export const login = async (requestLogin) => {
  const url = `${API_BASE_URL}/signin`;
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: requestLogin.username,
        password: requestLogin.password,
      }),
      credentials: "include",
    });

    const data = await resp.json();

    return { status: resp.status, data };
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
};

export const logout = async () => {
  const url = `${API_BASE_URL}/signout`;
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await resp.json();

    return { status: resp.status, data };
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
};

export const user = async () => {
  const url = `${API_BASE_URL}/user`;

  try {
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (resp.status == 403) {
      return { status: resp.status, data: null };
    }

    if (!resp.ok) {
      return { status: resp.status, data: null };
    }

    const data = await resp.json();

    return { status: resp.status, data };

  } catch (error) {
    return { status: 500, data: null };
  }

};
