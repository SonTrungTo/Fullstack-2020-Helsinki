import deepFreeze from 'deep-freeze';
import counterReducer from './reducer';

describe('unicafe reducer', () => {
    const initialState = {
        good: 0,
        ok: 0,
        bad: 0
    };

    test('should return a proper initial state when called with undefined state', () => {
        const state = {};
        const action = {
            type: 'DO_NOTHING'
        };

        const newState = counterReducer(undefined, action);
        expect(newState).toEqual(initialState);
    });

    test('good is incremented', () => {
        const action = {
            type: 'GOOD'
        };
        const state = initialState;

        deepFreeze(state);
        const newState = counterReducer(state, action);
        expect(newState).toEqual({
            good: 1,
            ok: 0,
            bad: 0
        });
    });

    test('bad is incremented', () => {
        const action = {
            type: 'BAD'
        };
        const state = initialState;

        deepFreeze(state);
        const newState = counterReducer(state, action);
        expect(newState).toEqual({
            good: 0,
            ok: 0,
            bad: 1
        });
    });

    test('ok is incremented', () => {
        const action = {
            type: 'OK'
        };
        const state = initialState;

        deepFreeze(state);
        const newState = counterReducer(state, action);
        expect(newState).toEqual({
            good: 0,
            ok: 1,
            bad: 0
        });
    });

    test('reset to zero when prompted', () => {
        const action_change = {
            type: 'GOOD'
        };
        const action_reset = {
            type: 'ZERO'
        };
        const state = initialState;

        deepFreeze(state);
        const newState = counterReducer(state, action_change);
        deepFreeze(newState);
        const nextNewState = counterReducer(newState, action_reset);
        expect(nextNewState).toEqual(initialState);
    });
});