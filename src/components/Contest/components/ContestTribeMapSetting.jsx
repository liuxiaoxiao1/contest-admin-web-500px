import React from 'react';
import PropTypes from 'prop-types'
import Styled from 'styled-components'
import { Input, Button, message, Modal } from 'antd'
import { autobind } from 'core-decorators'
import assign from 'object-assign'
import Loading from '../../../components/Loading/Loading_new'

import ContestStore from '../../../stores/contest-store'

import TribeApi from '../../../lib/Api/TribeApi'
import ContestApi from '../../../lib/Api/ContestApi'

import './ContestTribeMapSetting.scss'


import { useStrict } from 'mobx'
import { observer } from 'mobx-react'


const Search = Input.Search;
const confirm = Modal.confirm;


useStrict(true);




@observer
class ContestTribeMapSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            page: 0,
            size: 20,
            isSearch: false,
            searchKey: '',
            hasNext: true,
            loaded: false
        }
    }
    static propTypes = {

    }
    static defaultProps = {

    }
    componentDidMount () {

    }



    /**
     * 添加数据项
     */
    onChange(tribeId, e) {
        console.log(`${tribeId} = ${e.target.checked}`);
        //TODO: according to the value true or false， submit request



    }

    @autobind
    onSearch(value) {
        console.log(value);

        this.setState({
            items:[],
            page: 0,
            size: 20,
            isSearch: true,
            searchKey: value,
            hasNext: true,
            loaded: false
        })
        //this._loadSerchData();
    }


    _loadSerchData() {
        TribeApi.searchTribeByKey(++this.state.page, this.state.size, this.state.searchKey).then((resData) => {
            console.log('resData', resData);

            if(resData.data.status == '200') {
                let stateObj = {
                    loaded: true
                }

                if(resData.data.data.length) {
                    stateObj.hasNext = true;
                    stateObj.items = [...this.state.items, ...resData.data.data]
                }else {
                    stateObj.hasNext = false;
                }

                this.setState(stateObj);

            }else {
                message.error('网络错误，请稍后再试');
            }
        })
    }


    relateTribeAndContest(tribeId) {
        ContestApi.relatedTribeAndContest(ContestStore.curItem.id, tribeId).then((resData) => {
            console.log('resData', resData);

            if(resData.data.status == '200') {
                message.success('关联成功');
            }else {
                //错误信息 后台给的 可能不友好
                message.success(resData.data.message);
            }
        });
    }

    deleteTribeContest(tribeId) {
        confirm({
            title: '确认删除关联么?',
            content: '',
            cancelText: '我后悔了',
            okText: '删除',
            okType:'danger',
            onOk() {
                console.log('OK');
                ContestApi.deleteTribeContest(ContestStore.curItem.id, tribeId).then((resData) => {
                    console.log('resData', resData);

                    if(resData.data.status == '200') {
                        message.success('删除成功');
                    }else {
                        //错误信息 后台给的 可能不友好
                        message.success(resData.data.message);
                    }
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });


    }




    /**
     * load data when scrolling; 如果是搜索就要走搜索的API
     * @private
     */
    _loadData() {
        if(!this.state.isSearch) {
            TribeApi.getTribeList(++this.state.page, this.state.size).then((resData) => {
                console.log('resData', resData);

                if(resData.data.status == '200') {
                    let stateObj = {
                        loaded: true
                    }

                    if(resData.data.data.length) {
                        stateObj.hasNext = true;
                        stateObj.items = [...this.state.items, ...resData.data.data]
                    }else {
                        stateObj.hasNext = false;
                    }

                    this.setState(stateObj);

                }else {
                    message.error('网络错误，请稍后再试');
                }
            })
        }else {
            this._loadSerchData();
        }


    }


    render() {
       let me = this;

       const { items, loaded } = this.state;

        // if(!loaded) {
        //     return <Loading isJustUi={true}/>;
        // }



        return (

            <div className="content-present-prize">


                <div className="search-container">
                    <Search
                        placeholder="输入部落名称或id"
                        onSearch={me.onSearch}
                        style={{ width: '100%',marginBottom: '6px' }}
                    />
                </div>


                <div className="content-items-list">

                    {
                        items.length ? (
                            items.map((item, index) => {

                                console.log('item-id', index, item.id, item.name);

                                return (<div className="list-item" key={item.id}>
                                    <div className="item-name">{item.name}</div>
                                    <Button type="primary" ghost className={'present-btn'}
                                            onClick={this.relateTribeAndContest.bind(this, item.id)}>添加</Button>
                                    <Button type="danger" ghost
                                            onClick={this.deleteTribeContest.bind(this, item.id)}>移除</Button>
                                </div>)

                            })
                        ) : ''

                    }


                    {
                        this.state.hasNext ? (
                            <Loading {...{
                                winNode: '.content-items-list',
                                onClick: this._loadData.bind(this),
                                isShow: true
                            }}/>
                        ) : ''
                    }


                </div>


            </div>

        )
    }


}


export default ContestTribeMapSetting;