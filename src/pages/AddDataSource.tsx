import React from 'react';
import {Button, Divider, Form, Input, message, Select, Space, Switch,} from 'antd';

const AddDataSource: React.FC = () => {
    const [form] = Form.useForm();

    const initQueryParams = () => {
        const timeParams = {};
        const formData: PlusFilterForm = filterForm ? filterForm.current.getFormValue() : {};
        const [receiveStartTime, receiveEndTime] = formData.receiveTime ?? [];
        if (receiveStartTime && receiveEndTime) {
            Object.assign(timeParams, {
                receiveStartTime,
                receiveEndTime,
                receiveTime: undefined,
            });
        }
        const paramsInit = Object.assign(formData, timeParams);
        setQueryParams(paramsInit);
        return paramsInit;
    };

    const onFinish = () => {
        message.success('提交成功!');
    };

    const onFinishFailed = () => {
        message.error('配置提交失败，请重试!');
    };

    return (
        <>
            <Form
                form={form}
                name="wrap"
                labelCol={{ flex: '110px' }}
                labelAlign="right"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Divider orientation="left">应用配置</Divider>
                <Form.Item label="应用名称" name="appName" rules={[{ required: true }]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="部署方式" name="platform" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="jdos">jdos</Select.Option>
                    </Select>
                </Form.Item>
                <Divider orientation="left">慢SQL配置</Divider>
                <Form.Item label="实例ID">
                    <Input/>
                </Form.Item>
                <Form.Item label="数据库链接">
                    <Input/>
                </Form.Item>
                <Divider orientation="left">慢JSF配置</Divider>
                <Form.Item label="JsfProvider" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item label="JsfConsumer" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item label=" ">
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button onClick={() => {form.resetFields();}}>
                            Clear
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
};

export default () => <AddDataSource/>;