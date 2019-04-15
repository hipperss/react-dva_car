import React, { Component } from 'react';
import { connect } from 'dva'
//antd的组件
import { Tabs } from 'antd';
import classnames from 'classnames'
const TabPane = Tabs.TabPane;


class TabCtrl extends Component {
    constructor() {
        super();

        
    }
    clickHandeler(item1, item) {
        this.props.changeBrand(item1, item);
        this.props.addtag(this.props.tittle, item.name, this.props.tagname,item.name) 
      
    }
    render() {
        var _filter = this.props.filter.filter((item)=>{
            return item.tagname == this.props.tagname;
        })[0];
        
        if(_filter) {
            var value = _filter.value  
        }
        
        return (
            <div className="tab_ctrl_box">
                <Tabs defaultActiveKey="0">
                    {
                        Object.keys(this.props.data).map((item1, index) => {
                            return <TabPane tab={item1} key={index} >
                                {
                                    this.props.data[item1].map((item, index) => {
                                        return <a
                                            key={index}
                                            href="javascript:void(0);"
                                            className={classnames({ "cur": item.name == value })}
                                            onClick={() => { this.clickHandeler(item1, item) }}>
                                            {item.name}
                                        </a>
                                    })
                                }
                            </TabPane>
                        })
                    }
                </Tabs>

            </div>
        )
    }
}
export default connect(
    ({ carpick }) => ({
        "filter" : carpick.filter
    })
    
)(TabCtrl)


