module.exports = {
  preset: "ts-jest",
  testTimeout: 100000,
  verbose: true,
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
