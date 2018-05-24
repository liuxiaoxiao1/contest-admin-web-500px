/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import { Ajax } from '../../utils/utils'
import { autobind } from 'core-decorators'
import Loading from '../../components/Loading'
import { message } from 'antd'


class ReviewListMy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasNext: true,
            items:[],
            page: 0,
            size: 20
        }
    }
    _loadData () {
        //TODO: 取数据
        let me = this;
        Ajax.get('/api/review_task',
            {
                page: ++me.state.page,
                size: me.state.size
            }, true).then((resData) => {
            console.log('my list', resData);
            if(resData.data && resData.data.length) {
                let tempData = [...this.state.items, ...resData.data]
                this.setState({
                    items: tempData,
                    hasNext: true
                })
            }else {
                this.setState({
                    hasNext: false
                })
            }


        })

    }

    @autobind
    itemClick(item) {
        console.log('item.submittedAt', item.submittedAt);
        //this.props.history.push("/review/images/single/" + item.id);
        if(!item.submittedAt) {
            this.props.history.push("/review/images/single/" + item.reviewTaskId);
        }else {
            message.info('该任务已提交')
        }
    }

    render() {
        // 这里可以写各种组件内容
        let containerNode = '';
        const { items, hasNext } = this.state;
        let me = this;
        return (
            <div className="main-body review-list-my-page">
                <div className="page-title">
                    评审任务
                </div>
                <div className="grid-main-body">
                    <div className="grid-main-head">
                        <div className="head-cell">
                            序号
                        </div>
                        <div className="head-cell">
                            任务名称
                        </div>
                        <div className="head-cell">
                            下发时间
                        </div>
                        <div className="head-cell" style={{display: 'none'}}>
                            征集主题
                        </div>
                        <div className="head-cell">
                            任务类型
                        </div>
                        <div className="head-cell">
                            数量<br/>
                            入选/淘汰
                        </div>
                        <div className="head-cell">
                            完成进度
                        </div>
                        <div className="head-cell">
                            是否必须100%<br/>
                            才能提交
                        </div>
                        <div className="head-cell">
                            状态
                        </div>
                    </div>
                    <div className="grid-main-lists">
                        {
                           items.length ? (
                                   items.map((itemData, index) => {
                                       var item = itemData.reviewTask;
                                       return (
                                           <div className="list-item" key={item.id} onClick={me.itemClick.bind(me, itemData)}>
                                               <div className="row-cell">
                                                   {index+1}
                                               </div>
                                               <div className="row-cell">
                                                   {item.name}
                                               </div>
                                               <div className="row-cell">
                                                   {new Date(item.updatedAt).pattern("yyyy-MM-dd HH:mm:ss")}
                                               </div>
                                               <div className="row-cell" style={{display: 'none'}}>
                                                   {item.theme}
                                               </div>
                                               <div className="row-cell">
                                                   {item.reviewTaskType === 0 ? '入选':'淘汰'}
                                               </div>
                                               <div className="row-cell">
                                                   {item.reviewItemLimit}
                                               </div>
                                               <div className="row-cell">
                                                   {itemData.reviewItemProgress}/{item.reviewItemLimit}
                                               </div>
                                               <div className="row-cell">
                                                   {item.reviewItemLimitReach == 1 ? '是' : '否'}
                                               </div>
                                               <div className="row-cell state">
                                                   {itemData.submittedAt ? '已提交': '进行中'}
                                               </div>
                                               {/*<Link to={"/review/images/single/" + item.id} className="review-item-link"/>*/}

                                           </div>
                                       )
                                   })
                               ) : ''
                        }
                        {
                            this.state.hasNext ? (
                                    <Loading {...{
                                        winNode: '',
                                        onClick: this._loadData.bind(this),
                                        isShow: hasNext
                                    }}/>
                                ) : ''
                        }



                    </div>

                </div>
            </div>
        );
    }
}

export default ReviewListMy;
