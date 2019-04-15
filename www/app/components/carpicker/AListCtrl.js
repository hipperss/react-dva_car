import React, { Component } from 'react';
import { Row, Col } from 'antd'

import classnames from 'classnames';
import {connect} from 'dva'

class AListCtrl extends Component {
    constructor(){
        super();
        
    }

    clickHandeler(value){
        
        this.props.addtag(this.props.tittle, value, this.props.tagname,value )
    }
    render() {
        var _filter = this.props.filter.filter((item)=>{
            return item.tagname == this.props.tagname;
        })[0];
        
        if(_filter) {var value = _filter.value}
        return (
            <div>
                <div className="a_list_ctrl">

                    <Row>
                        <Col span={22}>

                            {
                                this.props.data.series.map((item, index) => {
                                    return <a
                                        key={index}
                                        href="javascript:void(0);"
                                        className={classnames({cur : item == value})}
                                        onClick={()=>{this.clickHandeler(item)}}
                                        >
                                        {item}
                                        
                                        </a>
                                })
                            }
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default connect(
    ({carpick})=>({
        "filter" : carpick.filter
    })
)(AListCtrl)
