import webpack from 'webpack';
import path from 'path';

export default {
    entry: {
        app: './src/app.js',
        vendor: [ 'jquery', 'angular', 'angular-resource' ]
    },
    output: {
        filename: 'app.bundle.js',
        path: path.resolve('public/scripts') 
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};
