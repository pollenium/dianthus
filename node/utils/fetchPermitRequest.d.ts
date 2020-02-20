import { PermitRequest } from '../classes/PermitRequest';
import { Address } from 'pollenium-buttercup';
export declare function fetchPermitRequest(holder: Address): Promise<PermitRequest | null>;
