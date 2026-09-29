/**
 * ==============================================================================
 * GOVERNMENT API ADAPTER MODULE ENTRYPOINT
 * ==============================================================================
 * Exports the unified interface, Mock adapter, Live adapter, and the Gateway.
 * ==============================================================================
 */

export { GovtApiInterface } from './GovtApiInterface.js';
export { MockGovtAdapter } from './MockGovtAdapter.js';
export { LiveGovtAdapter } from './LiveGovtAdapter.js';
export { govtGateway, default } from './GovtApiGateway.js';
