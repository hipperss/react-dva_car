import React, { Component } from 'react';
import { connect } from 'dva';
import classnames from 'classnames'

class Picker extends Component {
    constructor({images,positio,changeAlbum}){
        super();
    }

    changeAlbums(){
        var o = {
            "view" : "外观",
            "center" : "内饰",
            "detail" : "细节"
        }
        var  albumObj = this.props.images[this.props.position.color];
        if(albumObj){
            var arr = [];
            var count = 0;
            for(let k in o){
                if(albumObj.hasOwnProperty(k)){
                    arr.push(<li
                        key={count++}
                        className={classnames({"cur" : this.props.position.album == k})}
                        onClick={()=>{this.props.changeAlbum(k)}}
                    >
                        {o[k]}({albumObj[k].length})
                    </li>)
                }
            }
            return arr;
        }
        return null;
       
    }
    render() {
        const colors = Object.keys(this.props.images);
        const curcolor = this.props.position.color
        return (
            <div className="picker">

                <ul className="album">
                   {this.changeAlbums()}
                </ul>
                <div className="cl"></div>
                <ul className="color">
                    {
                        colors.map((item,index)=>{
                            return <li
                                key={index}
                                style={{"backgroundColor" : item}}
                                className={classnames({"cur" : curcolor == item})}
                                onClick={()=>{this.props.changeColor(item)}}
                            ></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default connect(
    ({carshow})=>({
        "images" : carshow.images,
        "position" : carshow.position
    }),
    (dispatch)=>({
        changeAlbum(album){
            dispatch({"type" : "carshow/changealbum",album})
        },
        changeColor(color){
            dispatch({"type" : "carshow/changecolor",color})
        }
    })
)(Picker);