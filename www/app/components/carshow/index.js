import React from 'react';
import { connect } from "dva";

import Picker from "./Picker";
import PicNav from "./PicNav";
import Bigmg from "./Bigmg";



class CarShow extends React.Component{
    constructor(props){
        super();
        
    }

    render(){
        const {color , album , idx } = this.props.position;
        const images = this.props.images;
    
        return <div className="albumWraper">
            
            <Bigmg ></Bigmg>
            <div className="cl"></div>
            <div className="rightPart">
                <div className="titlebox">
                    <h1>{this.props.brand}-{this.props.seriename}</h1>
                    <h3>2017年新款 {this.props.engine+"T"}</h3>
                </div>
               
                <div className="cl"></div>
                <Picker></Picker>
                <div className="cl"></div>
                <PicNav ></PicNav>

            </div>
            
        </div>
    }
}

export default connect(
    ({carshow})=>({
        images: (() => {
            //如果已经init了，此时就返回当前颜色、当前图集的img数组
            if (carshow.images[carshow.position.color]) {
                return carshow.images[carshow.position.color][carshow.position.album];
            }
            return [];
        })() ,
        position: carshow.position
    })
    ,
    (dispatch)=>({
        goNext(){
            dispatch({"type":"carshow/gonext"});
        }
    })
)(CarShow);