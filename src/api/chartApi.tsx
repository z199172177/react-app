import {getBaseHost} from "../components/env";

export const pfProjectViewAsyncFetch = (setData: Function) => {
    fetch(getBaseHost() + '/pFinderData/allProjectDataStatistics',
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