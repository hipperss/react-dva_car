import React, { Component } from 'react';
import { connect } from 'dva';
import { Table } from "antd";

class MyTable extends Component {
    constructor(){
        super();
    }



    changeHandeler(pagination,  filters, sorter){
        this.props.changePage(pagination.current, pagination.pageSize,  sorter.field,sorter.order)
    }

    clickHandeler(record,a){
        this.props.changeXuanfu(true);
        this.props.changeDir(record.directory);
        this.props.changeColor(record.color);
        
        this.props.changeContent(record.brand,record.series_name,record.engine)
    }

    render() {
        
        //定义列名
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                "sorter": true
            },
            {
                "title": "图片",
                dataIndex: 'image',
                key: 'image',
                "render": (a, record, c) => {
                    return <a onClick={()=>{this.clickHandeler(record,a)}}>
                        <img src={`/carimages/${record.directory}/${record.color}/view/${a}`} width="70"/>
                    </a>
                    
                }
            },
            {
                title: '品牌',
                dataIndex: 'brand',
                key: 'brand'
            },
            {
                title: '车系',
                dataIndex: 'series_name',
                key: 'series_name'
            },
            {
                title: '颜色',
                dataIndex: 'colorChinese',
                key: 'colorChinese'
            },
            {
                title: '发动机',
                dataIndex: 'engine',
                key: 'engine',
                "sorter": true
            },
            {
                title: '已经行驶（万公里）',
                dataIndex: 'km',
                key: 'km',
                "sorter": true
            },
            {
                title: '排放标准',
                dataIndex: 'paifang',
                key: 'paifang'
            },
            {
                title: '价格（万元）',
                dataIndex: 'price',
                key: 'price',
                "sorter": true
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type'
            },
            {
                title: '变速箱',
                dataIndex: 'biansuxiang',
                key: 'biansuxiang'
            },
            {
                title: '车主',
                dataIndex: 'saler',
                key: 'saler'
            },
            {
                title: '燃料类型',
                dataIndex: 'ranliao',
                key: 'ranliao'
            }
        ];
        return (
            <div>
                <h3><b>共{this.props.amount}个车符合要求</b></h3>
                <Table
                    rowKey="id"
                    dataSource={this.props.results}
                    columns={columns}
                    pagination={{
                        "current" : this.props.page,
                        "pageSize" : this.props.pagesize,
                        "total" : this.props.amount,
                        "pageSizeOptions": ["10", "20", "30", "40", "100"],
                        "showSizeChanger": true
                    }}
                    onChange={(pagination,  filters,sorter)=>{this.changeHandeler(pagination,   filters,sorter)}}
                ></Table>
            </div>
        )
    }
}

export default connect(
    ({ carpick }) => ({
        "results": carpick.results,
        "amount": carpick.amount,
        "page": carpick.page,
        "pagesize": carpick.pagesize
    }),
    (dispatch)=>({
        changePage(page,pagesize, field, order){
            dispatch({"type" :"carpick/changepage",page,pagesize, field, order})
        },
        changeColor(color){
            dispatch({"type" : "carshow/changecolor",color})
        },
        changeDir(directory){
            dispatch({"type" : "carshow/init_async",directory})
        }
    })
)(MyTable);
