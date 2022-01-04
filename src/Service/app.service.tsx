import axios, {AxiosResponse } from 'axios';

const instance = axios.create({
    baseURL: 'https://challenge.capintel.com/v1/stocks/',
    timeout: 15000
});

export class AppService{
    public async getSelectedStockInfo(ticker:string): Promise<any>{
        const response = await instance.get(`${ticker}`);
        return response.data
    }
}
