module.exports = function (api) {
  api.cache(true);

  const presets = ["module:metro-react-native-babel-preset"];
  const plugins = [
    [ "module-resolver", 
      {
        "root": ["./src"],
        "extensions": [".js", ".ios.js", ".android.js"],

      }
    ]
  ];
  const env = {
    "development": {
      "plugins": ["@babel/plugin-transform-react-jsx-source"]
    }
  };

  return {
    presets,
    plugins,
    env
  };
}