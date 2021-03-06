import { Uish, Uu } from 'pollenium-uvaursi';
import { Address } from 'pollenium-buttercup';
export declare class DepositRequest {
    readonly holder: Address;
    private encoding;
    constructor(holder: Uish);
    getEncoding(): Uu;
    static fromEncoding(encodingUish: Uish): DepositRequest;
}
