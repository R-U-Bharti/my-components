
export const baseUrl = import.meta.env.VITE_API_URL;

export const ApiHeader = () => {
    let token = window.sessionStorage.getItem("token");
    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            'Content-Type': "application/json",
        },
    };
    return header;
}

export const ApiHeader2 = () => {
    let token = window.sessionStorage.getItem("token");
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "multipart/form-data",
        },
    };
    return header;
}