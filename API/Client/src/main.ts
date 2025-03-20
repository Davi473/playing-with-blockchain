import { AdaptorExpress } from './infra/httpServer/httpServer';
import { HttpClientAxios } from "./infra/httpClient/HttpClient";
import ClientController from "./infra/controller/ClientController";
import BlockchainService from "./infra/service/BlockchainService";
import GetAsset from './application/usecase/getAsset';

const api = new AdaptorExpress();

const httpClient = new HttpClientAxios();

const blockchainService = new BlockchainService(httpClient);

//const postAsset = new PostAsset(blockchain);
const getAsset = new GetAsset(blockchainService);

new ClientController(api, getAsset);

api.listen(3002);
