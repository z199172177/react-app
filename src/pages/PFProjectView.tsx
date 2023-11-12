import React, {useEffect, useState} from 'react';
import {Bar} from '@ant-design/plots';
import {getBaseHost} from "../components/env";


const PFProjectView: React.FC = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        console.log(getBaseHost() , 'url')
        fetch(getBaseHost() + '/pFinderData/allProjectDataStatistics',
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: "",
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
        data: data.reverse(),
        isStack: true,
        xField: 'value',
        yField: 'year',
        seriesField: 'type',
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'left', 'middle', 'right'
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
    return <Bar {...config} />;

};

export default PFProjectView;
