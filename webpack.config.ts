import { Configuration as WebpackConfig } from 'webpack';
import { Configuration as WebpackDevServerConfig } from 'webpack-dev-server';

import * as path from 'path';
import * as os from 'os';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

interface Configuration extends WebpackConfig {
    devServer?: WebpackDevServerConfig;
}

const cores = os.cpus().length;

const mode = process.env.NODE_ENV === 'development' ? process.env.NODE_ENV : 'production';

const devServer: WebpackDevServerConfig = {
    port: 8082,
    compress: true,
    hot: true,
    index: './index.html',
};

const config: Configuration = {
    mode,
    entry: {
        index: path.resolve(__dirname, './src/index.tsx'),
        render: path.resolve(__dirname, './src/render.tsx'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'amd',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: { configFile: `tsconfig.${ mode }.json` },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.eot|ttf|woff|woff2|ico|png|gif|jpg|svg($|\?)/,
                loader: 'file-loader',
                options: {
                    useRelativePath: false,
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css', '.json'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: `./tsconfig.${ mode }.json`,
            }),
        ],
    },
    plugins: [
        new HtmlPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            excludeChunks: ['index', 'library'],
        }),
        new CopyWebpackPlugin([
            { from: 'node_modules/requirejs/require.js', to: 'require.js' },
        ]),
    ],
    externals: {
        fsevents: "require('fsevents')",
    },
    optimization: {
        minimizer: [
            new TerserPlugin({ cache: true, parallel: cores }),
        ],
    },
    devtool: mode === 'development' ? 'inline-source-map' : undefined,
    devServer: mode === 'development' ? devServer : undefined,
};

module.exports = config;
