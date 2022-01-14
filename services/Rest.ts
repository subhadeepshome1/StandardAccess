import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export default class RestService {
    client: AxiosInstance;
    constructor(config: AxiosRequestConfig) {
        this.client = axios.create(config);
    }

    async getWithAccess(endpoint: string) {
        // console.log("API:", endpoint);
        let accessToken;
        await AsyncStorage.getItem('userData').then((data:any) => {
            var parsedData = JSON.parse(data);
            accessToken = parsedData.access_token
        });
        return this.client.get<any>(endpoint, { headers: { "Authorization": `Bearer ${accessToken}` } });
    }

    get(endpoint:string) {
        return this.client.get<any>(endpoint);
    }

    post(endpoint:string, payload:any ) {
        // console.log("API:", endpoint);
        return this.client.post<any>(endpoint, payload);
    }

    async postWithAccess(endpoint: string, payload: any) {
        // console.log("API:", endpoint);
        let accessToken;
        await AsyncStorage.getItem('userData').then((data:any) => {
            var parsedData = JSON.parse(data);
            accessToken = parsedData.access_token;
        });
        return this.client.post<any>(endpoint, payload, { headers: { "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json" } });
    }
}