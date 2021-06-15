module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  // Temporarily disabling while experiencing this issue:
  // - https://github.com/storybookjs/storybook/issues/15067
  // - https://github.com/styleguidist/react-docgen-typescript/issues/356
  // Looks like might be fixed in Storybook 6.3
  typescript: {
    reactDocgen: 'none',
  }
}