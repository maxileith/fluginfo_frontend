import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({});

instance
    .get("/backendBaseUrl.txt")
    .then((response) => {
        instance.defaults.baseURL = response.data;
    })
    .catch(() => {
        toast.error("Failed to determine backend base URL.");
        instance.defaults.baseURL = "http://localhost:8000";
    });

export default instance;
