const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
const webpack = require('webpack');

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {});

const helpers = require('./helpers');

const webpackOptions = {
    env: ENV,
    cleanOutput: false,
    filesToCopy: [{ from: './src/icons_dev', to: "./icons", toType: "dir" }],
};

/**
 * Webpack configuration
 */
module.exports = (function(env) {
    webpackOptions.cleanOutput = env.clean === "true";
    return webpackMerge(commonConfig(webpackOptions), {
        devtool: 'cheap-module-source-map',
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': '"development"'
                }
            }),
        ]
    });
});