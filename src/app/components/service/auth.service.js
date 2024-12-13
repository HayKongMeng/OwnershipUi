export const loginService = async (user) => {
    const { username, password } = user;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rest/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        },
        {
            next: {
                tag: ["loginService"],
            },
        }
    );
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed');
    }
    const data = await res.json();
    console.log("data", data)
    return data;
};