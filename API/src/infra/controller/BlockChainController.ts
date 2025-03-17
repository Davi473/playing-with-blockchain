import GetBlocks from "../../application/usecase/GetBlocks";
import PostAsset from "../../application/usecase/PostAsset";
import HttpServer from "../httpServer/httpServer";

export default class BlockChainController {
    constructor (
        readonly api: HttpServer,
        readonly postAsset: PostAsset,
        readonly getBlocks: GetBlocks
    ) {
        this.api.register("post", "/asset", async (params: any, body: any) => {
            const input = body;
            const output = await this.postAsset.execute(input);
            return output;
        });

        this.api.register("get", "/blocks", async (params: any, body: any) => {
            const output = await this.getBlocks.execute();
            return output;
        });
    }
}
