import EventEmitter from "events";

class ApiRequest extends EventEmitter {
  private token: string = "";

  public setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  public getToken() {
    return this.token;
  }

  public getAuthHeader() {
    return {
      Authorization: `Bearer ${this.getToken()}`,
    };
  }
}

const apiRequest = new ApiRequest();
export default apiRequest;
