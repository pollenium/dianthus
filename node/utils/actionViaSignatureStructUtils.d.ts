import { ActionViaSignatureStruct } from 'pollenium-alchemilla';
import { Uu, Uish } from 'pollenium-uvaursi';
export declare namespace actionViaSignatureStructUtils {
    function toEncoding(struct: ActionViaSignatureStruct): Uu;
    function fromEncoding(encodingUish: Uish): ActionViaSignatureStruct;
}
