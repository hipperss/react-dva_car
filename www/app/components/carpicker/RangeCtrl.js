import React, { Component } from 'react';
import { Row, Col ,Slider} from 'antd';
import { connect } from 'dva';
import classnames from 'classnames'

class RangeCtrl extends Component {
    constructor() {
        super();
        
    }
    clickHandeler(b, t,item,value) {
        this.props.addtag(this.props.tittle, [b, t], this.props.tagname, `${b}万-${t}万`);
    }
    

    render() {
        var _filter = this.props.filter.filter((item) => {
            return item.tagname == this.props.tagname;
        })[0];
        var value = [0,200];
        if (_filter) { 
            var value = _filter.value;
            var words = _filter.words;
            if(words == "0万-3万"){
                words = "3万以下"
            }
        }
        return (
            <div className="range_ctrl_box">
                <div className="examples">
                    {
                        this.props.data.example.map((item, index) => {
                            return <a
                                key={index}
                                href="javascript:void(0);"
                                className={classnames({"cur" : item.chinese == words})}
                                onClick={() => { this.clickHandeler(item.b, item.t,item,value) }}
                            >
                                {item.chinese}
                            </a>
                        })
                    }
                </div>
                <div className="slider">
                   <Row>
                       <Col span={14}>
                            <Slider 
                                range 
                                min={0} 
                                max={200}
                                value={value}
                                onChange={([b, t]) => { this.clickHandeler(b,t)}}
                            />
                       </Col>
                        <Col span={1}>
                           
                        </Col>
                        <Col span={9}>
                            {value[0]}  
                            ~
                            {value[1]}  
                        </Col>
                   </Row>
                </div>
               
            </div>
        )
    }
}
export default connect(
    ({ carpick }) => ({
        filter: carpick.filter
    })
)(RangeCtrl);
