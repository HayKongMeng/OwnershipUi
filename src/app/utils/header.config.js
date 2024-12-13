export const reqHeader = (token) => {
    const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
    return header;
};
