module.exports = {
  "extends": "@istanbuljs/nyc-config-typescript",
  "check-coverage": false,
  "per-file": true,
  "skip-full": false,
  "all": true,
  include: [
    "src/**/*.{ts,vue}"
  ],
  exclude: [
    "src/*.{ts,vue}"
  ],
  reporter: [
    "lcov",
    "text",
    "text-summary"
  ]
}
