import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import OrderListComponent from '../../../components/OrderList'

import { getOrderListData, postComment } from '../../../fetch/user/orderlist'

import './style.less'

class OrderList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: []
    }
  }
  render() {
    return (
      <div className="order-list-container">
        <h2>您的订单</h2>
        {
          this.state.data.length
          ? <div>
            <OrderListComponent data={this.state.data} submitComment={this.submitComment.bind(this)} />
          </div>
          : ''
        }
      </div>
    )
  }

  componentDidMount() {
    // 获取订单信息
    const username = this.props.username
    if(username) {
      this.loadOrderList(username)
    }
  }

  loadOrderList(username) {
    const result = getOrderListData(username)
    result.then(res => {
      return res.json()
    }).then(json => {
      this.setState({
        data: json
      })
    })
  }

  // 提交评价
  submitComment(id, comment, callback) {
    const result = postComment(id, comment)
    result.then(res => {
      return res.json()
    }).then(json => {
      if(json.errno === 0) {
        // 已经评价，修改状态
        callback()
      }
    })
  }
}

export default OrderList