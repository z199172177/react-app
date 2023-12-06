import React from 'react';
import {Avatar} from 'antd';
const MainLayoutFooter: React.FC = () => {

    return (
        <>
            <div>
                <Avatar size={20} src={<img src="/ban.png" alt="avatar"/>}/>
                <span style={{color:'black'}}>京ICP备2023014120号</span>
            </div>
        </>

    );
};

export default MainLayoutFooter;