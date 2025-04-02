import HttpClient from "../httpClient/HttpClient";

export default class BlockchainService {
	constructor (readonly httpClient: HttpClient) {}

	public async post (asset: any, stringSing: any): Promise<any> {
		try {
			const output = await this.httpClient
				.execute("post", "http://localhost:3000/asset",
				{ asset, stringSing });
			return output;
		} catch (e: any) {
			throw new Error("Server is not available");
		}
	}

	public async get (): Promise<any> {
		try {
			const output = await this.httpClient
				.execute("get", "http://localhost:3000/blocks");
			return output;
		} catch (e: any) {
			throw new Error("Server is not available");
		}
	}
}
