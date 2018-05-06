import axios from 'axios';
import utility from 'ct-utility';
import CodeMsg from 'common/code-msg';

const axiosObj = axios.create({
    timeout: 1000,
    params: {
        _: +new Date()
    }
});

axiosObj.interceptors.response.use(function(response) {
    try {
        const transfered = utility.objTransfer.lowerKey(response.data);

        if (transfered.code === 0 || transfered.status){
            return transfered;
        }
        if (typeof transfered.code !== 'undefined'){
            return Promise.reject({
                msg: CodeMsg.resolveDataError(transfered.code),
                response: response
            });
        }
    } catch (e){
        return Promise.reject({
            msg: '接口数据非预期',
            error: e
        });
    }
}, function(error) {
    let msg;

    if (error.request){
        msg = CodeMsg.resolveRequestError(error.request);
    } else if (error.request){
        msg = CodeMsg.resolveRequestError();
    } else {
        msg = error.message;
    }
    return Promise.reject({
        msg,
        error
    });
});

export default axiosObj;
