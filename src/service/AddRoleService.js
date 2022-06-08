import http from "../http-common";
class AddRoleService {
    addRealmRole(id) {
        return http.get(`/addRealmRole/id=${id}`);
    }
    login(data) {
        return http.post(`/login?username=${data.username}&password=${data.password}`);
    }
}
export default new AddRoleService();
