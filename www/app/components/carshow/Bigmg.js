import React, { Component } from 'react';
import { connect } from 'dva';

class Bigimg extends Component {
    constructor() {
        super();
    }
    componentWillReceiveProps(nextProps){
        //让图片消失，去掉src
        $(this.refs.bigimg).attr("src", "");
        
        var { color, album, idx } = nextProps.position;
        const imgarr = nextProps.imgarr;
        if(!nextProps.directory){
            return ;
        }
        const directory = nextProps.directory;
        const nexturl = `/carimages/${directory}/${color}/${album}/${imgarr[idx]}`;
        const images = nextProps.images;
        
        var Img = new Image();
        Img.src= nexturl;

        var self = this;
        $(Img).bind("load",function(){
            $(self.refs.bigimg).attr("src",nexturl);
        })

    }
    render() {
        
        return (
            <div className="bigimgwrap" >
                <div className="inner">
                    <img className="bigimg"  alt="" ref="bigimg"/>
                    <div className="leftBtn" onClick={this.props.prevPic}></div>
                    <div className="rightBtn" onClick={this.props.goNext}></div>
                </div>

            </div>
        )
    }
}
export default connect(
    ({ carshow: { images, position,directory } }) => ({
        imgarr: (() => {
            if (images[position.color]) {
                return images[position.color][position.album];
            }
            return [];
        })(),
        position,
        images,
        directory
    })
    ,
    (dispatch)=>({
        prevPic(){
            dispatch({"type" :"carshow/goprev"})
        },
        goNext(){
            dispatch({"type" :"carshow/gonext"})
        }
    })
)(Bigimg);
