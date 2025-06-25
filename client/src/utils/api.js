const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("🌐 API Base URL:", BASE_URL);

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
      headers: {
        "Content-Type": "application/json",
      },
    });
    return handleResponse(res);
  },

  post: async (endpoint, data, isFormData = false) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: isFormData ? undefined : { "Content-Type": "application/json" },
      body: isFormData ? data : JSON.stringify(data),
    });

    const resData = await res.json();
    return { status: res.status, data: resData };
  },
  put: async (endpoint, body) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  delete: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return handleResponse(res);
  },
};

export default api;
