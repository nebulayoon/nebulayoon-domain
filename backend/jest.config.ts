export default {
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "collectCoverageFrom": [
    "**/*.(t|j)s"
  ],
  "coverageDirectory": "./coverage/backend",
  "testEnvironment": "node",
  "displayName": "backend",
  "testMatch": [
    "<rootDir>/src/**/*(*.)@(spec|test).[jt]s?(x)"
  ],
  "preset": "./jest.preset.js"
}