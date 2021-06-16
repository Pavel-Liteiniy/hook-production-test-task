import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
	devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
	mode: 'development',

	output: {
		publicPath: '/',
	},

	entry: './src/index.tsx',

	module: {
		rules: [
			// babel
			{
				test: /\.(ts|js)x?$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
					},
				},
			},
			// css
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			// sass/scss
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			// images
			{
				test: /\.(png|jpg|jpeg|gif|ico|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'images',
							name: '[name]-[sha1:hash:7].[ext]',
						},
					},
				],
			},
			// fonts
			{
				test: /\.(woff|woff2)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts',
							name: '[name].[ext]',
						},
					},
				],
			},
		],
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
		new webpack.HotModuleReplacementPlugin(),
		new ForkTsCheckerWebpackPlugin({
			async: false,
		}),
		new ESLintPlugin({
			extensions: ['js', 'jsx', 'ts', 'tsx'],
		}),
	],

	devtool: 'inline-source-map',

	devServer: {
		contentBase: path.join(__dirname, 'build'),
		historyApiFallback: true,
		port: 4000,
		open: true,
		hot: true,
	},
};

export default config;
