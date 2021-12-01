module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['simple-import-sort', 'prettier'],
  rules: {
    curly: 'warn',
    'simple-import-sort/imports': 'error',
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
  },
};
