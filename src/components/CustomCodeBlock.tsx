import React, {useState} from "react";
import {format} from 'sql-formatter'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import 'highlight.js/styles/zenburn.css'
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {prism} from "react-syntax-highlighter/dist/esm/styles/prism";
import {Button, message, Steps, theme, Typography} from "antd";
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import TextArea from "antd/es/input/TextArea";
import {sqlDiagnosticFetch} from "../api/chartApi";
import {SqlDiagnosticReq} from "../interface/interface";
import {useUpdateEffect} from "../utils/EffectUtils";
import Paragraph from "antd/lib/typography/Paragraph";


interface Props {
    reqSql: string;
    reqElapsedTime: number;
}

const CustomCodeBlock: React.FC<Props> = (props) => {
    const {reqSql, reqElapsedTime} = props;
    //对话提示框
    const [sqlCopyButtonText, setSqlCopyButtonText] = useState('Copy SQL');
    //SQL Copy按钮点击事件
    const sqlCopyBtnClick = (msg: string) => {
        setSqlCopyButtonText(msg);
    };

    //sql分析结果
    const defSqlDiagnosticResult = '点击**SQL分析**按钮，查询优化建议';
    const [sqlDiagnosticResult, setSqlDiagnosticResult] = useState(defSqlDiagnosticResult);
    //sql分析请求对象
    const [reqObject, setReqObject] = useState<SqlDiagnosticReq>({
        index: 0,
        sql: '',
        elapsedTime: 0,
        prompt: '',
        componentDisabled: null,
    });

    //sql分析请求
    useUpdateEffect(() => {
        sqlDiagnosticFetch(reqObject, setSqlDiagnosticResult);
    }, [reqObject]);

    //SQL分析按钮点击事件
    const [sqlDiagnosticBtnDisabledFlag, setSqlDiagnosticBtnDisabledFlag] = useState(false);
    const sqlDiagnosticBtnClick = () => {
        if (reqSql === undefined || reqSql === '' || reqElapsedTime === undefined || reqElapsedTime === 0) {
            return;
        }
        setSqlDiagnosticBtnDisabledFlag(true);
        setReqObject((pre)=>{return {...pre, index: 1, sql: reqSql, elapsedTime: reqElapsedTime, componentDisabled: setSqlDiagnosticBtnDisabledFlag};})
    }

    //SQL Explain 文本域数据对象、文本域onChange事件、SQL Explain按钮点击事件
    const [sqlExplainBtnDisabledFlag, setSqlExplainBtnDisabledFlag] = useState(false);
    const [sqlExplainTextAreaValue, setSqlExplainTextAreaValue] = useState();
    const handleSqlExplainTextAreaChange = (e: any) => {
        setSqlExplainTextAreaValue(e.target.value);
    };
    const sqlExplainDiagnosticBtnClick = () => {
        if (sqlExplainTextAreaValue === undefined || sqlExplainTextAreaValue === '') {
            return;
        }
        setSqlExplainBtnDisabledFlag(true);
        setReqObject((pre)=>{return {...pre, index: 2, sql: reqSql, elapsedTime: reqElapsedTime, prompt: sqlExplainTextAreaValue, componentDisabled:setSqlExplainBtnDisabledFlag};})
    }

    //表结构索引 文本域数据对象、文本域onChange事件、表结构索引提交按钮点击事件
    const [tableAndIndexBtnDisabledFlag, setTableAndIndexBtnDisabledFlag] = useState(false);
    const [tableAndIndexTextAreaValue, setTableAndIndexTextAreaValue] = useState();
    const handleTableAndIndexTextAreaChange = (e: any) => {
        setTableAndIndexTextAreaValue(e.target.value);
    };
    const tableAndIndexDiagnosticBtnClick = () => {
        if (tableAndIndexTextAreaValue === undefined || tableAndIndexTextAreaValue === '') {
            return;
        }
        setTableAndIndexBtnDisabledFlag(true);
        setReqObject((pre)=>{return {...pre, index: 3, sql: reqSql, elapsedTime: reqElapsedTime, prompt: tableAndIndexTextAreaValue, componentDisabled: setTableAndIndexBtnDisabledFlag};})
    }

    const steps = [
        {
            title: '提交SQL',
            content: <>
                <Typography>
                    <Paragraph>
                        <SyntaxHighlighter language="sql" style={prism}>
                            {format(reqSql)}
                        </SyntaxHighlighter>
                    </Paragraph>
                    <CopyToClipboard text={reqSql}>
                        <Button type="primary" style={{marginBottom: '10px'}} onClick={() => {sqlCopyBtnClick("Success！");}}>
                            {sqlCopyButtonText}
                        </Button>
                    </CopyToClipboard>
                    <Button type="primary" style={{marginBottom: '10px', marginLeft:'10px'}} loading={sqlDiagnosticBtnDisabledFlag} disabled={sqlDiagnosticBtnDisabledFlag} onClick={() => {sqlDiagnosticBtnClick()}}>
                        SQL分析
                    </Button>
                </Typography>
            </>,
        },
        {
            title: '提交SQL Explain',
            content:
                <>
                    <Typography>
                        <TextArea placeholder="请输入SQL Explain 结果" value={sqlExplainTextAreaValue} onChange={handleSqlExplainTextAreaChange} rows={10} style={{height: '100%', resize: 'none'}}/>
                        <Button type="primary" style={{marginBottom: '10px', marginTop: '10px'}} loading={sqlExplainBtnDisabledFlag} disabled={sqlExplainBtnDisabledFlag} onClick={() => {sqlExplainDiagnosticBtnClick()}}>
                            SQL分析
                        </Button>
                    </Typography>

                </>,
        },
        {
            title: '提交表结构',
            content:
                <>
                    <Typography>
                        <TextArea placeholder="请输入表创建语句、索引" value={tableAndIndexTextAreaValue} onChange={handleTableAndIndexTextAreaChange} rows={10} style={{height: '100%', resize: 'none'}}/>
                        <Button type="primary" style={{marginBottom: '10px', marginTop: '10px'}} loading={tableAndIndexBtnDisabledFlag} disabled={tableAndIndexBtnDisabledFlag} onClick={() => {tableAndIndexDiagnosticBtnClick()}}>
                            SQL分析
                        </Button>
                    </Typography>
                </>,
        },
    ];

    const {token} = theme.useToken();
    const [current, setCurrent] = useState(0);
    const next = () => {
        if (sqlDiagnosticResult === defSqlDiagnosticResult) {
            message.error("请先点击【SQL分析】按钮，再进行下一步操作")
            return;
        }
        if (current === 0) {
            setReqObject((pre)=>{
                return {...pre, index: 0};
            });
        } else if (current === 1) {
            setReqObject((pre)=>{
                return {...pre, index: 1, prompt: ''};
            });
        }else if (current === 2) {
            setReqObject((pre)=>{
                return {...pre, index: 2, prompt: ''};
            });
        }
        if (current === steps.length - 1) {
            return;
        }

        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({key: item.title, title: item.title}));
    const contentStyle: React.CSSProperties = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <>
            <Typography>
                <pre>
                     <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {sqlDiagnosticResult}
                    </ReactMarkdown>
                </pre>
            </Typography>

            <Steps current={current} items={items}/>
            <div style={contentStyle}>
                {steps[current].content}
            </div>

            <div style={{marginTop: 24}}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        下一步
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        完成
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                        上一步
                    </Button>
                )}
            </div>
        </>
    );
}

export default CustomCodeBlock;
