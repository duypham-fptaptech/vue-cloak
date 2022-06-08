import axios from "axios";
export default axios.create({
    baseURL: "http://localhost:8080/api/v1/users",
    headers: {
        "Content-type": "application/json"
    }
});
