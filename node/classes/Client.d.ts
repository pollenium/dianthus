import { Uish, Uu } from 'pollenium-uvaursi';
export declare class Client {
    readonly serverUrl: string;
    constructor(serverUrl: string);
    genAndUploadPermitRequest(struct: {
        holderPrivateKey: Uish;
        nonce: Uish;
    }): any;
    genAndUploadDepositSweepRequest(holder: Uish): Uu;
}
