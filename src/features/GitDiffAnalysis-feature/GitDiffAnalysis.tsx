import React, {useState} from "react";
import {Button, message, Spin, Typography} from "antd";
import {GitDiffAnalysisReq} from "../../interface/interface";
import {useUpdateEffect} from "../../utils/EffectUtils";
import {gitDiffAnalysisFetch} from "../../api/chartApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TextArea from "antd/es/input/TextArea";

const GitDiffAnalysis: React.FC = () => {
    const [gitDiffAnalysisBtnDisabledFlag, setGitDiffAnalysisBtnDisabledFlag] = useState(false);
    const [gitDiffTextAreaValue, setGitDiffTextAreaValue] = useState("");
    const handleGitDiffTextAreaChange = (e: any) => {
        setGitDiffTextAreaValue(e.target.value);
    };

    const gitDiffAnalysisBtnClick = () => {
        if (gitDiffTextAreaValue === undefined || gitDiffTextAreaValue === '') {
            message.error("请输入Git Diff内容。");
            return;
        }
        if (gitDiffTextAreaValue.length> 20000) {
            message.error("日志内容过多，内容长度不能超过20000个字符").then(r => {});
            return;
        }

        setGitDiffAnalysisBtnDisabledFlag(true);
        setReqObject((pre) => {
            return {...pre, gitDiffContent: gitDiffTextAreaValue, componentDisabled: setGitDiffAnalysisBtnDisabledFlag}
        });
    }

    //sql分析结果
    const defGitDiffAnalysisResult = '点击「日志分析」按钮，查看结果';
    const [gitDiffAnalysisResult, setGitDiffAnalysisResult] = useState(defGitDiffAnalysisResult);
    //sql分析请求对象
    const [reqObject, setReqObject] = useState<GitDiffAnalysisReq>({
        gitDiffContent: "",
        componentDisabled: null,
    });

    //日志分析请求
    useUpdateEffect(() => {
        gitDiffAnalysisFetch(reqObject, setGitDiffAnalysisResult);
    }, [reqObject]);

    return (
        <>
            <Typography style={{margin: '14px 0'}}>
                 <pre>
                    <Spin tip="Loading" size="large" spinning={gitDiffAnalysisBtnDisabledFlag}>
                         <ReactMarkdown rehypePlugins={[remarkGfm]}>
                            {gitDiffAnalysisResult}
                        </ReactMarkdown>
                    </Spin>
                </pre>

                <TextArea placeholder="请输入您的Git Diff日志，然后点击「日志分析」按钮查看结果。" disabled={gitDiffAnalysisBtnDisabledFlag}
                          onChange={handleGitDiffTextAreaChange} rows={20} style={{height: '100%', resize: 'none'}}/>
                <Button type="primary" style={{marginBottom: '10px', marginTop: '10px'}}
                        loading={gitDiffAnalysisBtnDisabledFlag} disabled={gitDiffAnalysisBtnDisabledFlag}
                        onClick={() => {gitDiffAnalysisBtnClick()}}>
                    日志分析
                </Button>
            </Typography>
        </>
    );
};

export default GitDiffAnalysis;