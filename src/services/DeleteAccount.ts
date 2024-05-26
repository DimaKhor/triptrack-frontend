import axios from "axios";

export default class DeleteAccount {
    static async delete(id: number) {
        return await axios.delete('http://localhost:8080/api/travelers/{id}', {
        })
    }
}