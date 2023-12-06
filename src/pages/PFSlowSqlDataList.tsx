import React, {useEffect, useState} from "react";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {prism} from 'react-syntax-highlighter/dist/esm/styles/prism';

import {Modal, Pagination, PaginationProps, Space, Table, theme} from "antd";
import {ColumnsType} from "antd/es/table";

import {DefaultPageSize} from "../components/DefaultPageSize";
import {queryPFinderSlowSqlList} from "../api/service";
import {MyPartial, PFinderSlowSqlListReqParams, PFinderSlowSqlTableItem} from "../interface/interface";
import './PFSlowSqlDataList.css';
import CustomCodeBlock from "../components/CustomCodeBlock"; // 导入自定义样式文件


interface Props {
    slowSqlQueryParams: any;
}

const PFSlowSqlDataList: React.FC<Props> = (props) => {
    const [pageNum, setPageNum] = useState<number>(1); // 当前页码
    const [pageSize, setPageSize] = useState<number>(DefaultPageSize); // 每页条数
    const [dataSource, setDataSource] = useState<PFinderSlowSqlTableItem[]>(); // 列表数据
    const [totalNum, setTotalNum] = useState<number>(0); // 总条条数
    const [tableLoading, setTableLoading] = useState<boolean>(false); // 列表数据加载动画
    const {token: {colorBgContainer}} = theme.useToken(); //样式
    const {slowSqlQueryParams} = props;

    const [sqlFormatVisible, setSqlFormatVisible] = useState<boolean>(false); // sql格式化弹窗
    const [currentSelectedRecord, setCurrentSelectedRecord] = useState<any>(); // 当前选中的记录

    //分页
    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev') {
            return <a>Previous</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    };
    const columns: ColumnsType<PFinderSlowSqlTableItem> = [
        {
            title: '应用',
            dataIndex: 'appName',
            key: 'appName',
            width: 100
        },
        {
            title: '耗时(ms)',
            dataIndex: 'elapsedTime',
            key: 'elapsedTime',
            width: 100
        },
        {
            title: 'SQL',
            dataIndex: 'sqlInfo',
            key: 'sqlInfo',
            render: (text) => {
                return (
                    <>
                        <SyntaxHighlighter language="sql" style={prism}>
                            {text}
                        </SyntaxHighlighter>
                    </>
                );
            },
        }
    ];

    // 获取表格数据
    const queryList = async (params?: MyPartial<PFinderSlowSqlListReqParams>) => {
        try {
            if (tableLoading) {
                return;
            }

            setTableLoading(true);
            const paramsInit: any = Object.assign({pageNum, pageSize}, slowSqlQueryParams, params);
            const resp: any = await queryPFinderSlowSqlList(paramsInit);
            setTableLoading(false);
            if (resp && Array.isArray(resp.data.data.records)) {
                setDataSource(resp.data.data.records);
                setTotalNum(resp.data.data.total);
            }
        } catch (err) {
            setTableLoading(false);
            console.warn(err);
        }
    };

    // 切换分页或每页条数
    const handlerChangePage = (page: number, size: number) => {
        setPageNum(page);
        setPageSize(size);
        queryList({pageNum: page, pageSize: size});
    };

    const onRowClick = (record: any, index: any, event: any) => {
        //阻止默认事件
        event.stopPropagation();
        if (record === null || record === undefined || record === "") {
            return;
        }

        setCurrentSelectedRecord(record);
        setSqlFormatVisible(true);
    };

    useEffect(() => {
        queryList();
    }, []);

    return (
        <>
            <div style={{paddingLeft: 24, paddingRight: 24, minHeight: "auto", background: colorBgContainer}}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    loading={tableLoading}
                    rowKey={(record) => record.id}
                    sticky={{offsetHeader: 64}}
                    scroll={{x: 1500, y: 750}}
                    rowClassName="hand-pointer"
                    onRow={(record, rowKey) => {
                        return {
                            // record 指的当前行的数据内容，rowKey指的是当前行的下标
                            onClick: onRowClick.bind(this, record, rowKey)
                        };
                    }}

                />
            </div>
            <div style={{padding: 24, minHeight: "auto", background: colorBgContainer, textAlign: "center"}}>
                <Pagination defaultCurrent={pageNum}
                            defaultPageSize={pageSize}
                            current={pageNum}
                            total={totalNum}
                            showTitle={false}
                            itemRender={itemRender}
                            onChange={handlerChangePage}

                />
            </div>

            {/*格式化SQL弹窗*/}
            {sqlFormatVisible ? (
                <Modal
                    // title="数据格式化"
                    open={sqlFormatVisible}
                    wrapClassName="pFinder-setting-ds-modal"
                    closable={true}
                    width={1500}
                    onCancel={() => {
                        setSqlFormatVisible(false);
                    }}
                    maskClosable={false}
                    footer={<></>}
                >
                    <Space direction="vertical" size="large" style={{width: '100%'}}>
                        <CustomCodeBlock reqSql={currentSelectedRecord.sqlInfo} reqElapsedTime={currentSelectedRecord.elapsedTime}/>
                    </Space>
                </Modal>
            ) : null}
        </>
    );
};

export default PFSlowSqlDataList;