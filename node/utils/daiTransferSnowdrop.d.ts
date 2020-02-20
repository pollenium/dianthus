import { Snowdrop } from 'pollenium-snowdrop';
import { Address, Uint256 } from 'pollenium-buttercup';
export declare const daiTransferSnowdrop: Snowdrop<DaiTransfer>;
export interface DaiTransfer {
    src: Address;
    dst: Address;
    wad: Uint256;
}
