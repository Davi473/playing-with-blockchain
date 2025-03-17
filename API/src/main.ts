import GetBlocks from './application/usecase/GetBlocks';
import PostMessage from './application/usecase/PostMessage';
import Blockchain from './domain/blockchain/Blockchain';
import BlockChainController from './infra/controller/BlockChainController';
import { AdaptorExpress } from './infra/httpServer/httpServer';


const api = new AdaptorExpress();

const blockchain = new Blockchain();

const getBlocks = new GetBlocks(blockchain);
const postMessage = new PostMessage(blockchain);

new BlockChainController(api, postMessage, getBlocks);

api.listen(3000);