import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const BASE_URL =
  "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros";

const USER_ID = "01171997";

export interface HttpManager {
  get(url: string): Promise<any>;
  post(url: string, body: object): Promise<any>;
  put(url: string, body: object): Promise<any>;
  delete(url: string): Promise<any>;
}

export class AxiosHttpManager implements HttpManager {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: BASE_URL,
      headers: { authorId: USER_ID },
    });

    this.http.interceptors.response.use(this._handleSuccess, this._handleError);
  }

  async get(url: string): Promise<AxiosResponse> {
    const response = await this.http.get(url);
    return response.data;
  }

  async post(url: string, body: object): Promise<AxiosResponse> {
    const response = await this.http.post(url, body);
    return response.data;
  }

  async put(url: string, body: object): Promise<AxiosResponse> {
    const response = await this.http.put(url, body);
    return response.data;
  }

  async delete(url: string): Promise<AxiosResponse> {
    const response = await this.http.delete(url);
    return response.data;
  }

  private _handleError = (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {
      console.log("Error: ", error.response);
    } else {
      console.log("Error desconocido:");
    }

    return Promise.reject(error);
  };

  private _handleSuccess = (response: AxiosResponse): AxiosResponse => {
    return response;
  };
}
