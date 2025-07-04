const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token;
  } catch (err) {
    console.error("❌ Failed to parse user token from localStorage", err);
    return null;
  }
};

const getAuthHeaders = () => {
  const token = getToken();
  return token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : {
        "Content-Type": "application/json",
      };
};

const handleResponse = async (res) => {
  const data = await res.json().catch(() => null);
  return {
    status: res.status,
    ok: res.ok,
    data,
  };
};

const api = {
  get: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  post: async (endpoint, data, isFormData = false) => {
    const headers = isFormData ? {} : getAuthHeaders();
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: isFormData ? data : JSON.stringify(data),
    });

    const resData = await res.json().catch(() => null);
    return { status: res.status, data: resData };
  },

  put: async (endpoint, body) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  delete: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
};

export default api;
