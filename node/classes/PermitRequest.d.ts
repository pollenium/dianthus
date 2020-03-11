import { Uish, Uu } from 'pollenium-uvaursi';
import { SignatureStruct, Signature } from 'pollenium-ilex';
import { Address, Uintable, Uint256 } from 'pollenium-buttercup';
export interface PermitRequestStruct {
    id?: number;
    createdAt?: number;
    holder: Uish;
    nonce: Uintable;
    signature: SignatureStruct;
}
export declare class PermitRequest {
    readonly holder: Address;
    readonly nonce: Uint256;
    readonly signature: Signature;
    private encoding;
    constructor(struct: PermitRequestStruct);
    getEncoding(): Uu;
    getIsSignatureValid(): boolean;
    static gen(struct: {
        holderPrivateKey: Uish;
        nonce: Uintable;
    }): PermitRequest;
    static fromEncoding(encodingUish: Uish): PermitRequest;
}
