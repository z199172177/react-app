import React, {useEffect, useState} from 'react';
import {Column} from "@ant-design/plots";
import {getBaseHost} from "../components/env";


interface Props {
    queryParams: any;
}

const PFDataCharts: React.FC<Props> = (props) => {
    const [data, setData] = useState([]);
    const {queryParams} = props;

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch(getBaseHost() + '/pFinderData/dataStatistics',
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(queryParams),
            }
        )
            .then((response) => {
                console.log(response, '成功');
                return response.json()
            })
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        data,
        isStack: true,
        xField: 'year',
        yField: 'value',
        seriesField: 'type',
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle'
            // 可配置附加的布局方法
            layout: [
                // 柱形图数据标签位置自动调整
                {
                    type: 'interval-adjust-position',
                }, // 数据标签防遮挡
                {
                    type: 'interval-hide-overlap',
                }, // 数据标签文颜色自动调整
                {
                    type: 'adjust-color',
                },
            ],
        },
    };

    // @ts-ignore
    return (<Column {...config} />);
};


export default PFDataCharts;