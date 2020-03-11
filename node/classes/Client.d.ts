import { Uish } from 'pollenium-uvaursi';
export declare class Client {
    readonly serverUrl: string;
    constructor(serverUrl: string);
    private post;
    genAndUploadPermitRequest(struct: {
        holderPrivateKey: Uish;
        nonce: Uish;
    }): Promise<void>;
    genAndUploadDepositSweepRequest(holder: Uish): Promise<void>;
}
