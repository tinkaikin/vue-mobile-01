
// 使用 vee 表单验证的第三方插件 自定义
import zhcN from 'vee-validate/dist/locale/zh_CN'
import { Validator } from 'vee-validate'

// test 就是个规则名称, 根据这个名称找到这里
/**
 *   使用
    <input v-validate="'required|mobile'" name="phone" type="text">
    <span>{{ errors.first('phone') }}</span> */
export default () => {
  Validator.localize('zh_CN', zhcN)
  Validator.extend('mobile', {
    getMessage: () => '请输入正确的手机号码',
    validate: value =>
      value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  })
}
