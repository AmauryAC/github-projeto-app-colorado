import { HttpResultModel } from './../models/httpResultModel';
import { HttpProvider } from './../../providers/http/http';

export abstract class ProviderBase<T> {
    constructor(public url: string, public http: HttpProvider) {
        
    }

    public get(): Promise<HttpResultModel> {
        return this.http.get(this.url);
    }

    public getById(id: string): Promise<HttpResultModel> {
        return this.http.get(`${this.url}/${id}`);
    }

    public post(model: T): Promise<HttpResultModel> {
        return this.http.post(this.url, model);
    }

    public put(id: string, model: T): Promise<HttpResultModel> {
        return this.http.put(`${this.url}/${id}`, model);
    }

    public delete(id: string): Promise<HttpResultModel> {
        return this.http.delete(`${this.url}/${id}`);
    }
}