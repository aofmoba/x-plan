module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            unitToConvert: 'px',
            viewportWidth: 375,
            unitPrecision: 7,
            propList: ['width', 'height'],
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: undefined,
            include: [/src/],
            landscape: false,
            landscapeUnit: 'vw',
            landscapeWidth: 812,
        },
        'postcss-preset-env': {},
        // ...
    },
}
