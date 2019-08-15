import dayjs from 'dayjs'
import relaviveTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
dayjs.extend(relaviveTime)

export default dayjs
