import React, {useState} from "react";
import {format} from 'sql-formatter'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import 'highlight.js/styles/zenburn.css'
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {prism} from "react-syntax-highlighter/dist/esm/styles/prism";
import {Button, Typography} from "antd";

const {Paragraph} = Typography;

export default function CustomCodeBlock({code: code}: { code: string }) {
    //对话提示框
    const [buttonText, setButtonText] = useState('Copy');
    const handleClick = (msg: string) => {
        setButtonText(msg); // 更新按钮文本
    };

    return (
        <>
            <CopyToClipboard
                text={code}
                // onCopy={(text, result) => handleCopy(text, result)}
            >
                <Button type="primary" style={{marginBottom: '10px'}} onClick={() => {
                    handleClick("Success！");
                }}>{buttonText}</Button>

            </CopyToClipboard>

            <Paragraph>
                <SyntaxHighlighter language="sql" style={prism}>
                    {format(code)}
                </SyntaxHighlighter>
            </Paragraph>
        </>
    );
}
