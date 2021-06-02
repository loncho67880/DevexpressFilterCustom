import * as fromrevenue from './revenue.actions';
import { initialState } from './revenue.reducer';
describe('revenue actions', () => {
  it('should return actions', () => {
    expect(fromrevenue.loadrevenueInfo({revenue: initialState}).type).toBe('[Client/revenue] Load client revenue information');
    expect(fromrevenue.requestLoadrevenueInfo({id: ''}).type).toBe('[Client/revenue] Request client revenue information');
  });
});
