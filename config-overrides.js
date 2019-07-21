const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#3B3E3F',
            '@body-background': '#212121',
            '@component-background': '#212121',
            '@layout-header-background': '#3B3E3F',
            '@layout-header-height': '110px;',
            '@menu-dark-color': '#3B3E3F',
            '@menu-dark-bg': '#212121'
        },
    }),
);