import React, {useEffect, useRef, useState} from "react";
import {Card, Modal, Pagination, PaginationProps, Table, Tag} from "antd";
import {MyPartial, PFinderListReqParams, PFinderSlowSqlListReqParams, PFinderTableItem} from "../interface/interface";
import {DefaultPageSize} from "../components/DefaultPageSize";
import {queryPFinderList} from "../api/service";
import PFSlowSqlDataList from "./PFSlowSqlDataList";

import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {FilterValue, SorterResult, TableCurrentDataSource} from 'antd/es/table/interface';

interface Props {
    queryParams: any;
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
}

const PFSimpleDataList: React.FC<Props> = (props) => {
    const [pageNum, setPageNum] = useState<number>(1); // 当前页码
    const [pageSize, setPageSize] = useState<number>(DefaultPageSize); // 每页条数
    const [dataSource, setDataSource] = useState<PFinderTableItem[]>(); // 列表数据
    const [totalNum, setTotalNum] = useState<number>(0); // 总条条数
    const [tableLoading, setTableLoading] = useState<boolean>(false); // 列表数据加载动画
    const [slowSqlListVisible, setSlowSqlListVisible] = useState<boolean>(false); // 是否显示导出弹窗
    const [slowSqlQueryParams, setSlowSqlQueryParams] = useState<MyPartial<PFinderSlowSqlListReqParams>>({}); //  当前查询参数
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const {queryParams} = props;

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

    // 切换分页或每页条数
    const handlerChangePage = (page: number, size: number) => {
        setPageNum(page);
        setPageSize(size);
        queryList({pageNum: page, pageSize: size});
    };

    // 获取表格数据
    const queryList = async (params?: MyPartial<PFinderListReqParams>) => {
        try {
            if (tableLoading) {
                return;
            }

            setTableLoading(true);
            const paramsInit: any = Object.assign({pageNum, pageSize}, queryParams, params);
            const resp: any = await queryPFinderList(paramsInit);
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

    const columns: ColumnsType<PFinderTableItem> = [
        {
            title: '应用名称',
            dataIndex: 'appName',
            key: 'appName',
            width: 150,
            render: (text, record) => {
                if (record.component === 'Mysql') {
                    return (
                        <a target="_blank" onClick={() => {
                            let jsonObj = {appName: text};
                            setSlowSqlQueryParams(jsonObj);
                            setSlowSqlListVisible(true);
                        }}>{text}</a>
                    );
                } else {
                    return (
                        <>{text}</>
                    );
                }
            }
        },
        {
            title: 'tranceId',
            dataIndex: 'tranceId',
            key: 'tranceId',
            width: 300,
            render: (text, record) => {
                if (record.component === 'Mysql') {
                    return (
                        <a target="_blank" onClick={() => {
                            let jsonObj = {tranceId: text};
                            setSlowSqlQueryParams(jsonObj);
                            setSlowSqlListVisible(true);
                        }}>{text}</a>
                    );
                } else {
                    return (
                        <>{text}</>
                    );
                }
            }
        },
        {
            title: '时间',
            dataIndex: 'startTimeStr',
            key: 'startTimeStr',
            sorter: true,
            width: 200

        },
        {
            title: 'ip',
            dataIndex: 'ip',
            key: 'ip',
            width: 160
        },
        {
            title: '调用链节点',
            dataIndex: 'method',
            key: 'method'
        },
        {
            title: '组件类型',
            dataIndex: 'component',
            key: 'component',
            width: 120
        },

        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            width: 80,
            render: (item) => {
                let color = item == 1 ? 'green' : 'red';
                return (
                    <>
                        <Tag color={color}>
                            {item == 1 ? "成功" : "失败"}
                        </Tag>
                    </>
                )
            }
        },
        {
            title: '耗时(ms)',
            dataIndex: 'elapsedTime',
            key: 'elapsedTime',
            sorter: true,
            width: 100
        },
        {
            title: '调用链详情',
            dataIndex: 'detailUrl',
            key: 'detailUrl',
            width: 130,
            align: "center",
            render: (text) => <a href={text} target="_blank">链接</a>,
        },
    ];

    useEffect(() => {
        queryList(queryParams);
    }, []);


    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<PFinderTableItem> | SorterResult<PFinderTableItem>[],
        extra: TableCurrentDataSource<any>
    ) => {
        const currentPagination = pagination as Required<TablePaginationConfig>;
        let letSortField = (sorter as SorterResult<PFinderTableItem>).field;
        let letSortOrder = (sorter as SorterResult<PFinderTableItem>).order;
        const params = {
            pageNum: currentPagination.current,
            pageSize: currentPagination.pageSize,
            sortField: isBlank(letSortField) ? "" : letSortField as string,
            sortOrder: isBlank(letSortOrder) ? "" : letSortOrder as string,
            ...filters,
        };
        console.log(params, 'params');
        queryList(params);
    };

    function isBlank(value: any) {
        return value === null || value == undefined || value === "";
    }

    return (
        <>
            <Card>
                <Table columns={columns}
                       dataSource={dataSource}
                       pagination={false}
                       loading={tableLoading}
                       rowKey={(record) => record.id}
                       sticky={{offsetHeader: 64}}
                       scroll={{x: 1500, y: 500}}
                       onChange={handleTableChange}
                />
            </Card>
            <Card>
                <Pagination defaultCurrent={pageNum}
                            defaultPageSize={pageSize}
                            current={pageNum}
                            total={totalNum}
                            showTitle={false}
                            itemRender={itemRender}
                            onChange={handlerChangePage}
                />
            </Card>
            {slowSqlListVisible ? (
                <Modal
                    title="慢SQL列表"
                    open={slowSqlListVisible}
                    wrapClassName="pFinder-slow-sql-modal"
                    closable={true}
                    width={1500}
                    onCancel={() => {
                        setSlowSqlListVisible(false);
                    }}
                    maskClosable={false}
                    footer={<></>}
                >
                    <PFSlowSqlDataList slowSqlQueryParams={slowSqlQueryParams}/>
                </Modal>
            ) : null}
        </>
    );
};

export default PFSimpleDataList;