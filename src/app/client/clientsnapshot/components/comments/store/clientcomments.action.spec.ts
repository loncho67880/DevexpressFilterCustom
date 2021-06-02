import * as fromClientComments from './ClientComments.actions';
import { initialState } from './ClientComments.reducer';
describe('ClientComments actions', () => {
  it('should return actions', () => {
    expect(fromClientComments.loadClientCommentsInfo({clientComments: initialState.clientComments}).type).toBe('[Client/ClientComments] Load client ClientComments information');
    expect(fromClientComments.requestLoadClientCommentsInfo().type)
      .toBe('[Client/ClientComments] Request client ClientComments information');
  });
});
