import { reducer, initialState } from './header.reducer';

describe('Header reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });
});
