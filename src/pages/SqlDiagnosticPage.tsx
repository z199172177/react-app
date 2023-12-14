import React, {useState} from "react";
import {Button, Input, Layout, notification, Space, theme} from "antd";
import MainLayoutFooter from "./MainLayoutFooter";
import CustomCodeBlock from "../components/CustomCodeBlock";


const SqlDiagnosticPage: React.FC = () => {
    const {Header, Content, Footer} = Layout;
    const layoutCls: React.CSSProperties = {minHeight: "100vh",}; //样式
    const {token: {colorBgContainer}} = theme.useToken(); //样式
    const [api, contextHolder] = notification.useNotification();

    return (<>
        {contextHolder}
        <Layout style={layoutCls}>
            {/*<Header style={{paddingTop: "20px", background: colorBgContainer, height: 170}}>*/}
            {/*</Header>*/}
            <Content style={{margin: "10px 20px"}}>
                <CustomCodeBlock reqSql={""} reqElapsedTime={0}/>
            </Content>
            <Footer style={{textAlign: "center"}}>
                <MainLayoutFooter/>
            </Footer>
        </Layout>
    </>);
}

export default SqlDiagnosticPage;