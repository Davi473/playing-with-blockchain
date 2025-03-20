import BlockchainService from "../../infra/service/BlockchainService";
import UseCase from "./UseCase";

export default class GetAsset implements UseCase {
    constructor (readonly service: BlockchainService) {}

    public async execute(): Promise<any> {
        const blocks = await this.service.get();
        return blocks;
    }
}