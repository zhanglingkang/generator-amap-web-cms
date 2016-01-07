var path = require("path")
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")
module.exports = {
    entry: {
        home: ['./src/home'],
        menu1: ['./src/menu1'],
        menu2: ['./src/menu2']
    },
    output: {
        path: path.join(__dirname, "src"),
        filename: "[name].js"
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(css)$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "../../node_modules/compass-mixins/lib")]
    },
    plugins: [new CommonsChunkPlugin('common.js')]
}
