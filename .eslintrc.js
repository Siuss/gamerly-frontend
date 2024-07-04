// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "plugin:import/recommended"],
  rules: {
    "import/no-cycle": "error",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
    },
  },
  "parserOptions": {
        "ecmaVersion": 2020
    }
};
