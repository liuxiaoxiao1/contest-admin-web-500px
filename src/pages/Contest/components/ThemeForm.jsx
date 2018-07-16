/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import {Form, Icon, Input, Checkbox, Select, Radio,
    Upload, message, Tag, Tooltip, Button} from 'antd';

import './ThemeForm.scss'
import {useStrict} from 'mobx';
import {observer} from 'mobx-react';
import ContestEditStore from '../../../stores/contest-edit-store'
import UIButton from '../../../components/ui/Button'
import assign from 'object-assign'
import { TYPE_PHOTO, TYPE_GROUP_PHOTO } from './const'


const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const CheckboxGroup = Checkbox.Group;



const dateFormat = "YYYY-MM-DD HH:mm:ss";



useStrict(true)

//默认分类
const defaultCategory = ["未分类", "抽象", "动物", "黑白", "名人", "城市", "商业", "音乐", "生活", "时尚", "胶片", "艺术", "美食",
    "纪实", "自然", "微距", "人物", "表演", "运动", "静物", "交通", "旅行", "水下", "婚礼", "建筑", "风光", "街拍", "航拍", "夜景"]

const children = [];
for (let i = 0,l = defaultCategory.length; i < l; i++) {
    children.push(<Option key={defaultCategory[i]} value={defaultCategory[i]}>{defaultCategory[i]}</Option>);
}



//上传按钮通用属性
const commonUploadProps = {
    name: 'loadFile',
    //走组件的自动化上传
    action: '/community/v2/upload/photo',
    headers: {
        authorization: 'authorization-jpg',
    },
    accept: '.jpg, .jpeg', //支持上传文件格式
    beforeUpload: (file) => {
        //限定一下文件大小20M
        const isLt20M = file.size / 1024 / 1024 < 20;
        if (!isLt20M) {
            message.error('上传文件大小要小于20M');
            return '';
        }
        return true;
    },

    onChange(info) {
        console.log('info', info);
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }

    },
};




