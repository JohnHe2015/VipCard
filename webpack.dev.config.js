const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : path.resolve(__dirname, './main.js'),
    output : {
        path : path.resolve(__dirname, './build'),
        filename : 'bundle.js'
    },
    module : {
        rules : [
            {
                test : /\.(js|jsx)$/,
                use : {
                    loader : 'babel-loader',
                    // query : {
                    //      presets : ['react','env']
                    //  }
                },
                exclude : '/node_modules/'
            },
            // {
            //     test : /\.css$/,
            //     use :  ['style-loader','css-loader'],
            //     exclude : '/node_modules/'
            // },
            {
                test : /\.(css|less)$/,
                use : ['style-loader','css-loader','less-loader'],
                exclude : '/node_modules/'
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            hash : true,              //生成hash
            filename : './index.html',//生成文件  ./build/index.html
            template : './index.html' //模板文件  ./index.html
        })
    ],

    devServer : {
        contentBase : path.resolve(__dirname, './build'),
        port : 8888,
        // inline : true,
        // hot : true,
        compress : true
    }
}