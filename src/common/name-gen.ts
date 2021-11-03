import {adjectives, nouns} from './name-source';
import { getRandomNumber } from './utils';

const getRandomListName = () => {
    const adjLength = adjectives.length;
    const nounLength = nouns.length;

    return `${adjectives[getRandomNumber(adjLength)]} ${nouns[getRandomNumber(nounLength)]}`;
}

export default getRandomListName;