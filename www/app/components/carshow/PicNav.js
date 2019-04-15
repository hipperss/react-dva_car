import React, { Component } from 'react';
import { connect } from 'dva';
import classnames from 'classnames'

class PicNav extends Component {
    constructor({ imgArr }) {
        super();
        this.state = {
            "curPage": NaN
        }
    }

    showPanels() {
        const length = this.props.imgArr.length;
        const { color, album, idx } = this.props.position;
        if(!this.props.directory){
            return ;
        }
        const directory = this.props.directory;
        var ARR = [];

        for (let i = 0; i < Math.ceil(length / 6); i++) {
            ARR.push(
                <ul key={i}>
                    {
                        this.props.imgArr.slice(i * 6, i * 6 + 6).map((item, index) => {
                            return <li key={index} className={classnames({ "cur": idx == i * 6 + index })} onClick={() => { this.props.changeIdx(i * 6 + index) }}><img src={`/carimages/${directory}/${color}/${album}/${item}`} alt="" /></li>
                        })
                    }
                </ul>
            );
        }
        return ARR;

    }
    componentDidMount() {
        var self = this;
        //采用事件委托的方式，给翻页条（蓝色块）添加监听
        $(this.refs.ol).delegate("li","mouseenter",function(){
            //点击那个蓝色块，哪个块块加cur，其他去cur
            $(this).addClass("cur").siblings().removeClass("cur");
            //拉动unit火车进行移动
            $(self.refs.unit).stop(true).animate({ "left": -290 * $(this).data("pagenumber")},400);
        });

        //当鼠标离开本组件的时候，回滚
        $(this.refs.picnav).bind("mouseleave",function(){
            var page = Math.floor(self.props.position.idx / 6);
            //拉动火车
            $(self.refs.unit).stop(true).animate({ "left": -290 * page }, 400);
            //点击那个蓝色块，哪个块块加cur，其他去cur
            $(self.refs.ol).find("li").eq(page).addClass("cur").siblings().removeClass("cur");
        });
    }
    //组件收到新的props的时候（全局store改变的时候）
    componentWillUpdate(nextProps) {
        //计算改变之后的page值
        var page = Math.floor(nextProps.position.idx / 6);
        //哪个块块加cur，其他去cur
        $(this.refs.ol).find("li").eq(page).addClass("cur").siblings().removeClass("cur");
        //拉动火车
        $(this.refs.unit).stop(true).animate({ "left": -290 * page}, 400);
    }

    render() {
        const pageAmount = Math.ceil(this.props.imgArr.length / 6);
        const curPage = Math.floor(this.props.position.idx / 6);
        return (
            <div className="picNav" >
                <div className="unit" ref="unit" style={{ "left": curPage * -290 + "px" }} >
                    {this.showPanels()}
                </div>
                <div className="cl"></div>
                <ol ref="ol">
                    {

                        pageAmount > 1
                            ?
                            new Array(pageAmount).fill("").map((item, index) => {
                                return <li
                                    key={index}
                                    style={{ "width": 100 / pageAmount + "%" }}
                                    className={classnames({ "cur": curPage == index })}
                                    data-pagenumber={index}
                                ></li>
                            })
                            :
                            null
                    }
                </ol>
            </div>
        )
    }
}
export default connect(
    ({ carshow: { images, position ,directory} }) => ({
        imgArr: (() => {
            if (images[position.color]) {
                return images[position.color][position.album]
            }
            return [];
        })()
        ,
        position,
        directory
    })
    ,
    (dispatch) => ({
        changeIdx(idx) {
            dispatch({ "type": "carshow/changeidx", idx })
        }
    })
)(PicNav);
