// 时间戳转时间
export function formatTime (timer: number): string {
  return `字符串 -- ${timer}`
}

// 防抖
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function debounce (fn: any, delay: number) {
  let timer: number | null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}
