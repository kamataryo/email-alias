module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    chrome: false
  },
  extends: ['eslint:recommended'],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single']
  }
}
