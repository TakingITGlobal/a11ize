// your app's webpack.config.js
const custom = require('../webpack.config.js');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-knobs/register'],
  webpackFinal: (config) => {
    console.log(custom);
    return {
      ...config,
      module: { ...config.module, rules: custom[0].module.rules },
    };
  },
};
