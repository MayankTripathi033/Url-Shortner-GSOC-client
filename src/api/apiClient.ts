import axios, { AxiosInstance } from "axios";

class ApiClient {
  private axiosInstance: AxiosInstance;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add an interceptor to include the Authorization header if a token is set
    this.axiosInstance.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });
  }

  // Set the token for future requests
  public setToken(token: string) {
    this.token = token;
  }

  // Sign in method
  public async signIn(email: string, password: string): Promise<any> {
    try {
      const response = await this.axiosInstance.post("/auth/signin", {
        email,
        password,
      });
      this.setToken(response.data.user.token); // Assuming the token is in response.data.user.token
      return response.data;
    } catch (error: any) {
      console.error("Sign-in failed:", error.response?.data || error.message);
      throw error;
    }
  }

  // Sign out method
  public async signOut(): Promise<void> {
    try {
      await this.axiosInstance.post("/auth/signout");
      this.token = null; // Clear the token on sign-out
    } catch (error: any) {
      console.error("Sign-out failed:", error.response?.data || error.message);
      throw error;
    }
  }

  // Shorten URL method
  public async shortenUrl(originalUrl: string): Promise<any> {
    try {
      if (!this.token) {
        this.token = JSON.parse(
          localStorage.getItem("credentials") || ""
        ).token;
      }
      const response = await this.axiosInstance.post("/url/shorten", {
        originalUrl,
      });
      console.log("response", response);

      return response.data; // Assuming the shortened URL is in response.data
    } catch (error: any) {
      console.error(
        "URL shortening failed:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}

export default new ApiClient(
  process.env.REACT_APP_API_URL || "http://localhost:3000"
);
