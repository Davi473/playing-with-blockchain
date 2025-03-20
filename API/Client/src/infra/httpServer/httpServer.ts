import express from "express";
import cors from "cors";

export default interface HttpServer {
    register (method: string, url: string, callback: Function): Promise<void>;
    listen (port: string | number): Promise<void>;
}

export class AdaptorExpress implements HttpServer {
    private api: any;
    constructor () {
        this.api = express();
        this.api.use(express.json());
	    this.api.use(cors());
    }

    public async register(method: string, url: string, callback: Function): Promise<void> {
        this.api[method](url, async (req: any, res: any) => {
            try {
                const output = await callback(req.params, req.body);
                if (output) res.json(output);
            } catch (e: any) {
                console.log(e.mensagem);
                res.status(422).json({ message: e.message });
            }
        });
    }

    public async listen(port: string | number): Promise<void> {
        this.api.listen(port, () => console.log(`Server Open http://localhost:${port}`));
    }
}
