import React from 'react';
import {Layout} from 'antd';
import CustomCodeBlock from "../../pages/CustomCodeBlock";
import LayoutHeaderContent from "./LayoutHeaderContent";
import LayoutFooterContent from "./LayoutFooterContent";

const SqlDiagnosticLayout: React.FC = () => {

    const {Header, Content, Footer} = Layout;

    return (
        <>
            <Layout>
                <Header style={{
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    position: 'sticky',
                    alignItems: 'center'
                }}>
                    <LayoutHeaderContent menuKey={"slowSqlDiagnostic"}/>
                </Header>
                <Content style={{padding: '0 48px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{width: '80%'}}>
                        <CustomCodeBlock reqSql={"select * from dual;"} reqElapsedTime={100}/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center',}}>
                    <LayoutFooterContent/>
                </Footer>
            </Layout>
        </>
    );
};

export default SqlDiagnosticLayout;