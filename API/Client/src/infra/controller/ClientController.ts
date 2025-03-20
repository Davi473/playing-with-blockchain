import GetAsset from "../../application/usecase/getAsset";
import HttpServer from "../httpServer/httpServer";

export default class ClientController {
    constructor (
        readonly api: HttpServer,
        readonly getAsset: GetAsset
    ) {
        this.api.register("get", "/asset", async (params: any, body: any) => {
            const output = await this.getAsset.execute();
            return output;
        });

        this.api.register("get", "/blocks", async (params: any, body: any) => {
            //const output = await this.getBlocks.execute();
            //return output;
        });

        this.api.register("post", "/asset", async (params: any, body: any) => {
            //this.getAsset.execute();
        });
    }
}
