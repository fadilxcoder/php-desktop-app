const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        polyfill: "babel-polyfill",
        script: "./assets/js/init.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", {
                        'plugins': ['@babel/plugin-proposal-class-properties']
                    }]
                }
            }
        }]
    }
};