import BaseManager from "./BaseManager";

class RecoverPasswordManager extends BaseManager {
    constructor() {
        super("/mail")

        if (RecoverPasswordManager.instance)
            return RecoverPasswordManager.instance;
        else RecoverPasswordManager.instance = this;
    }
    async sendMail(mail) {
        if (!mail) return null;
        if (typeof (mail) !== "string") return null;
        const res = await this.fetchData({ email: mail });
        if (!res) return;
        if (res.success && res.data)
            return res.data;
    }
}

const recoverPasswordManager = new RecoverPasswordManager();
export default recoverPasswordManager;