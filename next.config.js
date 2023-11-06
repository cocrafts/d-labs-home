const { DefinePlugin } = require('webpack');
const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
	swcMinify: true,
	typescript: {
		ignoreBuildErrors: true,
	},
	reactStrictMode: true,
	transpilePackages: [
		'@walless/gui',
		'@walless/icons',
		'@walless/markdown',
		'react',
		'react-native',
		'react-native-reanimated',
		'react-native-svg',
	],
	webpack: (config, { dev, isServer, webpack }) => {
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			'react-native$': 'react-native-web',
		};

		config.resolve.extensions = [
			'.web.js',
			'.web.jsx',
			'.web.ts',
			'.web.tsx',
			...config.resolve.extensions,
		];

		config.plugins.push(
			new DefinePlugin({
				__DEV__: dev,
			}),
		);

		if (isServer) {
			config.plugins.push(
				new webpack.ProvidePlugin({
					requestAnimationFrame: path.resolve(__dirname, './raf.js'),
				}),
			);
		}

		return config;
	},
};
