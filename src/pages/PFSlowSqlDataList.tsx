import React, {useEffect, useState} from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

import {Pagination, PaginationProps, Table, theme} from "antd";
import {ColumnsType} from "antd/es/table";

import {DefaultPageSize} from "../components/DefaultPageSize";
import {queryPFinderSlowSqlList} from "../api/service";
import {MyPartial, PFinderSlowSqlListReqParams, PFinderSlowSqlTableItem} from "../interface/interface";

const PFSlowSqlDataList: React.FC = () => {
    const [pageNum, setPageNum] = useState<number>(1); // 当前页码
    const [pageSize, setPageSize] = useState<number>(DefaultPageSize); // 每页条数
    const [dataSource, setDataSource] = useState<PFinderSlowSqlTableItem[]>(); // 列表数据
    const [totalNum, setTotalNum] = useState<number>(0); // 总条条数
    const [tableLoading, setTableLoading] = useState<boolean>(false); // 列表数据加载动画
    const {token: {colorBgContainer}} = theme.useToken(); //样式
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
        // {
        //     title:'id',
        //     dataIndex:'id',
        //     key:'id'
        // },
        // {
        //     title:'tranceId',
        //     dataIndex:'tranceId',
        //     key:'tranceId'
        // },
        {
            title:'应用',
            dataIndex:'appName',
            key:'appName',
            width:100
        },
        // {
        //     title:'platform',
        //     dataIndex:'platform',
        //     key:'platform'
        // },
        // {
        //     title:'component',
        //     dataIndex:'component',
        //     key:'component'
        // },
        {
            title:'耗时(ms)',
            dataIndex:'elapsedTime',
            key:'elapsedTime',
            width:100
        },
        // {
        //     title:'hasError',
        //     dataIndex:'hasError',
        //     key:'hasError'
        // },
        // {
        //     title:'operation',
        //     dataIndex:'operation',
        //     key:'operation'
        // },
        // {
        //     title:'protocol',
        //     dataIndex:'protocol',
        //     key:'protocol'
        // },
        // {
        //     title:'startTime',
        //     dataIndex:'startTime',
        //     key:'startTime'
        // },
        // {
        //     title:'dbName',
        //     dataIndex:'dbName',
        //     key:'dbName'
        // },
        // {
        //     title:'hostInfo',
        //     dataIndex:'hostInfo',
        //     key:'hostInfo'
        // },
        // {
        //     title:'method',
        //     dataIndex:'method',
        //     key:'method'
        // },
        // {
        //     title:'type',
        //     dataIndex:'type',
        //     key:'type'
        // },
        {
            title:'SQL',
            dataIndex:'sqlInfo',
            key:'sqlInfo',
            render: (text) => {

                return (
                    <>
                        <SyntaxHighlighter language="sql" style={prism}>
                            {text}
                        </SyntaxHighlighter>
                    </>
                );
            },
        },
        // {
        //     title:'userName',
        //     dataIndex:'userName',
        //     key:'userName'
        // },
        // {
        //     title:'fqon',
        //     dataIndex:'fqon',
        //     key:'fqon'
        // },
        // {
        //     title:'gmtCreate',
        //     dataIndex:'gmtCreate',
        //     key:'gmtCreate'
        // },
        // {
        //     title: ' gmtModified',
        //     dataIndex: ' gmtModified',
        //     key: ' gmtModified'
        // }
    ];

    // 获取表格数据
    const queryList = async (params?: MyPartial<PFinderSlowSqlListReqParams>) => {
        try {
            if (tableLoading) {
                return;
            }

            setTableLoading(true);
            const paramsInit: any = Object.assign({pageNum, pageSize}, params);
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
        queryList({pageNum: page, pageSize:size});
    };

    useEffect(() => {
        queryList();
    }, []);

    return (
       <>
           <div style={{paddingLeft: 24, paddingRight: 24, minHeight: "auto", background: colorBgContainer}}>
               <Table columns={columns}
                      dataSource={dataSource}
                      pagination={false}
                      loading={tableLoading}
                      rowKey={(record) => record.id}
                      sticky={{offsetHeader: 64}}
                      scroll={{x: 1500, y: 750}}/>
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
       </>
    );
};

export default PFSlowSqlDataList;