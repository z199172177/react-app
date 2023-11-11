import React, {forwardRef, useImperativeHandle, useState} from 'react';
import { Button, Card, Col, DatePicker, Form, Row, Select } from 'antd';
interface Props {
    formQuery: any;
    formReset: any;
    setDataChartsVisible: Function;
    setSlowSqlListVisible: Function;
    setSettingDsVisible: Function;
}
const { RangePicker } = DatePicker;

const PFDataSearchFrom = forwardRef((props: Props, ref) => {
    const [form] = Form.useForm();
    const {formQuery, formReset, setDataChartsVisible, setSlowSqlListVisible, setSettingDsVisible} = props;

    // 暴露表单方法
    useImperativeHandle(ref, () => ({
        getFormValue: () => {
            return form.getFieldsValue();
        },
        resetFormValue: () => {
            return form.resetFields();
        },
    }));


    // 打开弹框
    const openImportCard = () => {
        setDataChartsVisible(true);
    };

    // 打开弹框
    const openSlowSqlCard = () => {
        setSlowSqlListVisible(true);
    };

    // 打开弹框
    const openSettingDsCard = () => {
        setSettingDsVisible(true);
    };

    return (
        <Card>
            <Form
                form={form}
                name="search-form"
                className="search-form"
                onFinish={() => {
                    formQuery();
                }}
            >
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item name="appName" label="应用名称">
                            <Select placeholder="全部" allowClear>
                                <Select.Option value="clue-collection-service">clue-collection-service</Select.Option>
                                <Select.Option value="hwishsoa">hwishsoa</Select.Option>
                                <Select.Option value="release-assistant-service">release-assistant-service</Select.Option>
                                <Select.Option value="multi-pay-worker">multi-pay-worker</Select.Option>
                                <Select.Option value="multi-pay-common-soa">multi-pay-common-soa</Select.Option>
                                <Select.Option value="jujia-archives-center">jujia-archives-center</Select.Option>
                                <Select.Option value="contract-soa">contract-soa</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="component" label="组件类型">
                            <Select placeholder="全部" allowClear>
                                <Select.Option value="JsfConsumer">JsfConsumer</Select.Option>
                                <Select.Option value="JsfProvider">JsfProvider</Select.Option>
                                <Select.Option value="Mysql">Mysql</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="state" label="状态" >
                            <Select placeholder="全部" allowClear>
                                <Select.Option value="1">成功</Select.Option>
                                <Select.Option value="2">失败</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="startTime" label="时间">
                            <RangePicker   format="YYYY/MM/DD" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={2} style={{textAlign:"left"}}>
                        <div className="chart-btn">
                            <Button type="primary" htmlType="submit" onClick={openImportCard}>
                                展示图表
                            </Button>
                        </div>
                    </Col>
                    <Col span={2} style={{textAlign:"left"}}>
                        <div className="chart-btn">
                            <Button type="primary" htmlType="submit" onClick={openSlowSqlCard}>
                                慢SQL列表
                            </Button>
                        </div>
                    </Col>
                    <Col span={2} style={{textAlign:"left"}}>
                        <div className="chart-btn">
                            <Button type="primary" htmlType="submit" onClick={openSettingDsCard}>
                                设置
                            </Button>
                        </div>
                    </Col>
                    <Col span={18} style={{textAlign:"right"}}>
                        <div className="action-container">
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button style={{marginLeft:10}} className="reset-btn" onClick={() => {formReset();}}>重置</Button>
                        </div>
                    </Col>
                </Row>
            </Form>

        </Card>
    );
});

export default PFDataSearchFrom;
