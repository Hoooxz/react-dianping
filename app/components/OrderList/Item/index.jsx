import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Item extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      commentState: 2,  // 0-未评价 1-评价中 2-已评价
    }
  }
  render() {
    const data = this.props.data
    return (
      <div className="order-item-container">
        <div className="clear-fix order-item-container">
          <div className="order-item-img float-left">
            <img src={data.img}/>
          </div>
          <div className="order-item-comment float-right">
            {
              this.state.commentState === 0
              // 未评价
              ? <button className="btn" onClick={this.showComment.bind(this)}>未评价</button>
              :
                this.state.commentState === 1
                // 评价中
                ? ''
                // 已评价
                : <button className="btn unseleted-btn">已评价</button>
            }
          </div>
          <div className="order-item-content">
            <span>商户：{data.title}</span>
            <span>数量：{data.count}</span>
            <span>价格：￥{data.price}</span>
          </div>
        </div>
        {
          // “评价中”才会显示输入框
          this.state.commentState === 1
          ? <div className="comment-text-container">
            <textarea style={{width: '100%', height: '80px'}} className="comment-text" ref="commentText"></textarea>
            <button className="btn" onClick={this.subComment.bind(this)}>提交</button>
            &nbsp;
            <button className="btn unseleted-btn" onClick={this.hideComment.bind(this)}>取消</button>
          </div>
          : ''
        }
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      commentState: this.props.data.commentState
    })
  }

  // 显示评论框
  showComment() {
    this.setState({
      commentState: 1
    })
  }

  // 提交评论
  subComment() {
    const submitComment = this.props.submitComment
    const id = this.props.data.id
    const commentTextDom = this.refs.commentText
    const comment = commentTextDom.value.trim()
    if(!comment) {
      return
    }
    // 提交评论内容
    submitComment(id, comment, this.commentOk.bind(this))
  }

  commentOk() {
    // 已经评价，修改状态
    this.setState({
      commentState: 2
    })
  }

  // 取消评论
  hideComment() {
    this.setState({
      commentState: 0
    })
  }
}

export default Item