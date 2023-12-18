import React from 'react';
import {Layout} from 'antd';
import LayoutHeaderContent from "./LayoutHeaderContent";
import LayoutFooterContent from "./LayoutFooterContent";
import GitDiffAnalysis from "../GitDiffAnalysis-feature/GitDiffAnalysis";

const GitDiffAnalysisLayout: React.FC = () => {

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
                    <LayoutHeaderContent menuKey={"gitDiffAnalysis"}/>
                </Header>
                <Content style={{padding: '0 48px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{width: '80%'}}>
                        <GitDiffAnalysis/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center',}}>
                    <LayoutFooterContent/>
                </Footer>
            </Layout>
        </>
    );
};

export default GitDiffAnalysisLayout;