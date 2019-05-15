const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    baseUrl: 'http://0.0.0.0:8080/',
    entry: './src',
    outputDir: '/home/davidlemay/arithmetic/arithmeticserver/assets/bundles/',
    output: { filename: 'bundle.js' },
    chainWebpack: (config) => {

        config.optimization.
            splitChunks(false)

        config.
            plugin('BundleTracker').
            use(BundleTracker, [{ filename: 'webpack-stats.json' }])

        config.resolve.alias.
            set('__STATIC__', '/assets/')

        config.devServer.
            public('http://0.0.0.0:8080').
            host('0.0.0.0').
            port(8080).
            hotOnly(true).
            watchOptions({ poll: 1000 }).
            https(false).
            headers({ 'Access-Control-Allow-Origin': ['\*'] })

}
        };
