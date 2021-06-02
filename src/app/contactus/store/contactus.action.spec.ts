import * as fromcontactus from './contactus.actions';
import { initialState } from './contactus.reducer';
describe('contactus actions', () => {
  it('should return actions', () => {
    expect(
      fromcontactus.loadcontactusInfo({ contactus: initialState }).type
    ).toBe('[Client/contactus] Load client contactus information');
    expect(fromcontactus.requestLoadcontactusInfo().type).toBe(
      '[Client/contactus] Request client contactus information'
    );
  });
});
