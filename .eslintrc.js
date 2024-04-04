module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: ["standard", "prettier", "eslint:recommended"],
  plugins: ["prettier"],
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    camelcase: 0,
    "no-console": 1
  }
};
