/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import {Form, Icon, Input, Button, Checkbox, Select, Radio, InputNumber,
    Upload, message, Switch, Tag, Tooltip, DatePicker} from 'antd';
import moment from 'moment'
import './BasicForm.scss'
import {observable, useStrict} from 'mobx';
import {observer} from 'mobx-react';
import ContestEditStore from '../../../stores/contest-edit-store'
import UIButton from '../../../components/ui/Button'
import assign from 'object-assign'


import { autobind } from 'core-decorators'



const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const CheckboxGroup = Checkbox.Group;




//默认分类
const defaultCategory = ["未分类", "抽象", "动物", "黑白", "名人", "城市", "商业", "音乐", "生活", "时尚", "胶片", "艺术", "美食",
    "纪实", "自然", "微距", "人物", "表演", "运动", "静物", "交通", "旅行", "水下", "婚礼", "建筑", "风光", "街拍", "航拍", "夜景"]


const dateFormat = "YYYY-MM-DD HH:mm:ss";



useStrict(true)




const children = [];
for (let i = 0,l = defaultCategory.length; i < l; i++) {
    children.push(<Option key={defaultCategory[i]}>{defaultCategory[i]}</Option>);
}





//上传按钮通用属性
const props = {
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
    // customRequest: function (data) {
    //
    // },
    //fileList: this.state.fileList,
    // onRemove(file) {
    //
    // },
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


const _hostLogoUploadProps = assign({}, props, {
    onChange(info) {

        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
            let logoInfo = info.file.response.data.lookUrl;
            ContestEditStore.setKeyValue('hostLogo', logoInfo);

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }

    }
})

const _webListUploadProps = assign({}, props, {
    onChange(info) {

        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
            let logoInfo = info.file.response.data.lookUrl;
            ContestEditStore.setKeyValue('webUrl', logoInfo);

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }

    }
})

const _appListUploadProps = assign({}, props, {
    onChange(info) {

        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
            let logoInfo = info.file.response.data.lookUrl;
            ContestEditStore.setKeyValue('appUrl', logoInfo);

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }

    }
})


const _webDetailUploadProps = assign({}, props, {
    onChange(info) {

        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
            let logoInfo = info.file.response.data.lookUrl;
            ContestEditStore.setKeyValue('webDetailUrl', logoInfo);

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }

    }
})

const _appDetailUploadProps = assign({}, props, {
    onChange(info) {

        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
            let logoInfo = info.file.response.data.lookUrl;
            ContestEditStore.setKeyValue('appDetailUrl', logoInfo);

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }

    }
})










@observer
class NormalEditForm extends React.Component {
    constructor(props) {
        super(props);
        console.log('zheshi', this.props);
        this.state = {
            fileList: [],
            inputValue: '', //new tag输入框
            inputVisible: false, //tag输入框是否显示
            isInviteCodeNeccesary: false, //邀请赛 是不是必须

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
    showInput = () => {
        this.setState({ inputVisible: true }, () => this.refs.saveInputRef.focus());
    }
    /**
     * 设置标签的值
     * @param e
     */
    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = ContestEditStore.curItem.tags ? ContestEditStore.curItem.tags.split(',') : [];
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
            ContestEditStore.setContestTags(tags.join(','));
        }
        console.log(tags);
        this.setState({
            // tags,
            inputVisible: false,
            inputValue: '',
        });
    }

    handleHostShowStyleChange = () => {

    }

