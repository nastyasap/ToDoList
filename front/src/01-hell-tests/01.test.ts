import {sum} from './01'
import {mult} from './01'
import {splitIntoWords} from "./01";

//data
const a = 1;
const b = 2;
const c = 3;

test('sum should be correct', () => {
    //action
    const result1 = sum(a, b);
    const result2 = sum(b, c);

    //expected result
    expect(result1).toBe(3);
    expect(result2).toBe(5);
})

test('multiply should be correct', () => {
    const result = mult(a, b);
    expect(result).toBe(2);
})

test('splitting into words should be correct',
    () => {
        const sent1 = 'hello my Friend!';
        const sent2 = 'JS - my love'

        const result1 = splitIntoWords(sent1)
        const result2 = splitIntoWords(sent2)

        expect(result1.length).toBe(3);
        expect(result1[0]).toBe('hello');
        expect(result1[1]).toBe('my');
        expect(result1[2]).toBe('friend');

        expect(result2.length).toBe(3);
        expect(result2[0]).toBe('js');
        expect(result2[1]).toBe('my');
        expect(result2[2]).toBe('love');


    })