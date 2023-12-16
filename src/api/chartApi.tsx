import {getBaseHost} from "../components/env";
import {ErrLogDiagnosticReq, SqlDiagnosticReq} from "../interface/interface";

export const dataStatisticsByDay = (setData: Function) => {
    fetch(getBaseHost() + '/pFinderData/dataStatisticsByDay',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: "",
        }
    )
        .then((response) => {
            return response.json()
        })
        .then((json) => setData(json))
        .catch((error) => {
            console.log('fetch data failed', error);
        });
};

export const allProjectViewAsyncFetch = (setData: Function) => {
    let currentDateEnv = window.sessionStorage.getItem("currentDateEnv");
    let jsonObj = {env: currentDateEnv};
    fetch(getBaseHost() + '/pFinderData/allProjectDataStatistics',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonObj),
        }
    )
        .then((response) => {
            return response.json()
        })
        .then((json) => setData(json))
        .catch((error) => {
            console.log('fetch data failed', error);
        });
};

export const oneProjectViewAsyncFetch = (setData: Function, queryParams: any) => {
    fetch(getBaseHost() + '/pFinderData/oneProjectDataStatistics',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(queryParams),
        }
    )
        .then((response) => {
            return response.json()
        })
        .then((json) => setData(json))
        .catch((error) => {
            console.log('fetch data failed', error);
        });
};

export const dataStatisticsAsyncFetch = (setData: Function, queryParams: any) => {
    fetch(getBaseHost() + '/pFinderData/dataStatistics',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(queryParams),
        }
    )
        .then((response) => {
            return response.json()
        })
        .then((json) => setData(json))
        .catch((error) => {
            console.log('fetch data failed', error);
        });
};


export const sqlDiagnosticFetch = (reqObject: SqlDiagnosticReq, setSqlDiagnosticResult: Function) => {
    let url = "";
    if (reqObject.index == 1) {
        url = getBaseHost() + '/sqlDr/sqlDiagnostic';
    } else if (reqObject.index == 2) {
        url = getBaseHost() + '/sqlDr/sqlExplainDiagnostic';
    } else if (reqObject.index == 3) {
        url = getBaseHost() + '/sqlDr/tableAndIndexDiagnostic';
    } else {
        return;
    }
    fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqObject),
        }
    )
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            let result = json.data;
            if (result === null || result === undefined || result === "") {
                result = json.msg;
            }
            setSqlDiagnosticResult(result);
            reqObject.componentDisabled(false);
        })
        .catch((error) => {
            console.log('fetch data failed', error);
        });
};


export const errLogDiagnosticFetch = (reqObject: ErrLogDiagnosticReq, setErrLogDiagnosticResult: Function) => {
    let url = getBaseHost() + '/errLogDr/errLogDiagnostic';
    fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqObject),
        }
    )
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            let result = json.data;
            if (result === null || result === undefined || result === "") {
                result = json.msg;
            }
            setErrLogDiagnosticResult(result);
            reqObject.componentDisabled(false);
        })
        .catch((error) => {
            console.log('fetch data failed', error);
        });
};