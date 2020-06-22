const reactComponents = require('@neutrinojs/react-components');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (neutrino) => {
    const isPro = process.env.NODE_ENV === 'production';
    const merge = neutrino.config.merge;
    neutrino.options.root = __dirname;
    neutrino.use(reactComponents({
        html: {
            inject: true,
            appMountId: 'damai',
            template: require('html-webpack-template'),
            title: 'i-damai-component',
            scripts: [
                '//at.alicdn.com/t/font_1747033_zs2l6l9jzj.js',
                '//webapi.amap.com/maps?v=1.4.15&key=8b8250081ef2281915a0564d108cf812',
            ],
            // bodyHtmlSnippet: '<div onclick="onTest()" style="height: 30px; width: 100px;">button</div><script>var a = 1;  function onTest(){console.log(a++); document.getElementById("damai").style.display = a%2?"none":"block"; window.location.hash=a%2?"":"damai"}</script>'
        },
        components: 'index',
    }));
    neutrino.config
        .output
        /**/    .set('publicPath', isPro ? './' : '/')
        .end()
        .devtool(isPro ? '(none)' : 'source-map')
        .devServer
        /* not refresh page during HMR */
        /**/    .set('hotOnly', false)
        /**/    .set('host', '127.0.0.1')
        .end()
        .resolve
        /**/    .alias
        /**/        .set('@', path.resolve(__dirname, 'src'))
        /**/    .end()
        /**/    .extensions
        /**/        .add('.tsx')
        /**/        .add('.ts')
        /**/    .end()
        .end()
        .module
        /**/    .rule('compile')
        /**/        .set('test', /\.(mjs|jsx|js|tsx|ts)$/)
        /**/            .use('babel')
        /**/                .merge({
        /**/                    options: {
            /**/                   presets: ['@babel/preset-typescript']
            /**/                }
        /**/                })
        /**/            .end()
        /**/    .end()
        /**/    .rule('style')
        /**/        .oneOf('scss')
        /**/        .before('modules')
        /**/            .test(/\.(scss|sass)$/)
        /**/            .include
        /**/                .add(path.resolve(__dirname, 'src')).add(path.resolve(__dirname, 'test'))
        /**/            .end()
        /**/ //.use('extract')
        /**/ //.loader(MiniCssExtractPlugin.loader)
        /**/ //.end()
        /**/ //https://webpack.js.org/plugins/mini-css-extract-plugin/
        /**/ //This plugin should be used only on production builds without style-loader in the loaders chain
        /**/            .use('style')
        /**/                .loader('style-loader')
        /**/            .end()
        /**/            .use('css')
        /**/                .loader('css-loader')
        /**/            .end()
        /**/            .use('sass')
        /**/                .loader('sass-loader')
        /**/            .end()
        /**/        .end()
        /**/        .oneOf('scss-module')
        /**/        .before('scss')
        /**/            .test(/\.module\.(scss|sass)$/)
        /**/            .include
        /**/                .add(path.resolve(__dirname, 'src')).add(path.resolve(__dirname, 'test'))
        /**/            .end()
        /**/            .use('style')
        /**/                .loader('style-loader')
        /**/            .end()
        /**/            .use('css')
        /**/                .loader('css-loader')
        /**/                .options({
        /**/                    importLoaders: 0,
        /**/                    modules: true
        /**/                })
        /**/            .end()
        /**/            .use('sass')
        /**/                .loader('sass-loader')
        /**/            .end()
        /**/        .end()
        /**/    .end()
        /**/    .rule('image')
        /**/        .use('url')
        /**/            .merge({
        /**/                options: {
            /**/                fallback: {
                /**/                loader: 'file-loader',
                /**/            },
            /**/                esModule: false,
            /**/            }
        /**/            })
        /**/        .end()
        /**/    .end()
        .end()
        .externals({AMap: 'AMap'})
        .optimization
        /**/    .set('minimize', false)
        .end()

};
