import GetAsset from './application/usecase/GetAsset';
import GetBlocks from './application/usecase/GetBlocks';
import PostAsset from './application/usecase/PostAsset';
import Blockchain from './domain/blockchain/Blockchain';
import BlockChainController from './infra/controller/BlockChainController';
import { AdaptorExpress } from './infra/httpServer/httpServer';


const api = new AdaptorExpress();

const blockchain = new Blockchain();

const getBlocks = new GetBlocks(blockchain);
const postAsset = new PostAsset(blockchain);
const getAsset = new GetAsset(blockchain);

new BlockChainController(api, postAsset, getBlocks, getAsset);

api.listen(3000);