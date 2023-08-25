module.exports = {
  preset: "ts-jest",
  testTimeout: 70000,
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
