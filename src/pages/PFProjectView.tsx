import React, {useEffect, useState} from 'react';
import {Bar} from '@ant-design/plots';
import {pfProjectViewAsyncFetch} from "../api/chartApi";
import {Button, Card, Col, Form, Input, Layout, Modal, notification, Row, Select, Space, theme} from 'antd';
import env from "../components/env";
import {NotificationPlacement} from "antd/es/notification/interface";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const PFProjectView: React.FC = () => {
    //设置数据源
    const [settingDsVisible, setSettingDsVisible] = useState<boolean>(false); // 是否显示导出弹窗
    const [dsInputValue, setDsInputValue] = useState('');

    //pfProjectView图表的数据
    const [data, setData] = useState([]);

    //表单
    const [form] = Form.useForm();

    //对话提示框
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement, type: NotificationType, message: string) => {
        api[type]({
            message: message,
            // description: message,
            placement: placement,
        });
    };

    useEffect(() => {
        pfProjectViewAsyncFetch(setData);
    }, []);

    function PFProjectChart() {
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
        return (<Bar {...config} onReady={(bar) => {
            bar.on('interval:click', (...args: any) => {
                const data = args[0].data?.data;
                console.log(data, 'data')
            });
        }}/>)
    }

    // @ts-ignore
    return (
        <>
            {contextHolder}
            <div style={{margin: "10px 20px"}}>
                <Card style={{marginBottom: "10px"}}>
                    <Form form={form} name="search-form" className="search-form">
                        <Row>
                            <Col span={24} style={{textAlign: "right"}}>
                                <div className="chart-btn">
                                    <Button type="primary" htmlType="submit" onClick={() => setSettingDsVisible(true)}>设置</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Card>
                    <PFProjectChart></PFProjectChart>
                </Card>
            </div>

            {/* 数据源配置弹窗*/}
            {settingDsVisible ? (
                <Modal
                    title="配置数据源"
                    open={settingDsVisible}
                    wrapClassName="pFinder-setting-ds-modal"
                    closable={true}
                    width={500}
                    onCancel={() => {
                        setSettingDsVisible(false);
                    }}
                    maskClosable={false}
                    footer={<></>}
                >
                    <Space direction="vertical" size="large" style={{width: '100%'}}>
                        <Space.Compact style={{width: '100%'}}>
                            <Input defaultValue={env.apiUrl} onChange={(e) => setDsInputValue(e.target.value)}/>
                            <Button type="primary" onClick={() => {
                                env.apiUrl = dsInputValue;
                                window.localStorage.setItem('apiUrl', dsInputValue);
                                openNotification('top', "success", '设置成功');
                            }}>Submit</Button>
                        </Space.Compact>
                    </Space>
                </Modal>
            ) : null}
        </>

    );

};

export default PFProjectView;
