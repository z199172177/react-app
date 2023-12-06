import React, {useState} from "react";
import {Button, Input, Layout, notification, Space, theme} from "antd";
import MainLayoutFooter from "./MainLayoutFooter";
import CustomCodeBlock from "../components/CustomCodeBlock";


const SqlDiagnosticPage: React.FC = () => {
    const {Header, Content, Footer} = Layout;
    const layoutCls: React.CSSProperties = {minHeight: "100vh",}; //样式
    const {token: {colorBgContainer}} = theme.useToken(); //样式
    const [api, contextHolder] = notification.useNotification();

    const [sql, setSql] = useState<string>("");
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    const [sqlInputValue, setSqlInputValue] = useState<string>("");
    const sqlInputChangeHandle = (value: any) => {
        setSqlInputValue(value);
    };

    const [elapsedTimeInputValue, setElapsedTimeInputValue] = useState<number>(0);
    const elapsedTimeInputChangeHandle = (value: any) => {
        setElapsedTimeInputValue(value);
    };

    const sqlDiagnosticSubmitBtnClickHandle = () => {
        setSql(sqlInputValue);
        setElapsedTime(elapsedTimeInputValue);
    };

    return (<>
        {contextHolder}
        <Layout style={layoutCls}>
            {/*<Header style={{paddingTop: "20px", background: colorBgContainer, height: 170}}>*/}
            {/*</Header>*/}
            <Content style={{margin: "10px 20px"}}>
                <Space.Compact style={{width: '85%'}}>
                    <Input type={"text"} placeholder="请填写你的SQL语句. 例如: select * from dual." onChange={(e) => {
                        sqlInputChangeHandle(e.target.value)
                    }}/>
                    <Input type={"number"} placeholder="请填写SQL执行时间(毫秒). 例如: 500" onChange={(e)=>{elapsedTimeInputChangeHandle(e.target.value)}} style={{width: '35%'}}/>
                    <Button type="primary" onClick={sqlDiagnosticSubmitBtnClickHandle}>提交</Button>
                </Space.Compact>

                <CustomCodeBlock reqSql={sql} reqElapsedTime={elapsedTime}/>
            </Content>
            <Footer style={{textAlign: "center"}}>
                <MainLayoutFooter/>
            </Footer>
        </Layout>
    </>);
}

export default SqlDiagnosticPage;