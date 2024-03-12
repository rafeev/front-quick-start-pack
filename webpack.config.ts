import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export default (env: any) => {
	const config: webpack.Configuration = {
		mode: env.mode ?? 'development',

		entry: path.resolve(__dirname, 'src', 'index.tsx'),

		output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'script.[contenthash].js',
			clean: true
		},

		plugins: [
			new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
			new webpack.ProgressPlugin()
		],

		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
			],
		},

		resolve: {
			extensions: [ '.tsx', '.ts', '.js' ],
		},

		devtool: 'inline-source-map',

		devServer: {
			port: env.port ?? 5050,
			open: true
		}
	};

	return config;
}