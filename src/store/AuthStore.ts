import { makeAutoObservable } from "mobx";

class AuthStore {
    isAuthenticated = false;
    userKey: string | null = null;

    constructor() {
        makeAutoObservable(this);
        this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        this.userKey = localStorage.getItem('userKey');
    }

    login(userKey: string) {
        this.isAuthenticated = true;
        this.userKey = userKey;
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userKey', userKey);
    }

    logout() {
        this.isAuthenticated = false;
        this.userKey = null;
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userKey');
    }

    deleteAccount() {
        this.logout();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    setTokens(accessToken: string, refreshToken: string) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }
}

export const authStore = new AuthStore();
