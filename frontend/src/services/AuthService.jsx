const API_BASE_URL = `http://localhost:3000/api/v1`;

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