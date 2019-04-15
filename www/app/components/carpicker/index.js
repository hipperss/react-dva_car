import React from 'react';
import { connect } from "dva";


import TabCtrl from './TabCtrl';
import AListCtrl from './AListCtrl';
import RangeCtrl from './RangeCtrl';
import SelectCtrl from './SelectCtrl';
import Tags from './Tags';
import MyTable from './MyTable';


class CarPicker extends React.Component {
      constructor({ fetchinit }) {
            super();

            //拉取默认数据
            fetchinit();
            this.state = {
                  "carbrand": {
                        "A": [{ "name": "奥迪", "series": ["A6L", "A4L", "Q5", "A3", "Q3", "Q7", "A8", "A7", "A5", "A1"] }],
                        "B": [{ "name": "本田", "series": ["雅阁", "CR-V", "XR-V", "奥德赛", "缤智", "飞度", "艾力绅", "思域", "凌派", "杰德"] },
                        { "name": "别克", "series": ["GL8", "君越", "英朗", "君威", "昂科威", "凯越", "昂科拉", "威朗", "昂科雷", "GL6"] },
                        { "name": "宝马", "series": ["5系", "3系", "X1", "X3", "X5", "1系", "X4", "7系", "2系旅行车", "3系GT"] }],
                        "C": [{ "name": "长安", "series": ["逸动", "CS75", "CS35", "悦翔V7", "奔奔EV", "CS15", "CX20", "悦翔V3", "CS95", "睿骋"] },
                        { "name": "长城", "series": ["C30", "M4", "C50", "风骏5", "M2", "C20R", "C30EV", "大脚兽", "迪尔", "风骏3"] }],
                        "D": [{ "name": "大众", "series": ["帕萨特", "朗逸", "POLO", "高尔夫", "途观", "迈腾", "速腾", "凌渡", "宝来", "捷达"] }],
                        "F": [{ "name": "丰田", "series": ["凯美瑞", "卡罗拉", "雷凌", "RAV4", "汉兰达", "皇冠", "威驰", "普拉多", "锐志", "致炫"] },
                        { "name": "福特", "series": ["福克斯", "蒙迪欧", "翼虎", "福睿斯", "锐界", "翼搏", "嘉年华", "Mustang", "金牛座", "探险者"] }],
                        "J": [{ "name": "吉利", "series": ["帝豪", "博越", "博瑞", "远景", "帝豪GS", "远景SUV", "帝豪GL", "金刚", "GX7", "豪情SUV"] }],
                        "M": [{ "name": "马自达", "series": ["Axela昂克赛拉", "阿特兹", "马自达6", "CX-5", "CX-4", "星骋", "CX-7", "睿翼", "马自达5", "马自达3"] }],
                        "Q": [{ "name": "奇瑞", "series": ["瑞虎3", "瑞虎5", "风云2", "艾瑞泽5", "E3", "艾瑞泽7", "瑞虎7", "艾瑞泽3", "瑞虎3x", "瑞虎"] }],
                        "R": [{ "name": "日产", "series": ["轩逸", "天籁", "LANNIA", "蓝鸟", "奇骏", "逍客", "骐达", "阳光", "楼兰", "贵士", "骊威"] },
                        { "name": "荣威", "series": ["350", "360", "RX5", "i6", "550", "W5", "950", "750", "Ei5", "E50"] }]
                  },
                  "classic": {
                        "name": "奥迪",
                        "series": ["A6L", "A4L", "Q5", "A3", "Q3", "Q7", "A8", "A7", "A5", "A1"]
                  },
                  "price": {
                        "example": [
                              {
                                    "chinese": "3万以下",
                                    "b": 0,
                                    "t": 3
                              },
                              {
                                    "chinese": "3万-5万",
                                    "b": 3,
                                    "t": 5
                              },
                              {
                                    "chinese": "5万-8万",
                                    "b": 5,
                                    "t": 8
                              },
                              {
                                    "chinese": "8万-10万",
                                    "b": 8,
                                    "t": 10
                              },
                              {
                                    "chinese": "10万-15万",
                                    "b": 10,
                                    "t": 15
                              },
                              {
                                    "chinese": "15万-20万",
                                    "b": 15,
                                    "t": 20
                              },
                              {
                                    "chinese": "20万-30万",
                                    "b": 20,
                                    "t": 30
                              },
                              {
                                    "chinese": "30万-40万",
                                    "b": 30,
                                    "t": 40
                              }
                        ],

                        "min": 0,
                        "max": 100
                  },
                  "carType": {
                        "tittle": "车型",
                        "options": ["SUV", "三厢轿车", "两厢轿车", "MPV", "跑车", "面包车", "皮卡"]
                  },
                  "mileage": {
                        "tittle": "里程",
                        "options": ["3万公里以内", "3-5万公里", "5-8万公里", "8万公里以上"],
                        "scope": {
                              "3万公里以内": [0, 3],
                              "3-5万公里": [3, 5],
                              "5-8万公里": [5, 8],
                              "8万公里以上": [8, 20]
                        }
                  },
                  "displacement": {
                        "tittle": "排量",
                        "options": ["1.6L以内", "1.6L-2.0L", "2.0L-2.5L", "2.5L-3.0L", "3.0L-3.5L", "3.5L-4.0L", "4.0L以上"],
                        "scope": {
                              "1.6L以内": [0, 1.6],
                              "1.6L-2.0L": [1.6, 2.0],
                              "2.0L-2.5L": [2.0, 2.5],
                              "2.5L-3.0L": [2.5, 3.0],
                              "3.0L-3.5L": [3.0, 3.5],
                              "3.5L-4.0L": [3.5, 4.0],
                              "4.0L以上": [4.0, 7.0]
                        }

                  },
                  "emission_standard": {
                        "tittle": "排放标准",
                        "options": ["国一", "国二", "国三", "国四", "国五"]
                  },
                  "color": {
                        "tittle": "颜色",
                        "options": ["白色", "橙色", "黄色", "黑色", "红色", "银色", "绿色", "蓝色", "棕色", "金色", "灰色"]
                  },
                  "gearbox": {
                        "tittle": "变速箱",
                        "options": ["手动", "自动"]
                  },
                  "seat": {
                        "tittle": "座位数",
                        "options": ["2座", "4座", "5座", "7座"]
                  },
                  "fuel_type": {
                        "tittle": "燃料类型",
                        "options": ["汽油", "柴油", "纯电动", "油电混合"]
                  }
            }

      }

