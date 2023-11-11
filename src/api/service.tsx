import {PFinderListReqParams, PFinderSlowSqlListReqParams} from "../interface/interface";
import AxiosUtils from "../utils/AxiosUtils";


// 获取PFinder列表数据
export async function queryPFinderList(params: PFinderListReqParams) {
    let promise = AxiosUtils.httpPost( "/pFinderData/page", params);
    return promise.then(
        (data) => {
            // 接收成功状态promise数据
            // console.log(data, "成功");
            return data;
        },
        (error) => {
            // 接收失败状态promise数据
            console.log(error, "失败");
        }
    );
}

// 获取PFinder Slow SQL列表数据
export async function queryPFinderSlowSqlList(params: PFinderSlowSqlListReqParams) {
    let promise = AxiosUtils.httpPost( "/pFinderData/slowSqlPage", params);
    return promise.then(
        (data) => {
            // 接收成功状态promise数据
            // console.log(data, "成功");
            return data;
        },
        (error) => {
            // 接收失败状态promise数据
            console.log(error, "失败");
        }
    );
}


export async function queryPFinderDataStatistics(params: PFinderListReqParams) {
    let promise = AxiosUtils.httpPost( "/pFinderData/dataStatistics", params);
    return promise.then(
        (data) => {
            // 接收成功状态promise数据
            // console.log(data, "成功");
            return data;
        },
        (error) => {
            // 接收失败状态promise数据
            console.log(error, "失败");
        }
    );
}
