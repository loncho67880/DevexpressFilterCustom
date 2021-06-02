import * as fromClientSnapshot from './clientSnapshot.actions';
import { initialState } from './clientSnapshot.reducer';
describe('ClientSnapshot actions', () => {
  it('should return actions', () => {
    expect(fromClientSnapshot.loadClientSnapshotInfo({clientsnapshot: initialState}).type).toBe('[Client/ClientSnapshot] Load client ClientSnapshot information');
    expect(fromClientSnapshot.requestLoadClientSnapshotInfo({id: '0'}).type).toBe('[Client/ClientSnapshot] Request client ClientSnapshot information');
  });
});
