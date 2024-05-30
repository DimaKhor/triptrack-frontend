import axios from "axios";

export default class DeleteAccount {
    static async delete(id: number) {
        return await axios.delete(`http://192.168.43.242:8080/api/travelers/${id}`);
    }
}