const _onUploadChange = (themeIndex, info) => {

    if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
    }
    if(info.file.status === 'removed') {
        ContestEditStore.setThemeKeyValue(themeIndex, 'coverUrl', '');
    }

    if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
        let coverUrl = info.file.response.data.lookUrl.baseUrl;

        ContestEditStore.setThemeKeyValue(themeIndex, 'coverUrl', coverUrl);

    } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
    }
}





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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleTaskTypeChange = (val) => {
        //let curValue = e.target.value;
        //ContestEditStore.setTaskType(val)
    }

    onCategoryChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }
    handleClose = (removedTag) => {
        //const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(removedTag);
        //this.setState({ tags });
    }

    /**
     * 标签显示处理
     */
    showInput = (themeIndex) => {
        this.setState({ inputVisible: true }, () => this.refs[`saveInputRef-${themeIndex}`].focus());
    }
    /**
     * 设置标签的值
     * @param e
     */
    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = (themeIndex) => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = ContestEditStore.themes[themeIndex].tags ?  ContestEditStore.themes[themeIndex].tags.split(',') : [];
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
            ContestEditStore.setContestThemeTags(themeIndex, tags.join(','));
        }
        console.log(tags);
        this.setState({
            // tags,
            inputVisible: false,
            inputValue: '',
        });
    }


    /**
     * 根据主题的索引删除相应的主题信息
     * @param themeIndex  主题id
     * @private
     */
    _deleteTheme(themeIndex) {
        ContestEditStore.deleteTheme(themeIndex);
    }


    /**
     * 根据主题索引和附加信息索引 删除
     * @param themeIndex
     * @param keyIndex
     * @private
     */
    _deleteExtroInfoByIndex(themeIndex, keyIndex) {
        ContestEditStore.deleteUploadInfo(themeIndex, keyIndex);
    }

    /**
     * 添加附加信息
     * @param themeIndex
     * @private
     */
    _addExtroInfoByIndex(themeIndex) {
        ContestEditStore.addUploadInfo(themeIndex);
    }


    /**
     *
     * @param themeIndex
     * @private
     */
    _deleteExampleUrlByIndex(themeIndex) {
        ContestEditStore.deleteExampleUrlByIndex(themeIndex);
    }


    /**
     * 监听表单项的变动，自动填写表单数据
     * @param themeIndex  主题索引
     * @param key 更改的字段的key
     * @param type 表单项类型（为了取值使用）是input 还是select
     * @param eventOrValue 肯能是事件 也可能是值 取决于formItem的类型
     * @returns {string}
     * @private
     */
    _onThemeDataItemChange(themeIndex, key, type, eventOrValue) {
        let value = '';
        if(type == 'input') {
            value = eventOrValue.target.value;
        }else if(type == 'select') {
            value = eventOrValue;
        }

        if(key == 'workCategory') {
            let photo = false;
            let groupPhoto = false;
            //let graphic = false;

            if(!!~value.indexOf(TYPE_PHOTO)) {
                photo = true;
            }
            if(!!~value.indexOf(TYPE_GROUP_PHOTO)) {
                groupPhoto = true;
            }

            ContestEditStore.setThemeKeyValue(themeIndex, 'photo', photo);
            ContestEditStore.setThemeKeyValue(themeIndex, 'groupPhoto', groupPhoto);
            return '';
        }

        console.log('themeIndex', themeIndex);
        console.log('key', key);
        console.log('value', value);


        ContestEditStore.setThemeKeyValue(themeIndex, key, value)
    }


    /**
     * 监听额外的上传表单项的变动，自动填写表单数据
     * @param themeIndex  主题索引
     * @param infoIndex 额外信息的key
     * @param key 更改的字段的key
     * @param type 表单项类型（为了取值使用）是input 还是select
     * @param eventOrValue 肯能是事件 也可能是值 取决于formItem的类型
     * @returns {string}
     * @private
     */
    _onThemeExtroInfoItemChange(themeIndex, infoIndex, key, type, eventOrValue) {
        let value = '';
        if(type == 'input') {
            value = eventOrValue.target.value;
        }else if(type == 'select') {
            value = eventOrValue;
        }


        console.log('themeIndex', themeIndex);
        console.log('key', key);
        console.log('value', value);

        ContestEditStore.setThemeExtroInfoKeyValue(themeIndex, infoIndex, key, value)
    }






    render() {
        const { getFieldDecorator } = this.props.form;

        const { inputVisible, inputValue } = this.state;

        const themes = ContestEditStore.themes;



        let me = this;

        const props = {
            name: 'file',
            //action: '/api/admin/review_task',
            headers: {
                authorization: 'authorization-xlsx',
            },
            accept: '.jpg, .jpeg', //支持上传文件格式
            beforeUpload: (file) => {
                //限定一下文件大小20M
                const isLt20M = file.size / 1024 / 1024 < 20;
                if (!isLt20M) {
                    message.error('上传文件大小要小于20M');
                    return '';
                }

                let curItem = assign(ContestEditStore.curItem, {file: file})
                ContestEditStore.setData(curItem);
                this.setState({
                    fileList: [file]
                })
                console.log('ContestEditStore.curItem', ContestEditStore.curItem);
                return '';
            },
            customRequest: function (data) {

            },
            // fileList: this.state.fileList,
            // data: {
            //     name: '评审任务',
            //     status: 0,
            //     reviewTaskType: 0,
            //     reviewItemLimit: 100,
            //     reviewItemLimitReach: 50,
            //     reviewSummary: 1
            // },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }

                /*Begin:Modified for #4469: 删除文件按钮不起作用 20180508*/
                //把fileList拿出来
                let {fileList} = info;

                //3. filter successfully uploaded files  uploading done error removed
                fileList = fileList.filter((file) => {
                    if (file.status) {
                        //在本地添加成功的文件没有返回status
                        return (file.status !== 'uploading') && (file.status !== 'error') && (file.status !== 'removed');
                    }
                     return true;
                });


                //重新设置state
                me.setState( {fileList});
                let curItem = assign(ContestEditStore.curItem, {file: fileList[0] || {}})
                ContestEditStore.setData(curItem);
                /*End:Modified for #4469: 删除文件按钮不起作用 20180508*/
            },
        };


        return (
            <Form layout={'vertical'} className="contest-edit-form"
                  id="components-form-contest-theme">

                {
                    themes.map((item, themeIndex) => {

                        let _workCategory = [];
                        if(item.photo) {
                            _workCategory.push(TYPE_PHOTO);
                        }
                        if(item.groupPhoto) {
                            _workCategory.push(TYPE_GROUP_PHOTO);
                        }
                        //_workCategory = _workCategory.join('');




                        return (
                            <div className="form-item-per clearfix" key={themeIndex} >
                                <div className='action-delete-btn' onClick={this._deleteTheme.bind(this, themeIndex)}
                                     style={{display: (themeIndex !== 0) ? 'inline-block': 'none'}}>
                                    <Icon className='icon-delete-cate' type="close"/>
                                </div>

                                <div className="content-per-title">
                                    主题{themeIndex + 1}：
                                </div>

                                <FormItem label={(<span className="label-txt">名称<span className="label_note">（8字以内）</span></span>)} style={{float:'left'}}>
                                    {getFieldDecorator(`name-${item.id}`, {
                                        rules: [{required: true, message: '请输入主题名称'}],
                                        initialValue: item.name
                                    })(
                                        <Input placeholder="" onChange={this._onThemeDataItemChange.bind(this, themeIndex, 'name', 'input')}/>
                                    )}
                                </FormItem>


                                <FormItem label={<span className="label-txt">作品类型</span>} style={{float:'right'}}>
                                    {getFieldDecorator(`workCategory-${item.id}`, {
                                        rules: [{required: true, message: '请选择作品类型'}],
                                        initialValue: _workCategory
                                    })(
                                        <Select
                                            size={'default'}
                                            style={{width: '360px'}}
                                            placeholder="请选择"
                                            mode="multiple"
                                            onChange={this._onThemeDataItemChange.bind(this, themeIndex, 'workCategory', 'select')}


                                        >
                                            <Option key={TYPE_PHOTO} value={TYPE_PHOTO}>单图</Option>
                                            <Option key={TYPE_GROUP_PHOTO} value={TYPE_GROUP_PHOTO}>组图</Option>
                                        </Select>
                                    )}
                                </FormItem>



                                <FormItem label={<span className="label-txt">新上传自动关键词</span>}
                                          style={{float:'left'}}>
                                    {
                                        item.tags ?  (item.tags.split(',')).map((tag, index) => {
                                            const isLongTag = tag.length > 20;
                                            const tagElem = (
                                                <Tag key={tag} closable afterClose={() => this.handleClose(tag)}>
                                                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                                </Tag>
                                            );
                                            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                                        }) : ''

                                    }

                                    {inputVisible && (
                                        <Input
                                            ref={`saveInputRef-${themeIndex}`}
                                            type="text"
                                            size="small"
                                            style={{ width: 78 }}
                                            value={inputValue}
                                            onChange={this.handleInputChange}
                                            onBlur={this.handleInputConfirm.bind(this, themeIndex)}
                                            onPressEnter={this.handleInputConfirm.bind(this, themeIndex)}
                                        />
                                    )}
                                    {!inputVisible && (
                                        <Tag
                                            onClick={this.showInput.bind(this, themeIndex)}
                                            style={{ background: '#fff', borderStyle: 'dashed' }}
                                        >
                                            <Icon type="plus" /> New Tag
                                        </Tag>
                                    )}
                                </FormItem>

                                {/*TODO: 该字段未定义 */}
                                <FormItem label={<span className="label-txt">作品来源</span>}
                                          style={{float:'right'}}>
                                    {getFieldDecorator(`workSource-${item.id}`, {
                                        rules: [{required: true, message: '请选择'}],
                                        initialValue: item.workSource
                                    })(
                                        <Select
                                            size={'default'}
                                            style={{width: '360px'}}
                                            placeholder="请选择"
                                            onChange={this._onThemeDataItemChange.bind(this, themeIndex, 'workSource', 'select')}
                                        >
                                            <Option value={0}>新上传和已有作品</Option>
                                            <Option value={1}>新上传</Option>
                                            <Option value={2}>已有作品</Option>
                                        </Select>
                                    )}
                                </FormItem>


                                <span className="clearfix"></span>


                                <FormItem label={<span className="label-txt">示例图</span>} className="action-upload-container"
                                          style={{float:'left', marginTop: '10px'}}>
                                    <Upload {...commonUploadProps} onChange={_onUploadChange.bind(this, themeIndex)}>
                                        <UIButton {...{
                                            classnames: 'contest-upload-button upload-host-logo',
                                            showString: '上传图片',
                                            isNeedBgc: false
                                        }}></UIButton>
                                    </Upload>
                                    {
                                        item.coverUrl ? (
                                            <a href={item.coverUrl + '!p3'} target="_balnk" className={'common-url'}>
                                                {item.coverUrl + '!p3'}
                                            </a>
                                        ) : ''
                                    }

                                    {
                                        item.coverUrl ? (
                                            <Icon type="close-circle-o" style={{fontSize: 18}} className={"btn-delete"}
                                                  onClick={me._deleteExampleUrlByIndex.bind(this, themeIndex)}/>
                                        ) : ''
                                    }




                                </FormItem>


                                <FormItem label={<span className="label-txt">新上传作品默认分类</span>}
                                          style={{float:'right'}}>
                                    {getFieldDecorator(`defaultCategory-${item.id}`, {
                                        rules: [{required: true, message: '请选择'}],
                                        initialValue: item.defaultCategory
                                    })(
                                        <Select
                                            size={'default'}
                                            style={{width: '360px'}}
                                            placeholder="请选择"
                                            onChange={this._onThemeDataItemChange.bind(this, themeIndex, 'defaultCategory', 'select')}
                                        >
                                            {children}
                                        </Select>
                                    )}
                                </FormItem>

                                <span className="clearfix"></span>

                                {
                                    item.uploadInfo.length ? (
                                        <div>
                                            <FormItem className="action-upload-container"
                                                      style={{float:'left', marginTop: '20px'}}>
                                                <span className="label-txt">新上传参赛附加信息</span>
                                            </FormItem>
                                            <span className="clearfix"></span>
                                        </div>
                                    ) : ""
                                }




                                {
                                    item.uploadInfo.map( (infoItem, infoIndex) =>{
                                        let itemId = infoItem.id;


                                        return (
                                            <div key={infoIndex}>
                                                <div className='action-delete-btn' style={{display: (infoIndex !== -1) ? 'inline-block': 'none'}}>
                                                    <Icon className='icon-delete-cate' type="close" title={'删除该附加信息'}
                                                          onClick={this._deleteExtroInfoByIndex.bind(this, themeIndex, infoIndex)}/>
                                                </div>

                                                <FormItem label={<span className="label-txt">附加信息名称</span>}
                                                          style={{float:'left'}}>
                                                    {getFieldDecorator(`uploadInfoName-${themeIndex}-${itemId}`, {
                                                        rules: [{required: false, message: '请输入附加信息名称'}],
                                                        initialValue: infoItem.name
                                                    })(
                                                        <Input placeholder="" onChange={this._onThemeExtroInfoItemChange.bind(this, themeIndex, infoIndex, 'name', 'input')}/>
                                                    )}
                                                </FormItem>

                                                <FormItem label={<span className="label-txt">附加信息类型</span>}
                                                          style={{float:'right'}}>
                                                    {getFieldDecorator(`uploadInfoType-${themeIndex}-${itemId}`, {
                                                        rules: [{required: false, message: '新选择上传参赛附加信息类型'}],
                                                        initialValue: infoItem.type
                                                    })(
                                                        <Select
                                                            size={'default'}
                                                            style={{width: '360px'}}
                                                            placeholder="请选择"
                                                            onChange={this._onThemeExtroInfoItemChange.bind(this, themeIndex, infoIndex, 'type', 'select')}
                                                        >
                                                            <Option value={1}>文本框</Option>
                                                            <Option value={2}>下拉单选框</Option>
                                                            <Option value={3}>下拉多选框</Option>
                                                            <Option value={4}>附件上传按钮</Option>
                                                        </Select>
                                                    )}
                                                </FormItem>

                                                <FormItem label={<span className="label-txt">附加信息内容</span>}
                                                          style={{float:'left'}}>
                                                    {getFieldDecorator(`uploadInfoContent-${themeIndex}-${itemId}`, {
                                                        rules: [{required: false, message: '请选择展示方式'}],
                                                        initialValue: infoItem.content
                                                    })(
                                                        <Input placeholder="文字描述；如果是选项，逗号分隔"
                                                               onChange={this._onThemeExtroInfoItemChange.bind(this, themeIndex, infoIndex, 'content', 'input')} />
                                                    )}
                                                </FormItem>
                                                <span className="clearfix"></span>




                                            </div>
                                        )
                                    })
                                }


                                <div style={{width: '100%', textAlign:'center'}}>
                                    <Button type="primary" className={'button-edit'}
                                            onClick={this._addExtroInfoByIndex.bind(this, themeIndex)}>添加更多附加信息</Button>
                                </div>







                            </div>
                        )

                    })
                }





            </Form>
        );
    }
}



const WrappedNormalEditForm = Form.create()(NormalEditForm);


export default WrappedNormalEditForm;