      //父亲通天，将数据通过函数传给儿子
      addTag(tittle, value, tagname, words) {
            this.props.addtag(tittle, value, tagname, words)
      }


      //改变品牌
      changeBrand(key, carbrand) {
            //改变自己的state
            this.setState({
                  ...this.state,
                  "classic": this.state.carbrand[key].filter((item) => {
                        return item.name == carbrand.name;
                  })[0]
            })

      }

      render() {

            return <div>
                  <div className="ant-table" >
                        <div className="ant-table-body">
                              <table>
                                    <tbody className="ant-table-tbody">
                                          <tr className="ant-table-row">
                                                <td className="td_h">
                                                      品牌
                                                 </td>
                                                <td>
                                                      <TabCtrl
                                                            data={this.state.carbrand}
                                                            changeBrand={this.changeBrand.bind(this)}
                                                            tagname="品牌"
                                                            tittle="carbrand"
                                                            addtag={this.addTag.bind(this)}

                                                      >
                                                      </TabCtrl>
                                                </td>
                                          </tr>
                                          <tr className="ant-table-row">
                                                <td className="td_h">
                                                      车系
                                                </td>
                                                <td>
                                                      <AListCtrl
                                                            data={this.state.classic}
                                                            tagname="车系"
                                                            tittle="series"
                                                            addtag={this.addTag.bind(this)}></AListCtrl>
                                                </td>
                                          </tr>
                                          <tr className="ant-table-row">
                                                <td className="td_h">
                                                      价格
                                                </td>
                                                <td>
                                                      <RangeCtrl
                                                            data={this.state.price}
                                                            tagname="价格"
                                                            tittle="price"
                                                            addtag={this.addTag.bind(this)}
                                                      ></RangeCtrl>
                                                </td>
                                          </tr>
                                          <tr className="ant-table-row">
                                                <td className="td_h">
                                                      其他
                                                </td>
                                                <td>
                                                      <SelectCtrl data={this.state.carType} tagname="车型" tittle="carType" addtag={this.addTag.bind(this)}></SelectCtrl>
                                                      {" "}
                                                      <SelectCtrl data={this.state.mileage} tagname="里程" tittle="mileage" addtag={this.addTag.bind(this)}></SelectCtrl>
                                                      {" "}
                                                      <SelectCtrl data={this.state.displacement} tagname="排量" tittle="displacement" addtag={this.addTag.bind(this)}></SelectCtrl>
                                                      {" "}
                                                      <SelectCtrl data={this.state.emission_standard} tagname="排放标准" tittle="emission_standard" addtag={this.addTag.bind(this)}></SelectCtrl>
                                                      {" "}
                                                      <SelectCtrl data={this.state.color} tagname="颜色" tittle="color" addtag={this.addTag.bind(this)}></SelectCtrl>
                                                      {" "}
                                                      <SelectCtrl data={this.state.gearbox} tagname="变速箱" tittle="gearbox" addtag={this.addTag.bind(this)}></SelectCtrl>
                                                      {" "}
                                                      <SelectCtrl data={this.state.seat} tagname="座位数" tittle="seat" addtag={this.addTag.bind(this)}></SelectCtrl>
                                                      {" "}
                                                      <SelectCtrl data={this.state.fuel_type} tagname="燃料类型" tittle="fuel_type" addtag={this.addTag.bind(this)}></SelectCtrl>

                                                </td>
                                          </tr>
                                          <tr className="ant-table-row">
                                                <td className="td_h">
                                                      已选
                                                </td>
                                                <td>
                                                      <Tags></Tags>
                                                </td>
                                          </tr>
                                    </tbody>
                              </table>
                        </div>
                  </div>

                  <div className="cl"></div>

                  <MyTable
                        changeXuanfu={this.props.changeXuanfu}
                        changeContent={this.props.changeContent}
                  ></MyTable>
            </div>
      }
}

export default connect(
      ({ carpick }) => ({
            "filter": carpick.filter
      }),
      (dispatch) => ({
            addtag(tittle, value, tagname, words) {
                  dispatch({ "type": "carpick/addtag", tittle, value, tagname, words })
            },
            fetchinit() {
                  dispatch({ "type": "carpick/fetchInit" })
            }
      })
)(CarPicker);

