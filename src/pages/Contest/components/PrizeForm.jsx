/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import {Form, Icon, Input, Button, Checkbox, Select, Radio} from 'antd';
import './Column.scss'
import {observable, useStrict} from 'mobx';
import {observer} from 'mobx-react';
import ContestEditStore from '../../../stores/contest-edit-store'
import UIButton from '../../../components/ui/Button'



const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const CheckboxGroup = Checkbox.Group;
const optionsCategory = [
    { label: '风光', value: '风光' },
    { label: '人物', value: '人物' },
    { label: '城市', value: '城市' },
    { label: '纪实', value: '纪实' },
    { label: '黑白', value: '黑白' },
];


const dateFormat = "YYYY-MM-DD HH:mm:ss";



useStrict(true)



@observer
class NormalEditForm extends React.Component {
    constructor(props) {
        super(props);
        console.log('zheshi', this.props);
        this.state = {
            fileList: [],
            inputValue: '', //new tag输入框
            inputVisible: false //tag输入框是否显示
        }
    }
    componentDidMount() {
        //先对后台返回的数据进行 格式化，格式化成数组，前端好处理
        ContestEditStore.formatPrizeData();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleClose = (removedTag) => {
        //const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(removedTag);
        //this.setState({ tags });
    }

    deltePrizeCate(cateIndex) {

    }


    addPrizeItem(index) {
        //TODO: 里面方法需要修改一下  在原有的数据里prizes 添加一个数据项
        ContestEditStore.addPrizeItem(index);
    }
    deletePrizeItem(cateKey, uuid) {
        //TODO: 里面方法需要修改一下
        ContestEditStore.deletePrizeItem(cateKey, uuid);
    }

    /**
     * 通过key来改变奖项分组的名字
     * @param key
     * @param event
     */
    onGroupNameChange(key, event) {
        console.log('key', key);
        console.log('event', event.target.value);

        ContestEditStore.updatePrizeCateName(key, event.target.value);
    }


    /**
     * 当获奖对象更改的时候
     * @param cateIndex
     * @param value
     * @private
     */
    _prizeTargetChange(cateIndex, value) {
        let realValue = '';

        console.log('cateIndex', cateIndex);
        console.log('value', value);

        if(value === 1) {
            realValue = 'prizeUser';

        }else if(value === 2) {
            realValue = 'prizeWorks';
        }

        ContestEditStore.changePrizeCategory(cateIndex, realValue);

    }

    /**
     * 根据奖项分组 以及 奖项索引更新
     * @param cateIndex  奖项分组索引
     * @param index  奖项索引
     * @param event  事件
     * @private
     */
    _onPrizeItemChange(cateIndex, index, event) {
        ContestEditStore.changePrizeItem(cateIndex, index, event.target.value);

    }

    /**
     * 删除奖项分类
     */
    onDeletePrizeCategory(cateIndex) {
        ContestEditStore.deletePrizeCategory(cateIndex);

    }




    render() {
        const { getFieldDecorator } = this.props.form;

        const prizeCategories = ContestEditStore.prizeItems;

        let me = this;

        console.log('prizeCategories prizeItems', prizeCategories);



        let mainEl = [];
        let itemIndex = 0;
        for(let i = 0,l = prizeCategories.length; i<l; i++) {

            let item = prizeCategories[i];
            let key = item.key;
            let targetKey = item.targetKey;
            let values = item.data;
            let prizeTarget = '';

            if(targetKey == 'prizeUser') {
                prizeTarget = 1;
            } else if(targetKey == 'prizeWorks') {
                prizeTarget = 2;
            }

            itemIndex = i + 1;

            mainEl.push(<div className="form-item-per clearfix" key={item.uuid}>

                <div className='action-delete-btn'>
                    <Icon className='icon-delete-cate' type="close" onClick={me.onDeletePrizeCategory.bind(me, i)}/>
                </div>


                <div className="content-per-title">
                    获奖分组{itemIndex}：
                </div>

                <FormItem label={(<span className="label-txt">名称<span className="label_note">（8字以内）</span></span>)} style={{float:'left'}}>
                    {getFieldDecorator(`groupName-${item.uuid}`, {
                        rules: [{required: true, message: '分组名称'}],
                        initialValue: values.groupName
                    })(
                        <Input placeholder="" onChange={this.onGroupNameChange.bind(this, i)}/>
                    )}
                </FormItem>


                <FormItem label={<span className="label-txt">获奖对象</span>} style={{float:'right'}}>
                    {getFieldDecorator(`target-${item.uuid}`, {
                        rules: [{required: true, message: '请选择作品类型'}],
                        initialValue: prizeTarget
                    })(
                        <Select
                            size={'default'}
                            style={{width: '360px'}}
                            placeholder="请选择"
                            onChange={this._prizeTargetChange.bind(this, i)}

                        >
                            <Option value={1}>摄影师</Option>
                            <Option value={2}>作品</Option>
                        </Select>
                    )}
                </FormItem>


                {
                    values.prizes.map(function (_item, _index) {
                        let itemEl = '';
                        let clsName = '';

                        if(_index === 0) {
                            itemEl = (<span className="label-txt">奖项</span>);
                        }else {
                            itemEl = (<span className="label-txt">奖项<span className="delete-tag"
                                                                          onClick={me.deletePrizeItem.bind(me, i, _item.uuid)}>删除</span></span>);
                            clsName = 'with-action-label';
                        }


                        return (<div key={`${_index}-${values.prizes.length}`} key={_item.uuid}>
                            <FormItem label={itemEl} style={{float:'left'}} className={clsName}>
                                {getFieldDecorator(`name-${i}-${_item.uuid}`, {
                                    rules: [{required: true, message: '请输入奖项名称'}],
                                    initialValue: _item.name
                                })(
                                    <Input placeholder="请输入奖项名称" onChange={me._onPrizeItemChange.bind(this, i, _index)}/>
                                )}
                            </FormItem>

                            <span className="clearfix"></span>
                        </div>)
                    })
                }



                <FormItem style={{float:'left'}}>
                    <UIButton {...{
                        style:{width: '130px'},
                        classnames: 'upload-host-logo',
                        showString: '添加更多奖项',
                        isNeedBgc: false,
                        clickFunction: this.addPrizeItem.bind(this, i)
                    }}></UIButton>
                </FormItem>




            </div>);
        }






        return (
            <Form layout={'vertical'} className="contest-edit-form"
                  id="components-form-contest-theme">


                {
                    mainEl
                }





            </Form>
        );
    }
}



const WrappedNormalEditForm = Form.create()(NormalEditForm);


export default WrappedNormalEditForm;
