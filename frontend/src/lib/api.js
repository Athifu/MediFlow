const API_URL = "http://localhost:8000";

export const api = {
    async get(endpoint, token) {
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${API_URL}${endpoint}`, { headers });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async post(endpoint, body, token) {
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async put(endpoint, body, token) {
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${API_URL}${endpoint}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    }
};
