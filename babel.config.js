module.exports = function (api) {
  api.cache(true);
  return {
  presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};
// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: [
//       'babel-preset-expo', // 👈 must come first
//       'module:@react-native/babel-preset',
//     ],
//     plugins: [
//       [
//         'module:react-native-dotenv',
//         {
//           moduleName: '@env',
//           path: '.env',
//           blacklist: null,
//           whitelist: null,
//           safe: false,
//           allowUndefined: true,
//         },
//       ],
//       'react-native-worklets/plugin',
//     ],
//   };
// };
