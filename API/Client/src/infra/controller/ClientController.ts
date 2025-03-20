import HttpServer from "../httpServer/httpServer";

export default class ClientController {
    constructor (
        readonly api: HttpServer,
    ) {
        this.api.register("post", "/asset", async (params: any, body: any) => {
            //const input = body;
            //const output = await this.postAsset.execute(input);
            //return output;
        });

        this.api.register("get", "/blocks", async (params: any, body: any) => {
            //const output = await this.getBlocks.execute();
            //return output;
        });

        this.api.register("get", "/asset", async (params: any, body: any) => {
            //this.getAsset.execute();
        });
    }
}
