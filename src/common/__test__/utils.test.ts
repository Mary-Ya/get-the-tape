import {
    getRandomNumber, DEFAULT_MAX_RANDOM_NUMBER,
    removeItemByProperty
} from "../utils";

describe('getRandomNumber: generating random numbers', () => {
    test('numbers are random', () => {
        const mockRandom = jest.fn(getRandomNumber);
        mockRandom();
        for (let i = 1; i < 3; i++) {
            mockRandom();
            expect(mockRandom.mock.results[i]).not.toBe(mockRandom.mock.results[i - 1]);
        };

        expect(mockRandom.mock.calls.length).toBe(3);
    })

    test('numbers are in proper range', () => {
        const defaultRandomNumber = getRandomNumber();
        const customRandomNumber = getRandomNumber(1);

        expect(defaultRandomNumber).toBeGreaterThan(0);
        expect(defaultRandomNumber).toBeLessThan(DEFAULT_MAX_RANDOM_NUMBER);

        expect(customRandomNumber).toBeLessThan(1);
    })
})

test('removeItemByProperty: remove array items with specific key:value pair', () => {
    const shouldBeShorter = removeItemByProperty([{
        removedId: 42,
        irrelevantNumber: 42
    }, {
        irrelevantNumber: 42,
        removedId: 43
    }], 42, 'removedId');

    const shouldBeTheSame = removeItemByProperty([{
        removedId: 43
    }, {
        irrelevantNumber: 42
    }], 42, 'removedId');

    expect(shouldBeShorter).not.toContainEqual({ removedId: 42 });
    expect(shouldBeTheSame.length).toBe(2);
})