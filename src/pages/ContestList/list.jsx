/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import { BackTop, Pagination, Select} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import LocaleProvider from 'antd/lib/locale-provider';
import Button from '../../components/ui/Button'
import styled, { css } from 'styled-components'
import CommonSearchCmp from '../../components/ui/SearchInput/SearchInput'
import ContestItem from '../../components/Contest/indexCard'

import Loading from '../../components/Loading/Loading_new'
import ContestStore from '../../stores/contest-store'
import ContestEditStore from '../../stores/contest-edit-store'

import { autobind } from 'core-decorators'


import { useStrict } from 'mobx'
import { observer } from 'mobx-react'


import './list.scss'



useStrict(true)

const Option = Select.Option;


@observer
class ContestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        //TODO: 先初始化一下store里面的数据
        ContestStore.getList(1);

    }

    onPageChange(pageNumber) {
        ContestStore.getList(pageNumber);
    }
    handleCancel = () => {

    }






    onSearchChange() {

    }
    handleSelectChange(value) {
        console.log(`selected ${value}`);
    }

    @autobind
    newContest() {

        ContestEditStore.newContest();

        this.props.history.push('/contest');

    }



    render() {
        //这里可以写各种组件内容
        let me = this;

        const { items, loaded } = ContestStore.contestList;


        const StyledDiv = styled.div`
            display: flex;
            justify-content: center;
            margin-top: 30px;
            margin-bottom:25px;
            border-radius: 6px
        `

        const selectCommonCls = 'admin-select';


        console.log('loaded', loaded);

        if(!loaded) {
            return <Loading isJustUi={true}/>;
        }



        console.log('list--items', items);





        return (
            <div className="">
                <BackTop />
                <StyledDiv>
                    <Button {...{
                        classnames: 'button-add',
                        showString: '新建比赛',
                        clickFunction: me.newContest
                    }}></Button>
                </StyledDiv>



                <div className="main-content-container photo_grid_region_contest_v3">
                    <div className="quests_index_layout">
                        <div className="active_quests_list">
                            <div className="item-list-container active_quests_list__wrapper">
                                <div className="list-head" style={{display: 'none'}}>
                                    <div className="head__search clearfix">
                                        <CommonSearchCmp {...{
                                            placeHolder: '搜索作者昵称或者作者ID',
                                            onSearchClick: this.onSearchChange.bind(this),
                                            classObj: {
                                                'admin-search': true
                                            },
                                            iconPosition: 'right',
                                            inputStyle: {
                                                'borderRadius': '4px',
                                                'height': '46px',
                                                'width': '350px',
                                                'marginLeft': 0
                                            },
                                            //onSearchKeyChange: me._onSearchKeyChange,
                                            needSearchBtn: false
                                        }}/>

                                        <div className="clearfix"></div>

                                        <div className="select-region">
                                            <Select
                                                className={selectCommonCls}
                                                showSearch={false}
                                                size={'large'}
                                                style={{ width: 140 }}
                                                placeholder="类型"
                                                optionFilterProp="children"
                                                onChange={me.handleSelectChange}

                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <Option value="0">全部</Option>
                                                <Option value="1">公开</Option>
                                                <Option value="2">自助办赛</Option>
                                            </Select>

                                            <Select
                                                className={selectCommonCls}
                                                showSearch={false}
                                                size={'large'}
                                                style={{ width: 140 }}
                                                placeholder="级别"
                                                optionFilterProp="children"
                                                onChange={me.handleSelectChange}

                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <Option value="0">全部</Option>
                                                <Option value="1">大赛</Option>
                                                <Option value="2">活动</Option>
                                            </Select>

                                            <Select
                                                className={selectCommonCls}
                                                showSearch={false}
                                                size={'large'}
                                                style={{ width: 140 }}
                                                placeholder="选择阶段"
                                                optionFilterProp="children"
                                                onChange={me.handleSelectChange}

                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <Option value="0">阶段</Option>
                                                <Option value="1">阶段</Option>
                                                <Option value="2">阶段</Option>
                                            </Select>
                                            <Select
                                                className={selectCommonCls}
                                                showSearch={false}
                                                size={'large'}
                                                style={{ width: 140 }}
                                                placeholder="当前状态"
                                                optionFilterProp="children"
                                                onChange={me.handleSelectChange}

                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <Option value="0">全部</Option>
                                                <Option value="1">预热中</Option>
                                                <Option value="2">征集中</Option>
                                                <Option value="3">评审中</Option>
                                                <Option value="4">已公示</Option>
                                            </Select>
                                            <Select
                                                className={selectCommonCls}
                                                showSearch={false}
                                                size={'large'}
                                                style={{ width: 140 }}
                                                placeholder="是否列表显示"
                                                optionFilterProp="children"
                                                onChange={me.handleSelectChange}

                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <Option value="0">是</Option>
                                                <Option value="1">否</Option>
                                            </Select>
                                            <Select
                                                className={selectCommonCls}
                                                showSearch={false}
                                                size={'large'}
                                                style={{ width: 140 }}
                                                placeholder="是否冻结"
                                                optionFilterProp="children"
                                                onChange={me.handleSelectChange}

                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <Option value="0">是</Option>
                                                <Option value="1">否</Option>
                                            </Select>





                                        </div>


                                    </div>
                                </div>


                                <div className="list-main active_quests_list__region">
                                    {
                                        items.length ? items.map(function(item, index) {


                                            return <ContestItem {...{
                                                key: item.id,
                                                item: item,
                                                isAdmin: true
                                            }}/>

                                        }): ''
                                    }





                                </div>



                            </div>

                            <div className="pagination-container">
                                <Pagination className="ui-pagination-container"
                                            showQuickJumper
                                            current={1}
                                            defaultCurrent={1}
                                            defaultPageSize={20}
                                            total={items.totalRecord}
                                            onChange={this.onPageChange}
                                />
                            </div>
                        </div>
                    </div>






                </div>




            </div>
        );
    }
}

export default ContestList;
