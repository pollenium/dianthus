import { Address } from 'pollenium-buttercup';
export declare function fetchUnhandledDaiTransferAndMarkHandled(): Promise<{
    id: number;
    dst: Address;
}>;
