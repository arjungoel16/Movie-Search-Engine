import { jwtDecode as decode } from "jwt-decode";

// allows us to create a user and that person to log in
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken()|| "");
  }
// making sure if the user is logged in or not
  logIn() {

    const token = this.getToken();
    return !!token && !this.isTokExpired(token);
  }

  isTokExpired(token: string) {
    try {
      const decoded = decode(token);
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // allows us to retrieve the token
  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken: string) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
