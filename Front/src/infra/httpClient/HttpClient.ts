import axios from "axios";

type Method = "get" | "post" | "put" | "delete";

export default interface HttpClient {
	execute (method: Method, url: string, data?: any): Promise<any>
} 

export class HttpClientAxios implements HttpClient {
	public async execute (method: Method, url: string, data: any = null): Promise<any> {
		const output = await axios[method](url, data ? data : null);
		return output.data;
	}
}
