import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva'

class SelectCtrl extends Component {

    constructor() {
        super();

        this.state = {
            "showBd": false
        }
    }
    clickHandeler(t) {
        var temp ; 
        if(this.props.tagname == "里程" || this.props.tagname == "排量"){
            var scope = this.props.data.scope;
            for(var k in scope){
                if(t == k){
                    temp = scope[k]
                }
            }
        }else{
            temp = t;
        }
        
        this.props.addtag(this.props.tittle, temp, this.props.tagname, t)
    }


    render() {
        var _filter = this.props.filter.filter((item) => {
            return item.tagname == this.props.tagname;
        })[0];
        if (_filter) { var value = _filter.value;var words =  _filter.words}
        const showlist = () => {

            var Arr = [];
            //根据自己有多少length决定多少宽
            for (let i = 0; i < this.props.data.options.length / 6; i++) {
                var temp = [];
                let slice_arr = this.props.data.options.slice(i * 6, i * 6 + 6);
                for (let j = 0; j < slice_arr.length; j++) {
                    temp.push(<li key={j}><a href="javascript:void(0);"
                        className={classnames({ "cur": slice_arr[j] == words })}
                        onClick={() => { this.clickHandeler(slice_arr[j]) }}
                    >{slice_arr[j]}
                    </a>
                    </li>)
                }
                Arr.push(<ul key={i}>{temp}</ul>)
            }

            return Arr;
        }


        return (
            <div className="select_ctrl"
                onMouseEnter={() => { this.setState({ "showBd": !this.state.showBd }) }}
                onMouseLeave={() => { this.setState({ "showBd": false }) }}>
                <div
                    className={classnames({ "open": this.state.showBd, "ht": true })}>
                    {this.props.data.tittle}{" : "}{words}
                </div>
                <div className="bd" style={{
                    "display": this.state.showBd ? "block" : "none",
                    "width": Math.ceil(this.props.data.options.length / 6) * 100 + "px"
                }}>
                    {showlist()}
                </div>
            </div>
        )
    }
}
export default connect(
    ({ carpick }) => ({
        "filter": carpick.filter
    })

)(SelectCtrl)

