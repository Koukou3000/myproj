// 导入所有接口
import apis from './api'

//js中使用封装的 @http/api即可；Vue中将api安装到原型上，所以是import @http/index
const install = Vue => {
    if (install.installed)
        return;

    install.installed = true;

    Object.defineProperties(Vue.prototype, {
        // 注意，此处挂载在 Vue 原型的 $api 对象上
        $api: {
            get() {
                return apis
            }
        }
    })
}

export default install