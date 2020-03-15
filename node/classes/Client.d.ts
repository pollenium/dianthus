import { Uish } from 'pollenium-uvaursi';
import { GenActionViaSignatureStructStruct } from 'pollenium-alchemilla';
export declare class Client {
    readonly serverUrl: string;
    constructor(serverUrl: string);
    private post;
    private postRequest;
    genAndUploadPermitRequest(struct: {
        holderPrivateKey: Uish;
        spender: Uish;
        nonce: Uish;
    }): Promise<void>;
    genAndUploadDepositRequest(struct: GenActionViaSignatureStructStruct): Promise<void>;
    genAndUploadWithdrawRequest(struct: GenActionViaSignatureStructStruct): Promise<void>;
    genAndUploadWithdrawAndNotifyRequest(struct: GenActionViaSignatureStructStruct): Promise<void>;
}
