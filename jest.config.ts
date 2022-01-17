import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "testEnvironment": "jsdom",
  "moduleNameMapper": {
    "@api/(.*)": [
      "<rootDir>/src/api/$1"
    ],
    "@assets/(.*)": [
      "<rootDir>/src/assets/$1"
    ],
    "@common/(.*)": [
      "<rootDir>/src/common/$1"
    ],
    "@components/(.*)": [
      "<rootDir>/src/components/$1"
    ],
    "@hooks/(.*)": [
      "<rootDir>/src/hooks/$1"
    ],
    "@pages/(.*)": [
      "<rootDir>/src/pages/$1"
    ],
    "@interfaces/(.*)": [
      "<rootDir>/src/types/$1"
    ]
  }
};

export default config;
