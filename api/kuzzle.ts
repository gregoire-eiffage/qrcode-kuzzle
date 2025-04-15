import { Kuzzle, Http } from "kuzzle-sdk";

export class KuzzleApi {
  private kuzzle: Kuzzle | undefined;
  private isLocal: boolean | undefined;
  private host: string | undefined;
  private port: number | undefined;
  private ssl: boolean | undefined;

  constructor() {
    const config = useRuntimeConfig();
    console.log(config.public.kuzzleHost);
    console.log(config.public.kuzzlePort);
    console.log(config.public.kuzzleLocal);
    console.log(config.public.kuzzleSSL);

    this.isLocal = config.public.kuzzleLocal === "true";
    this.host = config.public.kuzzleHost;
    this.port = Number(config.public.kuzzlePort);
    this.ssl = config.public.kuzzleSSL === "true";

    console.log("Initializing KuzzleApi...");
    this.init();
  }

  init() {
    let options;
    const host = this.host || "localhost";

    if (!this.isLocal) {
      options = {
        port: Number(this.port),
        ssl: this.ssl,
      };
    }

    this.kuzzle = new Kuzzle(new Http(host, options));
    console.log("Kuzzle initialized:", this.kuzzle);
  }

  async connect() {
    if (!this.kuzzle) {
      throw new Error("Kuzzle is not initialized");
    }

    try {
      await this.kuzzle.connect();
      console.log("Connected to Kuzzle");
    } catch (error) {
      console.error("Connection error:", error);
      throw error;
    }
  }
  async disconnect() {
    if (!this.kuzzle) {
      throw new Error("Kuzzle is not initialized");
    }
    try {
      await this.kuzzle.disconnect();
      console.log("Disconnected from Kuzzle");
    } catch (error) {
      console.error("Disconnection error:", error);
      throw error;
    }
  }
  async getCurrentUser() {
    if (!this.kuzzle) {
      throw new Error("Kuzzle is not initialized");
    }
    try {
      const user = await this.kuzzle.auth.getCurrentUser();
      console.log("Current user:", user);
      return user;
    } catch (error) {
      console.error("Error getting current user:", error);
      throw error;
    }
  }

  async login(username: string, password: string) {
    if (!this.kuzzle) {
      throw new Error("Kuzzle is not initialized");
    }

    try {
      const response = await this.kuzzle.auth.login("local", {
        username,
        password,
      });
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
}
