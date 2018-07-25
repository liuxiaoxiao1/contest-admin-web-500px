/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import {Form, Icon, Input, Button, Checkbox, Select, Radio, InputNumber,
    Upload, message, Switch, Tag, Tooltip, DatePicker} from 'antd';
import moment from 'moment'
import './Column.scss'
import {observable, useStrict} from 'mobx';
import {observer} from 'mobx-react';
import ContestEditStore from '../../../stores/contest-edit-store'


const FormItem = Form.Item;
const Option = Select.Option;








useStrict(true)

//要展示的数据项从这里进行控制多余的不展示
const showColumn = [{
        key: 'introduction',
        showName: '活动简介'
    },
    {
        key: 'prizeWorks',
        showName: '获奖作品'
    },{
        key: 'prizeUser',
        showName: '获奖摄影师'
    }, {
        key: 'selectWorks',
        showName: '优秀作品'
    },{
        key: 'selectUser',
        showName: '优秀摄影师'
    },{
        key: 'allWorks',
        showName: '全部作品'
    },{
        key: 'allUser',
        showName: '参赛用户'
    },{
        key: 'myWorks',
        showName: '我的作品'
    }]



@observer
class NormalEditForm extends React.Component {
    constructor(props) {
        super(props);
        console.log('zheshi', this.props);
        this.state = {

        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }


    /**
     * 根据key来更改别名
     * @param inputKey
     * @param event
     */
    onAliasChange(inputKey, event) {
        console.log('event.target.value', event.target.value);
        ContestEditStore.updateAliasByKey(inputKey, event.target.value);
    }

    /**
     *
     * @param key  简介  获奖作品。。。
     * @param inputKey  阶段名： 预热展示 征集展示。。。
     * @param value  具体的设置项的值，Select
     */
    onSelectSettingChange(key, inputKey, value) {
        console.log('key', key);
        console.log('inputKey', inputKey);
        console.log('value', value);




        ContestEditStore.updateSelectSetting(key, inputKey, value);
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        const items = ContestEditStore.columnSetting;
        const defaultPage = ContestEditStore.defaultPage;

        let me = this;

        let mainEl = [];

        for(let i = 0,l = showColumn.length; i<l; i++) {
            let key = showColumn[i].key;
            let showName = items[key].displayName;
            let labelName = showColumn[i].showName;
            let item = items[key];
            let inputKey = key;

            mainEl.push(<div className="setting-row" key={key}>
                <div className="row__item">
                    {labelName}
                </div>
                <div className="row__item row__item_form">
                    <FormItem style={{width: '100%', height: '30px', margin: 'auto'}} >
                        {getFieldDecorator(inputKey + '-alias', {
                            rules: [{required: true, message: '请输入名称'}],
                            initialValue: showName
                        })(
                            <Input placeholder="" onChange={this.onAliasChange.bind(this, inputKey)}
                                   style={{height: '30px'}}/>
                        )}
                    </FormItem>
                </div>
                <div className="row__item">
                    {getFieldDecorator(inputKey + '-prepareShow', {
                        rules: [{required: true, message: '请选择'}],
                        initialValue: (defaultPage['101'] === key) ? 3: item.prepareShow,
                    })(
                        <Select
                            size={'default'}
                            style={{width: '100%'}}
                            placeholder="请选择"
                            onChange={this.onSelectSettingChange.bind(this, inputKey, 'prepareShow')}
                        >
                            <Option value={true}>是</Option>
                            <Option value={false}>否</Option>
                            <Option value={3}>是且默认</Option>
                        </Select>
                    )}

                </div>
                <div className="row__item">
                    {getFieldDecorator(inputKey + '-collectShow', {
                        rules: [{required: true, message: '请选择'}],
                        initialValue: (defaultPage['102'] === key) ? 3: item.collectShow,
                    })(
                        <Select
                            size={'default'}
                            style={{width: '100%'}}
                            placeholder="请选择"
                            onChange={this.onSelectSettingChange.bind(this, inputKey, 'collectShow')}
                        >
                            <Option value={true}>是</Option>
                            <Option value={false}>否</Option>
                            <Option value={3}>是且默认</Option>
                        </Select>
                    )}
                </div>
                <div className="row__item">
                    {getFieldDecorator(inputKey + '-reviewShow', {
                        rules: [{required: true, message: '请选择'}],
                        initialValue: (defaultPage['103'] === key) ? 3: item.reviewShow,
                    })(
                        <Select
                            size={'default'}
                            style={{width: '100%'}}
                            placeholder="请选择"
                            onChange={this.onSelectSettingChange.bind(this, inputKey, 'reviewShow')}
                        >
                            <Option value={true}>是</Option>
                            <Option value={false}>否</Option>
                            <Option value={3}>是且默认</Option>
                        </Select>
                    )}
                </div>
                <div className="row__item">
                    {getFieldDecorator(inputKey + '-publicityShow', {
                        rules: [{required: true, message: '请选择'}],
                        initialValue: (defaultPage['106'] === key) ? 3: item.publicityShow,
                    })(
                        <Select
                            size={'default'}
                            style={{width: '100%'}}
                            placeholder="请选择"
                            onChange={this.onSelectSettingChange.bind(this, inputKey, 'publicityShow')}
                        >
                            <Option value={true}>是</Option>
                            <Option value={false}>否</Option>
                            <Option value={3}>是且默认</Option>
                        </Select>
                    )}
                </div>
                <div className="row__item">
                    {getFieldDecorator(inputKey + '-finishShow', {
                        rules: [{required: true, message: '请选择'}],
                        initialValue: (defaultPage['104'] === key) ? 3: item.finishShow,
                    })(
                        <Select
                            size={'default'}
                            style={{width: '100%'}}
                            placeholder="请选择"
                            onChange={this.onSelectSettingChange.bind(this, inputKey, 'finishShow')}
                        >
                            <Option value={true}>是</Option>
                            <Option value={false}>否</Option>
                            <Option value={3}>是且默认</Option>
                        </Select>
                    )}
                </div>

            </div>)


        }






        return (
            <Form layout={'vertical'} className="contest-edit-form"
                  id="components-form-contest-theme">


                <div className="form-item-per clearfix">

                    <div className="setting-region">
                        <div className="setting-row row-head">
                            <div className="row__item">

                            </div>
                            <div className="row__item">
                                重命名
                            </div>
                            <div className="row__item">
                                预热中
                            </div>
                            <div className="row__item">
                                征集中
                            </div>
                            <div className="row__item">
                                评审中
                            </div>
                            <div className="row__item">
                                公示中
                            </div>
                            <div className="row__item">
                                已结束
                            </div>

                        </div>


                        {
                            mainEl
                        }



                    </div>



                </div>





            </Form>
        );
    }
}



const WrappedNormalEditForm = Form.create()(NormalEditForm);


export default WrappedNormalEditForm;
