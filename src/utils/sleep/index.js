
// 加载时,给予一定的延迟执行时间,提高用户体验,让数据的加载不是瞬间完成
export default time => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}
