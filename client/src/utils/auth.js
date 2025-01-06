import decode from 'jwt-decode';

// allows us to create a user and that person to log in 
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }
// making sure if the user is logged in or not
  logIn() {
  
    const token = this.getTok();
    return !!token && !this.isTokExpired(token); 
  }

  isTokExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // allows us to retrieve the token
  getTok() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
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
