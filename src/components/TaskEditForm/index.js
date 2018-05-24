/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import {Form, Icon, Input, Button, Checkbox, Select, Radio, InputNumber, Upload, message, Switch} from 'antd';
import './taskEditItem.less'
import {observable, useStrict} from 'mobx';
import {observer} from 'mobx-react';
import ReviewListAdmin from '../../stores/reviewListAdmin'
import UIButton from '../ui/Button'
import assign from 'object-assign'


const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

useStrict(true)



@observer
class NormalEditForm extends React.Component {
    constructor(props) {
        super(props);
        console.log('zheshi', this.props);
        this.state = {
            fileList: []
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
        ReviewListAdmin.setTaskType(val)
    }

    _consoleFun() {

    }

    render() {
        const { getFieldDecorator } = this.props.form;

        console.log(888888, ReviewListAdmin.curItem);
        let me = this;

        const props = {
            name: 'file',
            //action: '/api/admin/review_task',
            headers: {
                authorization: 'authorization-xlsx',
            },
            accept: '.xlsx, .xls', //支持上传文件格式
            beforeUpload: (file) => {
                //限定一下文件大小20M
                const isLt20M = file.size / 1024 / 1024 < 20;
                if (!isLt20M) {
                    message.error('上传文件大小要小于20M');
                    return '';
                }

                let curItem = assign(ReviewListAdmin.curItem, {file: file})
                ReviewListAdmin.setData(curItem);
                this.setState({
                    fileList: [file]
                })
                console.log('ReviewListAdmin.curItem', ReviewListAdmin.curItem);
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
                let curItem = assign(ReviewListAdmin.curItem, {file: fileList[0] || {}})
                ReviewListAdmin.setData(curItem);
                /*End:Modified for #4469: 删除文件按钮不起作用 20180508*/
            },
        };


        return (
            <Form layout={'vertical'} className="task-edit-form"
                  id="components-form-task-edit-login">

                <FormItem label="任务名称">
                    {getFieldDecorator('task-name', {
                        rules: [{required: true, message: '请输入任务名称'}],
                        initialValue: ReviewListAdmin.curItem.name
                    })(
                        <Input placeholder="请输入任务名称" />
                    )}
                </FormItem>
                <FormItem label="任务说明">
                    {getFieldDecorator('task-desc', {
                        rules: [{required: true, message: '请输入任务说明'}],
                        initialValue: ReviewListAdmin.curItem.description
                    })(
                        <Input placeholder="请输入任务说明"/>
                    )}
                </FormItem>
                <FormItem label="评审类型">
                    {getFieldDecorator('task-type', {
                        rules: [{required: true, message: '请选择任务类型'}],
                        initialValue: ReviewListAdmin.curItem.reviewTaskType,
                    })(
                        <Select
                            size={'default'}
                            style={{width: '240px'}}
                            onChange={this.handleTaskTypeChange.bind(this)}

                        >
                            <Option value={0}>入选</Option>
                            <Option value={1}>淘汰</Option>
                        </Select>
                    )}
                </FormItem>

                <FormItem label="入选/淘汰数量">
                    {getFieldDecorator('task-select-work-number', {
                        rules: [{required: true, message: '请输入数量'}],
                        initialValue: ReviewListAdmin.curItem.reviewItemLimit,
                    })(
                        <InputNumber min={1} style={{width: '240px'}}/>
                    )}
                </FormItem>


                <FormItem label="是否选出/淘汰足够数量才可以提交">
                    {getFieldDecorator('reviewItemLimitReach', {
                        initialValue: ReviewListAdmin.curItem.reviewItemLimitReach == 1
                    })(
                        <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />}
                                defaultChecked={ReviewListAdmin.curItem.reviewItemLimitReach == 1} />
                    )}
                </FormItem>


                {/* 作品类型不需要了 */}
                {/*<FormItem label="作品类型">*/}
                    {/*{getFieldDecorator('work-type', {})(*/}
                        {/*<Select*/}
                            {/*size={'default'}*/}
                            {/*style={{width: '240px'}}*/}
                            {/*placeholder='请选择'*/}

                        {/*>*/}
                            {/*<Option value="1">单图</Option>*/}
                            {/*<Option value="2">组图</Option>*/}
                            {/*<Option value="3">图文</Option>*/}
                        {/*</Select>*/}
                    {/*)}*/}
                {/*</FormItem>*/}


                <FormItem className="action-upload-container">
                    <a href="https://vcg-video-source.oss-cn-beijing.aliyuncs.com/review_contest/template_0417.xlsx"
                       target="_blank" className="download-template">
                        <UIButton {...{
                            classnames: 'review-task-button button-download',
                            showString: '下载表格模板',
                            isNeedBgc: false
                        }}></UIButton>
                    </a>

                    <Upload {...props} fileList={this.state.fileList}>
                        <UIButton {...{
                            classnames: 'review-task-button button-download',
                            showString: '上传表格',
                            isNeedBgc: false
                        }}></UIButton>
                    </Upload>

                </FormItem>

                <FormItem label="是否要点评" style={{display: ReviewListAdmin.curItem.reviewTaskType === 0 ? 'block' : 'none'}}>
                    {getFieldDecorator('is-need-comment', {rules: [{required: ReviewListAdmin.curItem.reviewTaskType === 0 ? true : false, message: '请选择'}], initialValue: ReviewListAdmin.curItem.reviewSummary})(
                        <RadioGroup>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </RadioGroup>
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
