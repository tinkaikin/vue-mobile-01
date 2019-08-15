//  拷贝到  postcss.config.js  文件下 替换上面的代码
const {
  sep
} = require('path')

module.exports = ({
  file
}) => {
  let rootValue = file.dirname.indexOf(`node_modules${sep}vant`) !== -1
    ? 37.5
    : 75 // 75是根据自己的设计图比例 750px

  return {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue,
        propList: ['*']
      }
    }
  }
}
