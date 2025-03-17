import GetBlocks from "../../application/usecase/GetBlocks";
import PostMessage from "../../application/usecase/PostMessage";
import HttpServer from "../httpServer/httpServer";

export default class BlockChainController {
    constructor (
        readonly api: HttpServer,
        readonly postMessage: PostMessage,
        readonly getBlocks: GetBlocks
    ) {
        this.api.register("post", "/stocks", async (params: any, body: any) => {
            const input = body;
            const output = await this.postMessage.execute(input);
            return output;
        });

        this.api.register("get", "/blocks", async (params: any, body: any) => {
            const input = body;
            const output = await this.getBlocks.execute();
            return output;
        });
    }
}
