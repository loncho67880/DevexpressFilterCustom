import { reducer, initialState } from './home.reducer';

describe('Home reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });
});
