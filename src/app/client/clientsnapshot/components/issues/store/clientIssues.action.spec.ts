import * as fromClientIssues from './ClientIssues.actions';
import { initialState } from './ClientIssues.reducer';
describe('ClientIssues actions', () => {
  it('should return actions', () => {
    expect(fromClientIssues.loadClientIssuesInfo({clientIssues: initialState.clientIssues}).type).toBe('[Client/ClientIssues] Load client ClientIssues information');
    expect(fromClientIssues.requestLoadClientIssuesInfo().type).toBe('[Client/ClientIssues] Request client ClientIssues information');
  });
});
