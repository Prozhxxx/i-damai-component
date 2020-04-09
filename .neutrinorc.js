const reactComponents = require('@neutrinojs/react-components');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (neutrino) => {
    const merge = neutrino.config.merge;
    neutrino.options.root = __dirname;
    neutrino.use(reactComponents({
        components: 'app',
    }));
    neutrino.config.resolve.extensions
        .add('.tsx')
        .add('.ts')
        .end();
    neutrino.config.module.rule('compile').set('test', /\.(mjs|jsx|js|tsx|ts)$/)
    neutrino.config.module.rule('compile')
        .use('babel')
        .merge({
            options:{
                presets: ['@babel/preset-typescript']
            }
        });
    neutrino.config.module.rule('style').oneOf('scss').before('modules')
        .test(/\.(scss|sass)$/)
        .include.add(path.resolve(__dirname, 'src')).add(path.resolve(__dirname, 'test'))
        .end()
        // .use('extract')
        // .loader(MiniCssExtractPlugin.loader)
        // .end()
        // https://webpack.js.org/plugins/mini-css-extract-plugin/
        // This plugin should be used only on production builds without style-loader in the loaders chain
        .use('style')
        .loader('style-loader')
        .end()
        .use('css')
        .loader('css-loader')
        .end()
        .use('sass')
        .loader('sass-loader')
        .end()
    neutrino.config.module.rule('image').use('url')
        .merge({
            options: {
                fallback: {
                    loader: 'file-loader',
                },
                esModule: false,
            }
        })
};
