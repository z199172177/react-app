import React, {useState} from "react";
import {Breadcrumb, Button, Input, Layout, Menu, MenuProps, notification, Space, theme} from "antd";
import MainLayoutFooter from "./MainLayoutFooter";
import CustomCodeBlock from "../components/CustomCodeBlock";
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    LaptopOutlined,
    NotificationOutlined
} from '@ant-design/icons';

import '../css/SqlDiagnosticPage.css'

const SqlDiagnosticPage: React.FC = () => {
    const { Header, Content, Footer, Sider } = Layout;
    const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
        key,
        label: `nav ${key}`,
    }));

    const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
        (icon, index) => {
            const key = String(index + 1);

            return {
                key: `sub${key}`,
                icon: React.createElement(icon),
                label: `subnav ${key}`,

                children: new Array(4).fill(null).map((_, j) => {
                    const subKey = index * 4 + j + 1;
                    return {
                        key: subKey,
                        label: `option${subKey}`,
                    };
                }),
            };
        },
    );

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (<>
        <Layout>
            <Header
                style={{position: 'sticky', top: 0, zIndex: 1, width: '100%', display: 'flex', alignItems: 'center'}}>
                <div className="demo-logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items1}
                    style={{flex: 1, minWidth: 0}}
                />
            </Header>
            <Content style={{padding: '0 48px',}}>
                <Layout style={{padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG}}>
                    <Sider style={{background: colorBgContainer, overflow: 'auto', left: 0, top: 0, bottom: 0}} width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            items={items2}
                        />
                    </Sider>
                    <Content style={{padding: '0 24px',}}>
                        <CustomCodeBlock reqSql={"select * from dual;"} reqElapsedTime={100}/>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center',}}>
                <MainLayoutFooter/>
            </Footer>
        </Layout>
    </>);
}

export default SqlDiagnosticPage;