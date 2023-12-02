import React, {useEffect, useState} from "react";
import {Card} from "antd";
import {dataStatisticsByDay} from "../api/chartApi";
import {Bar} from "@ant-design/plots";

const PFSevenDaysDataList: React.FC = () => {
    //pfProjectView图表的数据
    const [data, setData] = useState([]);

    useEffect(() => {
        dataStatisticsByDay(setData);
    }, []);

    function PFProjectChart() {
        const config = {
            data: data.sort((a: any, b: any) => {
                // return stackOrder.indexOf(a.type) - stackOrder.indexOf(b.type);
                return a.type.localeCompare(b.type);
            }),
            isStack: true,
            xField: 'xField',
            yField: 'yField',
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
        return (<Bar {...config} onReady={(bar) => {
        }}/>)
    }

    // @ts-ignore
    return (
        <>
            <div style={{margin: "10px 20px"}}>
                <Card>
                    <PFProjectChart></PFProjectChart>
                </Card>
            </div>
        </>
    );
};

export default PFSevenDaysDataList;