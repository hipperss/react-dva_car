import React, { Component } from 'react';

import CarPicker from './components/carpicker'
import CarShow from './components/carshow'
import CloseBtn from "./ui-components/CloseBtn";

import "./styles/carpicker_less.less";
import "./styles/carshow_less.less";
import "./styles/less.less";


export default class App extends Component {
    constructor() {
        super();

        this.state = {
            "showxuanfu": false,
            "brand": "",
            "seriename": "",
            "engine": ""
        }
    }

    changeXuanfu(boolean) {
        this.setState({
            "showxuanfu": boolean
        })
    }
    changeContent(brand, seriename, engine) {
        this.setState({
            brand,
            seriename,
            engine
        })
    }

    render() {
        return (
            <div>
                <CarPicker
                    changeXuanfu={this.changeXuanfu.bind(this)}
                    changeContent={this.changeContent.bind(this)}
                ></CarPicker>
                <div className="xuanfu" style={{ "display": this.state.showxuanfu ? "block" : "none" }}>
                    <div className="cover"></div>
                    <div className="inner" >
                        <CloseBtn onClick={() => { this.changeXuanfu(false) }}>×</CloseBtn>
                        <CarShow
                            brand={this.state.brand}
                            seriename={this.state.seriename}
                            engine={this.state.engine}
                        ></CarShow>
                    </div>
                </div>
            </div>
        )
    }
}
