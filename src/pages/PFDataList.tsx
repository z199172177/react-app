import React, {useEffect, useRef, useState} from "react";
import {
    Table,
    Layout,
    theme,
    PaginationProps,
    Pagination,
    Modal,
    Tag,
    Button,
    Input,
    Space,
    notification
} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import type {NotificationPlacement} from 'antd/es/notification/interface';
import {DefaultPageSize} from "../components/DefaultPageSize";
import {MyPartial, PFinderFilterForm, PFinderListReqParams, PFinderTableItem} from "../interface/interface";
import {queryPFinderList} from "../api/service";
import env from "../components/env";
import PFDataSearchFrom from "./PFDataSearchFrom";
import PFDataCharts from "./PFDataCharts";
import PFSlowSqlDataList from "./PFSlowSqlDataList";
import PFProjectView from "./PFProjectView";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const PFDataList: React.FC = () => {
    const [pageNum, setPageNum] = useState<number>(1); // 当前页码
    const [pageSize, setPageSize] = useState<number>(DefaultPageSize); // 每页条数
    const [dataSource, setDataSource] = useState<PFinderTableItem[]>(); // 列表数据
    const [totalNum, setTotalNum] = useState<number>(0); // 总条条数
    const [tableLoading, setTableLoading] = useState<boolean>(false); // 列表数据加载动画
    const [queryParams, setQueryParams] = useState<MyPartial<PFinderListReqParams>>({}); //  当前查询参数
    const filterForm: any = useRef(null); // 表单组件
    const {Header, Content, Footer} = Layout; //布局
    const {token: {colorBgContainer}} = theme.useToken(); //样式
    const layoutCls: React.CSSProperties = {minHeight: "100vh",}; //样式
    const [dataChartsVisible, setDataChartsVisible] = useState<boolean>(false); // 是否显示导出弹窗
    const [allProjectDataChartsVisible, setAllProjectDataChartsVisible] = useState<boolean>(false); // 是否显示导出弹窗
    const [slowSqlListVisible, setSlowSqlListVisible] = useState<boolean>(false); // 是否显示导出弹窗
    const [settingDsVisible, setSettingDsVisible] = useState<boolean>(false); // 是否显示导出弹窗
    const [dsInputValue, setDsInputValue] = useState('');
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

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement, type: NotificationType, message: string) => {
        api[type]({
            message: message,
            // description: message,
            placement: placement,
        });
    };

    const columns: ColumnsType<PFinderTableItem> = [
        // {
        //     title: 'Id',
        //     dataIndex: 'id',
        //     key: 'id'
        // },
        {
            title: '应用名称',
            dataIndex: 'appName',
            key: 'appName',
            width: 150
        },
        {
            title: 'tranceId',
            dataIndex: 'tranceId',
            key: 'tranceId',
            width: 300
        },
        {
            title: '时间',
            dataIndex: 'startTimeStr',
            key: 'startTimeStr',
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

    // 初始化查询参数
    const initQueryParams = () => {
        const timeParams = {};
        const formData: PFinderFilterForm = filterForm ? filterForm.current.getFormValue() : {};
        const [startTimeBegin, startTimeEnd] = formData.startTime ?? [];
        if (startTimeBegin && startTimeEnd) {
            Object.assign(timeParams, {
                startTimeBegin,
                startTimeEnd,
                startTime: undefined,
            });
        }
        const paramsInit = Object.assign(formData, timeParams);
        setQueryParams(paramsInit);
        return paramsInit;
    };

    // 获取表格数据
    const queryList = async (params?: MyPartial<PFinderListReqParams>, isQuery = false) => {
        try {
            if (tableLoading) {
                return;
            }
            setTableLoading(true);
            const defaultParams = isQuery ? initQueryParams() : queryParams;
            const paramsInit: any = Object.assign({pageNum, pageSize}, defaultParams, params);
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

    // 切换分页或每页条数
    const handlerChangePage = (page: number, size: number) => {
        setPageNum(page);
        setPageSize(size);
        queryList({pageNum: page, pageSize: size});
    };

    // 表单查询
    const handleFormQuery = () => {
        setPageNum(1);
        queryList({pageNum: 1}, true);
    };

    // 表单重置
    const handleFormReset = () => {
        setPageNum(1);
        setPageSize(DefaultPageSize);
        if (filterForm) {
            filterForm.current.resetFormValue();
        }
        queryList({pageNum: 1, pageSize: DefaultPageSize}, true);
    };

    useEffect(() => {
        queryList();
    }, []);

    return (
        <>
            {contextHolder}
            <Layout style={layoutCls}>
                <Header style={{paddingTop: "20px", background: colorBgContainer, height: 170}}>
                    <PFDataSearchFrom ref={filterForm}
                                      formQuery={handleFormQuery} formReset={handleFormReset}
                                      setDataChartsVisible={setDataChartsVisible}
                                      setSlowSqlListVisible={setSlowSqlListVisible}
                                      setSettingDsVisible={setSettingDsVisible}
                                      setAllProjectDataChartsVisible={setAllProjectDataChartsVisible}
                    />
                </Header>
                <Content style={{margin: "0 0"}}>
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
                    {dataChartsVisible ? (
                        <Modal
                            title="统计图"
                            open={dataChartsVisible}
                            wrapClassName="pFinder-data-chart-modal"
                            closable={true}
                            width={1000}
                            onCancel={() => {
                                setDataChartsVisible(false);
                            }}
                            maskClosable={false}
                            footer={<></>}
                        >

                            <PFDataCharts queryParams={queryParams} setAllProjectDataChartsVisible={setAllProjectDataChartsVisible}/>
                        </Modal>
                    ) : null}

                    {allProjectDataChartsVisible ? (
                        <Modal
                            title="项目数据统计"
                            open={allProjectDataChartsVisible}
                            wrapClassName="pFinder-allProject-data-chart-modal"
                            closable={true}
                            width={1000}
                            onCancel={() => {
                                setAllProjectDataChartsVisible(false);
                            }}
                            maskClosable={false}
                            footer={<></>}
                        >

                            <PFProjectView/>
                        </Modal>
                    ) : null}

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
                            <PFSlowSqlDataList/>
                        </Modal>
                    ) : null}

                    {settingDsVisible ? (
                        <Modal
                            title="配置数据源"
                            open={settingDsVisible}
                            wrapClassName="pFinder-setting-ds-modal"
                            closable={true}
                            width={500}
                            onCancel={() => {
                                setSettingDsVisible(false);
                            }}
                            maskClosable={false}
                            footer={<></>}
                        >
                            <Space direction="vertical" size="large" style={{width: '100%'}}>
                                <Space.Compact style={{width: '100%'}}>
                                    <Input defaultValue={env.apiUrl} onChange={(e) => setDsInputValue(e.target.value)}/>
                                    <Button type="primary" onClick={() => {
                                        env.apiUrl = dsInputValue;
                                        window.localStorage.setItem('apiUrl', dsInputValue);
                                        openNotification('top', "success", '设置成功');
                                    }}>Submit</Button>
                                </Space.Compact>
                            </Space>
                        </Modal>
                    ) : null}
                </Content>
                {/*<Footer style={{textAlign: "center"}}>*/}
                {/*</Footer>*/}
            </Layout>
        </>
    );
};

export default PFDataList;