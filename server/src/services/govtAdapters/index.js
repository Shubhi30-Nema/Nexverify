import { MockGovtAdapter } from './mockGovtAdapter.js';
import { LiveGovtAdapter } from './liveGovtAdapter.js';

const mode = (process.env.GOVT_API_MODE || 'MOCK').toUpperCase();
export const govtService = mode === 'LIVE' ? new LiveGovtAdapter() : new MockGovtAdapter();
export { MockGovtAdapter, LiveGovtAdapter };
export default govtService;
