import React, { Component } from 'react';
import { connect } from 'dva'
import { Tag } from 'antd';


class Tags extends Component {
  render() {
    
    return (
      <div className="Tags_ctrl">
        {
          this.props.filter.map((item, index) => {
            return <Tag key={index} closable onClose={(e) => { e.preventDefault();this.props.deltag(item.tagname) }}>{item.tagname}：{item.words}</Tag>
          })
        }
      </div>
    )
  }
}

export default connect(
  ({ carpick }) => ({
    "filter": carpick.filter
  }),
  (dispatch) => ({
    deltag(tagname) {
      dispatch({ "type": "carpick/deltag", tagname })
    }
  })
)(Tags)
