module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: 2020
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb-typescript",
        "plugin:node/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
    ],
    settings: {
        "import/resolver": {
            node: {
                extensions: [".ts", ".js"],
                paths: ["src"],
            },
        },
    },
    plugins: [
        "@typescript-eslint",
        "@typescript-eslint/eslint-plugin",
        "import"
    ],
};
