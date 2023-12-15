import React, {useState} from 'react';
import {Menu, MenuProps} from 'antd';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

interface Props {
    menuKey:string
}
const LayoutHeaderContent: React.FC<Props> = (props) => {
    const {menuKey} = props;
    const [menuCurrentSelected] = useState(menuKey);

    const items: MenuProps['items'] = [
        {
            label: (<Link to="/PFViewer">PFViewer数据统计</Link>),
            key: 'PFViewer',
            icon: <AppstoreOutlined/>,
        },
        {
            label: (<Link to="/slowSqlDiagnostic">慢SQL分析</Link>),
            key: 'slowSqlDiagnostic',
            icon: <MailOutlined/>,
        },
        {
            label: (<Link to="/errLogDiagnostic">异常日志分析</Link>),
            key: 'errLogDiagnostic',
            icon: <SettingOutlined/>
        },
    ];

    return (
        <>
            <div className="demo-logo"/>
            <Menu
                theme="dark"
                mode="horizontal"
                items={items}
                selectedKeys={[menuCurrentSelected]}
                style={{flex: 1, minWidth: 0}}
            />
        </>

    );
};

export default LayoutHeaderContent;