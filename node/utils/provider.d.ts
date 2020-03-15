import { ethers } from 'ethers';
declare class FastProvider extends ethers.providers.InfuraProvider {
    getGasPrice(): Promise<ethers.utils.BigNumber>;
}
export declare const provider: FastProvider;
export {};
