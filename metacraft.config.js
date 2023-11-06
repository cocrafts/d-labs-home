const { resolve } = require('path')
const CopyPlugin = require('copy-webpack-plugin');

const copyAssets = (config) => {
  config.plugins.push(
    new CopyPlugin({
      patterns: [
				{
					from: resolve(process.cwd(), 'assets/'),
					to: './',
					filter: (uri) => {
						const isFont = uri.indexOf('/fonts/') >= 0;
						const isTemplate = uri.endsWith('.ejs') || uri.endsWith('.sass');

						return !isFont && !isTemplate;
					},
				},
      ],
    }),
  );
};

module.exports = {
	compiler: 'esbuild',
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	webpackMiddlewares: [
    copyAssets,
  ],
	moduleAlias: {
		global: {
			'react-native$': 'react-native-web',
		},
	},
};
