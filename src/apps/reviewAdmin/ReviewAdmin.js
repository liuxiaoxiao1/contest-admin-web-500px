/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import { BackTop, Pagination, Modal, message } from 'antd';
import Button from '../../components/ui/Button'
import EditTaskWin from '../../components/TaskEditForm'
import Loading from '../../components/Loading'
import ReviewAdminItem from './ReviewAdminItem'
import { useStrict } from 'mobx'
import { observer } from 'mobx-react'
import { Ajax } from '../../utils/utils'
import Util from '../../utils/web-utils'


import ReviewListAdminStore from '../../stores/reviewListAdmin'


useStrict(true)


@observer
class ReviewAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editTaskWinVisible: false,
            confirmLoading: false,
            items: [],
            loaded: false,
            isNew: true,
            hasFooter: true //评审任务有评委的时候，不允许编辑，编辑窗口底部按钮就没有了
        }
    }

    onPageChange(pageNumber) {
        console.log('pageNumber', pageNumber);
        ReviewListAdminStore.getList(pageNumber)
    }
    //编辑任务
    showEditTask() {
        //下面是通过mobx更改数据
        //User.addNum1()
        this.setState({
            editTaskWinVisible: true,
        });
    }
    _editTask = (curTask) => {
        //需要先把当前任务存储一下
        console.log('task' , curTask);
        if(Util.isEmptyObj(curTask)) {
            return '';
        }
        ReviewListAdminStore.overrideData(curTask);

        let _hasReviewer = false;

        //先判断一下是否设置了评委
        Ajax.get('/api/admin/reviewer', {
            review_task_id: curTask.id,
            page: 1,
            size: 16,
        }).then((resData) => {
            if (resData.data.length) {
                _hasReviewer = true;
            } else {
                _hasReviewer = false;
            }

            this.setState({
                isNew: false,
                hasFooter: !_hasReviewer
            })

            this.showEditTask();
        })



    }


    //新建任务
    newEditTask(curTask) {
        //初始化一下数据
        ReviewListAdminStore.initData()
        this.setState({
            hasFooter: true,
            isNew: true,
            editTaskWinVisible: true,
        });
    }
    handleCancel = () => {
        this.setState({
            editTaskWinVisible: false,
        });
    }
    confirmEdit = (e) => {
        console.log('this.refs.form', this.refs.form);
        console.log('this.refs.xxl', this.refs.xxl);
        //先取值再校验
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({
                    confirmLoading: true,
                });

                //再下发数据，先给当前的任务赋值

                // name: '',
                //     description: '',
                //     status: '',
                //     taskType: '',
                //     reviewTaskType: '',
                //     reviewItemLimit: '',
                //     reviewItemLimitReach: '',
                //     reviewSummary: '',

                let _curItem = {
                    name: values['task-name'],
                    description: values['task-desc'],
                    reviewTaskType: values['task-type'],
                    reviewItemLimit: values['task-select-work-number'],
                    reviewSummary: values['is-need-comment'],
                    reviewItemLimitReach: values['reviewItemLimitReach'] ? 1 : 0
                }

                ReviewListAdminStore.setData(_curItem);

                //执行更新操作
                if(ReviewListAdminStore.curItem.id) {
                    ReviewListAdminStore.editTask().then((resData) => {
                        console.log('Promise Data', resData);
                        if(resData.status == 422) {
                            this.setState({
                                confirmLoading: false,
                            });
                            message.error('输入有误');
                        }else {
                            this.setState({
                                editTaskWinVisible: false,
                                confirmLoading: false,
                            });
                            message.success('编辑成功');
                            ReviewListAdminStore.getList(ReviewListAdminStore.reviewLists.page);
                        }
                    })

                }else {
                    //执行新建操作
                    ReviewListAdminStore.newTask().then((resData) => {

                        console.log('Promise Data', resData);

                        if(resData.status == 422) {
                            this.setState({
                                confirmLoading: false,
                            });
                            message.error('输入有误');
                        }else {
                            this.setState({
                                editTaskWinVisible: false,
                                confirmLoading: false,
                            });
                            message.success('新建成功');
                            ReviewListAdminStore.getList(1);
                        }


                    });
                }

            }
        });

    }

    setData() {
        ReviewListAdminStore.setData()
    }

    componentDidMount() {
        ReviewListAdminStore.getList(1)
    }



    render() {
        //这里可以写各种组件内容

        const { editTaskWinVisible, confirmLoading, hasFooter, isNew } = this.state;

        const _modalProps = {
            title: isNew ? '新建任务' : '编辑任务',
            visible: editTaskWinVisible,
            closable: true,
            maskClosable: false,
            onCancel: this.handleCancel,
            onOk: this.confirmEdit,
            confirmLoading: confirmLoading,
            cancelText: "取消",
            okText: "确认",
            width: 600,
            destroyOnClose: true,
        }
        if(!hasFooter) {
            _modalProps.footer = null;
        }



        return (
            <div className="main-body review-admin-page">
                <BackTop />
                <Button {...{
                    classnames: 'button-add',
                    showString: '创建评审任务',
                    clickFunction: this.newEditTask.bind(this)
                }}></Button>
                <span className="clearfix"></span>
                <div className="main-content-container">
                    <div className="item-list-container">
                        {
                            ReviewListAdminStore.reviewLists.items.length ? (
                                    ReviewListAdminStore.reviewLists.items.map((item, index) => {
                                        return (
                                            <ReviewAdminItem {...{
                                                item: item,
                                                key: item.id,
                                                editTask: this._editTask.bind(this, item),
                                                store: ReviewListAdminStore
                                            }}/>
                                        )
                                    })
                                ) : ''
                        }
                        {
                            !ReviewListAdminStore.reviewLists.loaded ? (<Loading isJustUi={true}/>) : ''
                        }


                    </div>

                    <div className="pagination-container">
                        <Pagination className="ui-pagination-container"
                                    showQuickJumper
                                    current={ReviewListAdminStore.reviewLists.page}
                                    defaultCurrent={1}
                                    defaultPageSize={ReviewListAdminStore.reviewLists.size}
                                    total={ReviewListAdminStore.reviewLists.totalRecord}
                                    onChange={this.onPageChange}
                        />
                    </div>



                </div>

                <div>
                    <Modal
                        {..._modalProps}
                    >
                        <div className="main-content-wrapper">
                            <EditTaskWin ref="form" />
                        </div>
                    </Modal>
                </div>


            </div>
        );
    }
}

export default ReviewAdmin;