    @autobind
    onInviteSwitchChange(e) {
        let checked = e.target.checked;
        this.setState({
            isInviteCodeNeccesary: checked
        })

    }
    @autobind
    handleHostShowTypeChange(val) {
        console.log('host show value', val);
        //主办方显示名称
        if(val === ContestEditStore.curItem.hostType) {
            return '';
        }
        ContestEditStore.setKeyValue('hostType', val);


    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const { inputVisible, inputValue, isInviteCodeNeccesary } = this.state;



        let me = this;






        console.log('ContestEditStore.curItem.hostLogo', ContestEditStore.curItem.hostLogo);
        console.log('ContestEditStore.curItem.hostType', ContestEditStore.curItem.hostType);




        return (
            <Form layout={'vertical'} className="contest-edit-form"
                  id="components-form-task-edit-login">

                <FormItem label={(<span className="label-txt">名称<span className="label_note">（最长12个中文字符）</span></span>)}
                          style={{float:'left'}}>
                    {getFieldDecorator('title', {
                        rules: [{required: true, message: '请输入大赛名称'}],
                        initialValue: ContestEditStore.curItem.title
                    })(
                        <Input placeholder="请输入大赛名称" />
                    )}
                </FormItem>


                <FormItem label={(<span className="label-txt">副标题<span className="label_note"></span></span>)}
                          style={{float:'right'}}>
                    {getFieldDecorator('subtitle', {
                        rules: [{required: true, message: '请输入大赛副标题'}],
                        initialValue: ContestEditStore.curItem.subtitle
                    })(
                        <Input placeholder="请输入大赛副标题" />
                    )}
                </FormItem>


                <FormItem label={<span className="label-txt">级别</span>} style={{float:'left'}}>
                    {getFieldDecorator('contestCategory', {
                        rules: [{required: true, message: '请选择'}],
                        initialValue: ContestEditStore.curItem.contestCategory,
                    })(
                        <Select
                            size={'default'}
                            style={{width: '360px'}}
                            placeholder="请选择"
                            onChange={this.handleTaskTypeChange.bind(this)}

                        >
                            <Option value={'contest'}>大赛</Option>
                            <Option value={'activity'}>活动</Option>
                        </Select>
                    )}
                </FormItem>


                {/*TODO: 该字段未定义 */}
                <FormItem label={(<span className="label-txt">比赛分类<span className="label_note">（可多选）</span></span>)}
                          style={{float:'right'}}>
                    {getFieldDecorator('resourceCategory', {
                        rules: [{required: true, message: '请输入任务说明'}],
                        initialValue: ContestEditStore.curItem.resourceCategory ?
                            ContestEditStore.curItem.resourceCategory.split(',') : []
                    })(
                        <Select
                            mode="multiple"
                            size={'default'}
                            style={{width: '360px'}}
                            placeholder="请选择"
                            onChange={this.onCategoryChange.bind(this)}

                        >
                            {children}

                        </Select>
                    )}
                </FormItem>

                <div className="clearfix"></div>

                <FormItem label={<span className="label-txt">关键词</span>}
                          style={{float:'left'}}>
                    {
                        (ContestEditStore.curItem.tags ? ContestEditStore.curItem.tags.split(',') : []).map((tag, index) => {
                            const isLongTag = tag.length > 20;
                            const tagElem = (
                                <Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
                                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                </Tag>
                            );
                            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                        })

                    }


                    {inputVisible && (
                        <Input
                            ref={"saveInputRef"}
                            type="text"
                            size="small"
                            style={{ width: 78 }}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputConfirm}
                            onPressEnter={this.handleInputConfirm}
                        />
                    )}
                    {!inputVisible && (
                        <Tag
                            onClick={this.showInput}
                            style={{ background: '#fff', borderStyle: 'dashed' }}
                        >
                            <Icon type="plus" /> New Tag
                        </Tag>
                    )}




                </FormItem>

                <div className="clearfix"></div>

                <FormItem className="action-upload-container"
                          style={{float:'left', marginTop: '10px'}}>
                    {getFieldDecorator('contestType', {
                        rules: [{required: false, message: ''}],
                        valuePropName: 'checked',
                        initialValue: ContestEditStore.curItem.contestType == 1
                    })(
                        <Checkbox onChange={me.onInviteSwitchChange}> <span className="label-txt">邀请投稿</span></Checkbox>
                    )}

                </FormItem>
                <span className="clearfix"></span>

                <FormItem label={<span className="label-txt">邀请码</span>}
                          style={{float:'left'}}>
                    {getFieldDecorator('inviteCode', {
                        rules: [{required: isInviteCodeNeccesary, message: '请输入邀请码'}],
                        initialValue: ContestEditStore.curItem.contestProperty.inviteCode
                    })(
                        <Input placeholder="请输入邀请码" />
                    )}
                </FormItem>
                <FormItem label={<span className="label-txt">参赛人数</span>}
                          style={{float:'right'}}>
                    {getFieldDecorator('numberLimit', {
                        rules: [{required: isInviteCodeNeccesary, message: '请输入参赛人数'}],
                        initialValue: ContestEditStore.curItem.contestProperty.numberLimit
                    })(
                        <InputNumber min={1} />
                    )}
                </FormItem>


                {/*TODO: 主办方展示方式  该字段未定义 */}
                <FormItem label={<span className="label-txt">主办方展示方式</span>}
                          style={{float:'left'}}>
                    {getFieldDecorator('hostType', {
                        rules: [{required: true, message: '请选择展示方式'}],
                        initialValue: ContestEditStore.curItem.hostType
                    })(
                        <Select
                            size={'default'}
                            style={{width: '360px'}}
                            placeholder="请选择"
                            onChange={this.handleHostShowTypeChange.bind(this)}
                        >
                            <Option value={0}>名称</Option>
                            <Option value={1}>logo</Option>
                        </Select>
                    )}
                </FormItem>

                <FormItem label={<span className="label-txt">简介页URL</span>} style={{float:'right'}}>
                    {getFieldDecorator('refer', {
                        rules: [{required: true, message: '请输入大赛简介页URL'}],
                        initialValue: ContestEditStore.curItem.refer
                    })(
                        <Input placeholder="请输入大赛简介页URL" />
                    )}
                </FormItem>

                <span className="clearfix"></span>


                <FormItem label={<span className="label-txt">主办方名称<span className="label_note">（12字以内）</span></span>}
                          style={{float:'left', display: (ContestEditStore.curItem.hostType === 0) ? 'inline-block': 'none'}}>
                    {getFieldDecorator('hostUnit', {
                        rules: [{required: ContestEditStore.curItem.hostType === 0, message: '请输入主办方名称'}],
                        initialValue: ContestEditStore.curItem.hostUnit
                    })(
                        <Input placeholder="请输入主办方名称" />
                    )}
                </FormItem>

                <span className="clearfix"></span>



                <FormItem label={<span className="label-txt">主办方logo</span>} className="action-upload-container"
                          style={{float:'left', display: (ContestEditStore.curItem.hostType === 1) ? 'inline-block': 'none'}}>
                    <Upload {..._hostLogoUploadProps}>
                        <UIButton {...{
                            classnames: 'contest-upload-button upload-host-logo',
                            showString: '上传logo图片',
                            isNeedBgc: false
                        }}></UIButton>
                    </Upload>
                    {
                        ContestEditStore.curItem.hostLogo.baseUrl ? (
                            <a href={ContestEditStore.curItem.hostLogo.baseUrl + '!p3'} target="_balnk" className={'common-url'}>
                                {ContestEditStore.curItem.hostLogo.baseUrl + '!p3'}
                            </a>
                        ) : ''
                    }


                </FormItem>

                <span className="clearfix"></span>

                <FormItem label={<span className="label-txt">Web端列表页样式</span>} className="action-upload-container" style={{float:'left'}}>
                    <Upload {..._webListUploadProps} >
                        <UIButton {...{
                            classnames: 'contest-upload-button upload-kv',
                            showString: '列表页背景图',
                            isNeedBgc: false
                        }}></UIButton>
                    </Upload>

                    {
                        ContestEditStore.curItem.webUrl.baseUrl ? (
                            <a href={ContestEditStore.curItem.webUrl.baseUrl + '!p3'} target="_balnk" className={'common-url'}>
                                {ContestEditStore.curItem.webUrl.baseUrl + '!p3'}
                            </a>
                        ) : ''
                    }

                </FormItem>

                <FormItem label={<span className="label-txt">APP端列表页样式</span>} className="action-upload-container" style={{float:'right'}}>
                    <Upload {..._appListUploadProps}>
                        <UIButton {...{
                            classnames: 'contest-upload-button upload-kv',
                            showString: '列表页背景图',
                            isNeedBgc: false
                        }}></UIButton>
                    </Upload>

                    {
                        ContestEditStore.curItem.appUrl.baseUrl ? (
                            <a href={ContestEditStore.curItem.appUrl.baseUrl + '!p3'} target="_balnk" className={'common-url'}>
                                {ContestEditStore.curItem.appUrl.baseUrl + '!p3'}
                            </a>
                        ) : ''
                    }


                </FormItem>


                <span className="clearfix"></span>


                {/*TODO: 主办方展示方式  该字段未定义 */}
                <FormItem label={<span className="label-txt">Web端详情页样式</span>}
                          style={{float:'left'}}>
                    {getFieldDecorator('webType', {
                        rules: [{required: true, message: '请选择展示方式'}],
                        initialValue: ContestEditStore.curItem.webType
                    })(
                        <Select
                            size={'default'}
                            style={{width: '360px'}}
                            placeholder="请选择"
                            onChange={this.handleTaskTypeChange.bind(this)}
                        >
                            <Option value={0}>背景图</Option>
                            <Option value={1}>主视觉</Option>
                        </Select>
                    )}
                </FormItem>

                <FormItem label={<span className="label-txt">APP端详情页样式</span>}
                          style={{float:'right'}}>
                    {getFieldDecorator('appType', {
                        rules: [{required: true, message: '请选择展示方式'}],
                        initialValue: ContestEditStore.curItem.appType
                    })(
                        <Select
                            size={'default'}
                            style={{width: '360px'}}
                            placeholder="请选择"
                            onChange={this.handleTaskTypeChange.bind(this)}

                        >
                            <Option value={0}>背景图</Option>
                            <Option value={1}>主视觉</Option>
                        </Select>
                    )}
                </FormItem>

                <span className="clearfix"></span>
                {/* webDetailUrl */}
                <FormItem style={{float:'left'}}>
                    <Upload {..._webDetailUploadProps}>
                        <UIButton {...{
                            classnames: 'contest-upload-button upload-kv',
                            showString: '上传背景/主视觉图片',
                            isNeedBgc: false
                        }}></UIButton>
                    </Upload>

                    {
                        ContestEditStore.curItem.webDetailUrl.baseUrl ? (
                            <a href={ContestEditStore.curItem.webDetailUrl.baseUrl + '!p3'} target="_balnk" className={'common-url'}>
                                {ContestEditStore.curItem.webDetailUrl.baseUrl + '!p3'}
                            </a>
                        ) : ''
                    }


                </FormItem>

                {/* appDetailUrl */}
                <FormItem style={{float:'right'}}>
                    <Upload {..._appDetailUploadProps}>
                        <UIButton {...{
                            classnames: 'contest-upload-button upload-kv',
                            showString: '上传背景/主视觉图片',
                            isNeedBgc: false
                        }}></UIButton>
                    </Upload>
                    {
                        ContestEditStore.curItem.appDetailUrl.baseUrl ? (
                            <a href={ContestEditStore.curItem.appDetailUrl.baseUrl + '!p3'} target="_balnk" className={'common-url'}>
                                {ContestEditStore.curItem.appDetailUrl.baseUrl + '!p3'}
                            </a>
                        ) : ''
                    }

                </FormItem>

                <span className="clearfix"></span>


                <FormItem label={<span className="label-txt">填充色值</span>} style={{float:'left'}}>
                    {getFieldDecorator('visionColor', {
                        rules: [{required: false, message: '请输入填充色值'}],
                        initialValue: ContestEditStore.curItem.visionColor
                    })(
                        <Input placeholder="请输入填充色值" />
                    )}
                </FormItem>
                <span className="clearfix"></span>



                <FormItem label={<span className="label-txt">APP端详情页提示信息</span>} style={{float:'left'}}>
                    {getFieldDecorator('attentionApp', {
                        rules: [{required: true, message: '请输入APP端详情页提示信息'}],
                        initialValue: ContestEditStore.curItem.contestProperty.intro
                    })(
                        <Input placeholder="请输入APP端详情页提示信息" />
                    )}
                </FormItem>

                <div className="clearfix" style={{marginBottom: '20px'}}></div>

                <FormItem label={<span className="label-txt">大赛列表页的权重</span>} style={{float:'left'}}>
                    {getFieldDecorator('rating', {
                        rules: [{required: true, message: '请输入数量'}],
                        initialValue: ContestEditStore.curItem.rating,
                    })(
                        <InputNumber min={1} style={{width: '240px'}}/>
                    )}
                </FormItem>


                <FormItem label={<span className="label-txt">个性域名</span>} style={{float:'right'}}>
                    {getFieldDecorator('domainName', {
                        rules: [{required: true, message: '请输入个性域名'}],
                        valuePropName: 'value',
                        initialValue: ContestEditStore.curItem.domainName,
                    })(

                        <Input addonBefore="https://500px.me/contest/" addonAfter=""  />


                    )}
                </FormItem>

                <FormItem label={(<span className="label-txt">奖品描述<span className="label_note">（12字以内）</span></span>)} style={{float:'left'}}>
                    {getFieldDecorator('prizeMsg', {
                        rules: [{required: true, message: '请输入奖品描述'}],
                        initialValue: ContestEditStore.curItem.contestProperty.prizeMsg
                    })(
                        <Input placeholder="请输入奖品描述" />
                    )}
                </FormItem>


                <div className="clearfix" style={{marginBottom: '20px'}}></div>

                {/* 下面是征集时间 */}

                <FormItem label={(<span className="label-txt">征集开始时间</span>)} style={{float:'left'}}>
                    {getFieldDecorator('openTime', {
                        rules: [{required: true, message: '请输入征集开始时间'}],
                        //要接收一个格式化后的日期
                        initialValue: ContestEditStore.curItem.openTime ? moment(moment(ContestEditStore.curItem.openTime).format(dateFormat), dateFormat): ''  //ContestEditStore.curItem.openTime
                    })(
                        <DatePicker
                            showTime
                            format={dateFormat}
                            placeholder="请选择时间"
                        />
                    )}
                </FormItem>
                <FormItem label={(<span className="label-txt">征集状态提示语</span>)} style={{float:'right'}}>
                    {getFieldDecorator('openMsg', {
                        rules: [{required: true, message: '请输入提示语'}],
                        initialValue: ContestEditStore.curItem.contestProperty.openMsg
                    })(
                        <Input placeholder="请输入提示语" />
                    )}
                </FormItem>
                <FormItem label={(<span className="label-txt">征集结束时间</span>)} style={{float:'left'}}>
                    {getFieldDecorator('openEndTime', {
                        rules: [{required: true, message: '请输入征集结束时间'}],
                        initialValue: ContestEditStore.curItem.openEndTime ? moment(moment(ContestEditStore.curItem.openEndTime).format(dateFormat), dateFormat): ''  //ContestEditStore.curItem.openTime
                    })(
                        <DatePicker
                            showTime
                            format={dateFormat}
                            placeholder="请选择时间"
                        />
                    )}
                </FormItem>
                <FormItem label={(<span className="label-txt">评审状态提示语</span>)} style={{float:'right'}}>
                    {getFieldDecorator('judgeMsg', {
                        rules: [{required: true, message: '请输入提示语'}],
                        initialValue: ContestEditStore.curItem.contestProperty.judgeMsg
                    })(
                        <Input placeholder="请输入提示语" />
                    )}
                </FormItem>
                <FormItem label={(<span className="label-txt">公示开始时间</span>)} style={{float:'left'}}>
                    {getFieldDecorator('publicityTime', {
                        rules: [{required: true, message: '请输入公示开始时间'}],
                        initialValue: ContestEditStore.curItem.publicityTime ? moment(moment(ContestEditStore.curItem.publicityTime).format(dateFormat), dateFormat):''
                    })(
                        <DatePicker
                            showTime
                            format={dateFormat}
                            placeholder="请选择时间"
                        />
                    )}
                </FormItem>
                <FormItem label={(<span className="label-txt">公示状态提示语</span>)} style={{float:'right'}}>
                    {getFieldDecorator('publicityMsg', {
                        rules: [{required: true, message: '请输入提示语'}],
                        initialValue: ContestEditStore.curItem.contestProperty.publicityMsg
                    })(
                        <Input placeholder="请输入提示语" />
                    )}
                </FormItem>
                <FormItem label={(<span className="label-txt">比赛结束时间</span>)} style={{float:'left'}}>
                    {getFieldDecorator('publicityEndTime', {
                        rules: [{required: true, message: '请输入比赛结束时间'}],
                        initialValue: ContestEditStore.curItem.publicityEndTime ? moment(moment(ContestEditStore.curItem.publicityEndTime).format(dateFormat), dateFormat): ''
                    })(
                        <DatePicker
                            showTime
                            format={dateFormat}
                            placeholder="请选择时间"
                        />
                    )}
                </FormItem>
                <FormItem label={(<span className="label-txt">已结束状态提示语</span>)} style={{float:'right'}}>
                    {getFieldDecorator('closeMsg', {
                        rules: [{required: true, message: '请输入提示语'}],
                        initialValue: ContestEditStore.curItem.contestProperty.closeMsg
                    })(
                        <Input placeholder="请输入提示语" />
                    )}
                </FormItem>







            </Form>
        );
    }
}

const options = {
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            username: Form.createFormField({
                ...props.username,
                value: props.username.value,
            }),
        };
    },
    onValuesChange(_, values) {
        console.log(values);
    },
}

const WrappedNormalEditForm = Form.create()(NormalEditForm);


export default WrappedNormalEditForm;
