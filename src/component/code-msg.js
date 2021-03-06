/**
 * @author rubyisapm
 */
const codeMsg = {
    dataErrorMsg: {
        20001: '已存在相同名称计时物品类',
        default: '处理出错'
    },
    responseErrorMsg: {
        401: '您没有登录',
        403: '您没有权限',
        default: '接口错误'
    },
    requestErrorMsg: {
        default: '请求错误'
    },
    /**
     * 根据code码得到对应的错误信息
     * @param {Number} code 接口响应数据中的code属性
     * @returns {String} 消息字符串或消息字符串组成的数组
     */
    resolveDataError(code, defaultMsg = ''){
        if (defaultMsg === ''){
            defaultMsg = codeMsg.dataErrorMsg.default;
        }
        return codeMsg.dataErrorMsg[code] || defaultMsg;
    },
    /**
     * 处理消息以便得到可供显示的内容
     * @param {String, Object} msg error接收到的参数，一般为响应回调中计算出的消息字符串，或者xhr对象, 也有可能是then中由于数据处理错误抛出的异常
     * @param {String} defaultMsg 默认错误信息
     * @returns {String} 错误信息字符串 或 错误信息数组
     */
    resolveResponseError(response, defaultMsg = ''){
        if (defaultMsg === ''){
            defaultMsg = this.responseErrorMsg.default;
        }
        return this.responseErrorMsg[response.status] || defaultMsg;
    },
    resolveRequestError(){
        return this.requestErrorMsg.default;
    }
};

export default codeMsg;
