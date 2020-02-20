import { Snowdrop } from 'pollenium-snowdrop';
import { Address, Uint256 } from 'pollenium-buttercup';
export interface DaiTransfer {
    src: Address;
    dst: Address;
    wad: Uint256;
}
export declare function getDaiTransferSnowdrop(): Snowdrop<DaiTransfer>;
