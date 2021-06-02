import * as fromHome from './home.actions';
import { initialState } from './home.reducer';
describe('Home actions', () => {
  it('should return actions', () => {
    expect(fromHome.requestLoadHomeInfo().type).toBe('[Home] Request Home information');
    expect(fromHome.loadHomeInfo({home: initialState}).type).toBe('[Home] Load Home information');
    expect(fromHome.requestLoadHomePortfolioInfo().type).toBe('[Home] Request portfolio information');
    expect(fromHome.loadPortfolioInfo({portfolio: initialState.portfolio}).type).toBe('[Home] Load portfolio information');
    expect(fromHome.requestLoadHomeFiscalYearInfo().type).toBe('[Home] Request fiscal Year information');
    expect(fromHome.loadFiscalYearInfo({fiscalyear: initialState.fiscalYear}).type).toBe('[Home] Load fiscal Year information');
    expect(fromHome.requestLoadHomeIndicatorsInfo().type).toBe('[Home] Request Indicators information');
    expect(fromHome.loadIndicatorsInfo({indicators: initialState.indicators}).type).toBe('[Home] Load Indicators information');
    expect(fromHome.requestLoadHomeAdvantagedClientInfo().type).toBe('[Home] Request Advantaged Client information');
    expect(fromHome.loadAdvantagedClientInfo({advantagedClient: initialState.advantagedClient}).type).toBe('[Home] Load Advantaged Client information');
  });
});
