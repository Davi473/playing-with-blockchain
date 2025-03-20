import axios from "axios";

export default interface HttpClient {
	execute (method: string, url: string, data?: any): Promise<any>
} 

export class HttpClientAxios implements HttpClient {
	public async execute (method: string, url: string, data: any = null): Promise<any> {
		const output = await axios[method](url, data ? data : null);
		return output.data;
	}
}
