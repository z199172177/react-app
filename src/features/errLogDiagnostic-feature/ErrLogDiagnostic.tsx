import React, {useState} from 'react';
import {Button, message, Spin, Typography} from "antd";
import TextArea from "antd/es/input/TextArea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {ErrLogDiagnosticReq, SqlDiagnosticReq} from "../../interface/interface";
import {useUpdateEffect} from "../../utils/EffectUtils";
import {errLogDiagnosticFetch, sqlDiagnosticFetch} from "../../api/chartApi";

const ErrLogDiagnostic: React.FC = () => {
    const [logDiagnosticBtnDisabledFlag, setLogDiagnosticBtnDisabledFlag] = useState(false);
    const [errLogTextAreaValue, setErrLogTextAreaValue] = useState("");
    const handleErrLogTextAreaChange = (e: any) => {
        setErrLogTextAreaValue(e.target.value);
    };

    const errLogDiagnosticBtnClick = () => {
        if (errLogTextAreaValue === undefined || errLogTextAreaValue === '') {
            message.error("请输入异常日志内容。");
            return;
        }
        if (errLogTextAreaValue.length> 20000) {
            message.error("异常日志过多，内容长度不能超过20000个字符").then(r => {});
            return;
        }

        setLogDiagnosticBtnDisabledFlag(true);
        // setReqObject((pre)=>{return {...pre, index: 2, sql: reqSqlByEdit, elapsedTime: reqElapsedTimeByEdit, prompt: sqlExplainTextAreaValue, componentDisabled:setSqlExplainBtnDisabledFlag};})
    }

    //sql分析结果
    const defErrLogDiagnosticResult = '点击「日志分析」按钮，查询优化建议';
    const [errLogDiagnosticResult, setErrLogDiagnosticResult] = useState(defErrLogDiagnosticResult);
    //sql分析请求对象
    const [reqObject, setReqObject] = useState<ErrLogDiagnosticReq>({
        logs: "",
    });

    //日志分析请求
    useUpdateEffect(() => {
        errLogDiagnosticFetch(reqObject, setErrLogDiagnosticResult);
    }, [reqObject]);

    return (
        <>
            <Typography style={{margin: '14px 0'}}>
                 <pre>
                    <Spin tip="Loading" size="large" spinning={logDiagnosticBtnDisabledFlag}>
                         <ReactMarkdown rehypePlugins={[remarkGfm]}>
                            {errLogDiagnosticResult}
                        </ReactMarkdown>
                    </Spin>
                </pre>

                <TextArea placeholder="请输入您的异常日志，然后点击「日志分析」按钮查看结果。"
                          onChange={handleErrLogTextAreaChange} rows={20} style={{height: '100%', resize: 'none'}}/>
                <Button type="primary" style={{marginBottom: '10px', marginTop: '10px'}}
                        loading={logDiagnosticBtnDisabledFlag} disabled={logDiagnosticBtnDisabledFlag} onClick={() => {
                    errLogDiagnosticBtnClick()
                }}>
                    日志分析
                </Button>
            </Typography>
        </>
    );
};

export default ErrLogDiagnostic;