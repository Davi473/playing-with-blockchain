import { AdaptorExpress } from './infra/httpServer/httpServer';
import { HttpClientAxios } from "./infra/httpClient/HttpClient";
import ClientController from "./infra/controller/ClientController";
import BlockchainService from "./infra/service/BlockchainService";

const api = new AdaptorExpress();

const httpClient = new HttpClientAxios();

const blockchainService = new BlockchainService(httpClient);

//const postAsset = new PostAsset(blockchain);
//const getAsset = new GetAsset(blockchain);

new ClientController(api);

api.listen(3000);
