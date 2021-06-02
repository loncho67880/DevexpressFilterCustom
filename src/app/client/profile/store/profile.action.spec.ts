import * as fromProfile from './profile.actions';
import { initialState } from './profile.reducer';
describe('Profile actions', () => {
  it('should return actions', () => {
    expect(fromProfile.loadProfileInfo({profile: initialState}).type).toBe('[Client/Profile] Load client profile information');
    expect(fromProfile.requestLoadProfileInfo().type).toBe('[Client/Profile] Request client profile information');
  });
});
