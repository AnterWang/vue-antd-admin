// 正则校验
// 手机号
const pattern_phone = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
// 手机号和固定电话
const pattern_all_phone = /^(([4|8]00[0-9]{7})|(0\d{2,3}-\d{7,8})|([1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}))$/;
// 密码 只能输入6-20个字母、数字、下划线
const pattern_psd = /^(\w){6,20}$/
// 只能输入数字
const pattern_number = /^[0-9]*$/
// 大小写字母和数字
const pattern_Aznum = /^[A-Za-z0-9]+$/
// 不能输入特殊字符 即只能输入汉字英文和数字
const pattern_notSpecial = /^[\u4E00-\u9FA5a-zA-Z0-9]+$/
export {
    pattern_phone,
    pattern_psd,
    pattern_number,
    pattern_Aznum,
    pattern_notSpecial,
    pattern_all_phone
}
