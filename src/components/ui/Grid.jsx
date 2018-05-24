var React = require('react');
var ReactDOM = require('react-dom');
var assign = require('object-assign')
var classNames = require('classnames');

var Window = require('./Window.jsx');
var Message = require('./Message.jsx');
var Input = require('./Input.jsx');

var FormStore = require('../../store/FormStore');

var SelectCmp = React.createClass({
    propTypes: {
        getData : React.PropTypes.func,
        changeHandler : React.PropTypes.func,
        index : React.PropTypes.string,
        label : React.PropTypes.string,
        data: React.PropTypes.object,
        allowblank : React.PropTypes.bool
    },
    getInitialState: function () {
        return new FormStore.form({
            id: this.props.index
        })
    },
    componentDidMount: function () {
    },
    componentWillReceiveProps : function () {
    },
    _onChange : function (evt) {
        var value = this.refs.select.value;
        this.state.setValueByIndex(value);
        if(this.props.afterChange){
            this.props.afterChange(value);
        }
    },
    render: function () {
        var hintTopCls = {
            "hint--no-animate" : true,
            //"hint--always" : true,
            "hint--bottom-right" : true
        }
        if(this.props.help){
            if(this.props.help.length > 20 && this.props.help.length < 100){
                hintTopCls["hint--medium"] = true ;
            }else if(this.props.help.length > 100){
                hintTopCls["hint--medium"] = true;
            }
        }

        var dataList = [];
        if(this.props.data instanceof Array){
            dataList = this.props.data;
        }else if(this.props.data instanceof Object){
            for(var key in this.props.data){
                dataList.push({
                    key : this.props.data[key],
                    value : key
                })
            }
        }

        return (
            <div className={this.props.cls}>
                {
                    this.props.label ? (
                        <label htmlFor="category_type">
                            <h4>
                                <span>{this.props.label}</span>
                                {
                                    this.props.allowblank ? (
                                        <span className="allowblank">*</span>
                                    ):null
                                }
                            </h4>
                            {
                                this.props.help ? (
                                    <div className={classNames(assign(hintTopCls,{tooltip_target : true,"hint--info":true}))} data-hint={this.props.help}></div>
                                ): null
                            }
                        </label>
                    ):''
                }
                <div className="select_wrap">
                    <select ref="select" onChange={this._onChange} defaultValue={this.props.defaultValue}>
                        {
                            dataList && dataList.length ?dataList.map(function (item, index) {
                                return <option key={index} value={item.value}>{item.key}</option>
                            }):''
                        }
                    </select>
                    <div className="arrows"></div>
                </div>
            </div>
        )
    }
});

var WindowHeader = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        count: React.PropTypes.number
    },
    _close: function () {
        Window._close();
    },
    render: function () {
        return (
            <div className='header clearfix'>
                <h3>{this.props.title}</h3>
                    <span className='count'>
                    </span>
                <div className='close close_lightbox_button' onClick={this._close}>
                    &times;
                </div>
            </div>
        )
    }
});
var WindowBottom = React.createClass({
    propTypes: {
        editFlag : React.PropTypes.string,
        formSubmit : React.PropTypes.func,
        gridData: React.PropTypes.object
    },
    _close: function () {
        Window._close();
    },
    _selectHandler : function () {
        var formData = FormStore.form.getData();
        if(FormStore.formAction instanceof Function){
            FormStore.formAction(formData,this.props.editFlag);
        }
    },
    render: function () {
        var sty = {display: 'none'};
        var gridData = this.props.gridData;
        if (gridData.config && gridData.config.edit === true) {
            sty = {};
        }
        return (
            <div className="buttons modal-footer">
                <div className="right">
                    <a className="button tertiary cancel-button" onClick={this._close}>取消</a>
                    <a className="button add-button" onClick={this._selectHandler} style={sty}>确定</a>
                </div>
            </div>
        )
    }
});
var WindowForm = React.createClass({
    propTypes: {
        data : React.PropTypes.object,
        gridData: React.PropTypes.object
    },
    render : function () {
        var newFalg = !this.props.data;
        var item = this.props.data||{};
        var columns = this.props.gridData.columns;
        var columnsList = [];
        if(columns){
            for(var key in columns){
                var webParams = columns[key].web;
                if(!webParams){
                    continue;
                }
                if(newFalg){
                    if(webParams.defaultValue){
                        item[key] = webParams.defaultValue;
                        FormStore.form.setValue(key,webParams.defaultValue);
                    }
                }
                if(webParams.htmlType == 'select'){
                    columnsList.push((
                        <li key={key}>
                            <SelectCmp {...{
                                defaultValue : item[key],
                                data : webParams.selectJson,
                                index : key,
                                label : webParams.label,
                                placeholder : webParams.placeholder
                            }}/>
                        </li>
                    ))
                }else{
                    columnsList.push((
                        <li key={key}>
                            <Input {...assign({},webParams,{
                                defaultValue : item[key],
                                index : key
                            })}/>
                        </li>
                    ))
                }
            }
        }
        return(
            <div className="formPanel modal-body">
                <ul className="fields">
                    {columnsList}
                </ul>
            </div>
        )
    }
})
var GridToolbar = React.createClass({
    propTypes: {
        //表头上的一排内容
        tbars : React.PropTypes.array,
        gridData: React.PropTypes.object
    },
    getInitialState: function () {
        return {
            data: [{
                title: '新建广告位',
                cls: 'icon-mkfile'
            }, {
                title: '刷新',
                cls: 'icon-reload'
            }]
        }
    },
    _addClick : function () {
        FormStore.form.reset();
        Window._show({
            maxWidth : 600,
            html : (
                <div className="lyby_grid_form_window">
                    <WindowHeader {...{
                        title : '新建数据界面'
                    }}/>
                    <WindowForm {...{
                        gridData: this.props.gridData
                    }}/>
                    <WindowBottom {...{
                        gridData: this.props.gridData
                    }}/>
                </div>
            )
        })
    },
    _removeClick : function () {
        var checkEls = $('input[type=checkbox]:checked');
        if (checkEls.length) {
            var aa = confirm('是否删除？');
            if (aa) {
                var ids = [];
                checkEls.each(function () {
                    ids.push(this.value);
                });
                if (FormStore.removeAction instanceof Function) {
                    FormStore.removeAction({
                        ids: ids.join(',')
                    });
                } else {
                    Message._show({
                        cls: 'error',
                        html: '没有可用的删除方法'
                    })
                }
            }
        } else {
            Message._show({
                cls: 'error',
                html: '请选择一条记录'
            })
        }
    },
    render: function () {
        var me = this;
        var gridData = this.props.gridData;
        var sty = {display: 'none'};
        if (gridData.config && gridData.config.remove === true) {
            sty = {};
        }
        return (
            <header className="listview-header media">
                <ul className="list-inline m-t-5 m-b-0">
                    <li className="pagin-value hidden-xs">
                        <a className="btn btn-alt m-r-5" onClick={this._addClick}>
                            新建
                        </a>
                        <a className="btn btn-alt m-r-5" onClick={this._removeClick} style={sty}>
                            删除
                        </a>
                        {
                            this.props.tbars ? this.props.tbars.map(function (item,index) {
                                    return (
                                        <a key={index} className="btn btn-alt m-r-5" onClick={item.handler} title={item.title}>
                                            {item.text}
                                        </a>
                                    )
                                }) : null
                        }
                    </li>
                </ul>
            </header>
        )
    }
});
var GridBody = React.createClass({
    propTypes: {
        gridData: React.PropTypes.object
    },
    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {
        var configData = this.props.gridData.config;
        if(configData.sort){
            var curDom = ReactDOM.findDOMNode(this);
            $(curDom).sortable({
                items: '.table tbody tr',
                update: function (event, ui) {
                    var thisEl = ui.item;
                    var rsObj = {
                        prevID: thisEl.prev().find('td:first input[type=checkbox]').val(),
                        curID: thisEl.find('td:first input[type=checkbox]').val(),
                        nextID: thisEl.next().find('td:first input[type=checkbox]').val()
                    }
                    if (FormStore.sortAction instanceof Function) {
                        FormStore.sortAction(rsObj);
                    }
                    return;
                }
            });
        }
    },
    _rowClick : function (item,evt) {
        var _thisDom = evt.target;
        if(_thisDom.tagName == 'A' || _thisDom.tagName == 'IMG'){
            return;
        }
        Window._show({
            maxWidth : 600,
            html : (
                <div className="lyby_grid_form_window">
                    <WindowHeader {...{
                        title : '修改数据界面'
                    }}/>
                    <WindowForm {...{
                        data: item,
                        gridData: this.props.gridData
                    }}/>
                    <WindowBottom {...{
                        editFlag: item ? (item.id+'') : '',
                        gridData: this.props.gridData
                    }}/>
                </div>
            )
        })
    },
    render: function () {
        var me = this;
        var columns = this.props.gridData.columns;
        var realColumn = {

        }
        var columnsList = [];
        if(columns){
            for(var key in columns){
                var webParams = columns[key].web;
                if(!webParams){
                    continue;
                }
                realColumn[key] = columns[key];
                columnsList.push((
                    <th key={key}>{webParams.label}</th>
                ))
            }
        }
        return (
            <div className="block-area">
                <div className="table-responsive overflow">
                    <table className="table table-bordered table-hover tile">
                        <thead>
                        <tr>
                            <th style={{width : '20px'}}></th>
                            {columnsList}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.gridData.data.length ? this.props.gridData.data.map(function (item, index) {
                                var list = [];
                                for(var key in realColumn){
                                    var cObj = realColumn[key];

                                    var iv = item[key];

                                    if(cObj.type == 'date'){
                                        iv = new Date(iv).pattern("yyyy-MM-dd HH:mm:ss E");
                                    }else if(cObj.web.htmlType == 'select'){
                                        if(cObj.web.selectJson){
                                            iv = cObj.web.selectJson[iv];
                                        }
                                    }

                                    if(iv instanceof Array){
                                        list.push((
                                            <td key={key} onClick={me._rowClick.bind(null,item)}>
                                                <a href="javascript:void(0)" onClick={me._showList.bind(null,iv)}>查看列表</a>
                                            </td>
                                        ));
                                    }else if(iv instanceof Object){
                                        list.push((
                                            <td key={key} onClick={me._rowClick.bind(null,item)}>
                                                <a href="javascript:void(0)" onClick={me._showObjectList.bind(null,iv)}>查看列表</a>
                                            </td>
                                        ));
                                    }else{
                                        if (cObj.web.thumb) {
                                            iv = (
                                                <img src={iv} style={{
                                                    maxWidth: 150,
                                                    maxHeight: 150
                                                }}></img>
                                            )
                                        }

                                        if(cObj.web.linkHref){
                                            iv = (
                                                <a href={cObj.web.linkHref.format(item)} target="_blank" style={{display:'inline-block'}}>{iv}</a>
                                            )
                                        }
                                        list.push((
                                            <td key={key} onClick={me._rowClick.bind(null,item)}>{iv}</td>
                                        ));
                                    }
                                }
                                return (
                                    <tr key={index}>
                                        <td><input type="checkbox" value={item.id}/></td>
                                        {list}
                                    </tr>
                                )
                            }):(
                                <tr>
                                    <td colSpan="20" className="empty">
                                        表格无记录
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    },
    _showObjectList : function (objectJson) {
        var tdEl = [];
        if (objectJson.url) {
            tdEl.push(objectJson);
        }else{
            for (var key in objectJson) {
                tdEl.push({
                    key: key,
                    value: objectJson[key]
                })
            }
        }
        this._showList(tdEl);
    },
    _showList : function (arrayList) {
        if(!arrayList.length){
            alert('没有数据');
            return;
        }
        Window._show({
            maxWidth : 600,
            html : (
                <div className="lyby_grid_form_window">
                    <WindowHeader {...{
                        title : '列表数据展示'
                    }}/>
                    <div className="formPanel modal-body">
                        <table className="fields">
                            <thead>
                            </thead>
                            <tbody>
                            {
                                arrayList.map(function (item, index) {
                                    var tdEl;
                                    if (item.url) {
                                        var srcRealUrl = item.url.p1.replace(/@200w\S+/g, '');
                                        tdEl = (
                                            <td><a href={srcRealUrl} target="_blank"><img src={item.url.p1}/></a></td>
                                        )
                                    }else {
                                        tdEl = [];
                                        for(var key in item){
                                            var vshowStr = item[key];
                                            if(typeof(vshowStr) != 'string'){
                                                if(vshowStr.toString instanceof Function){
                                                    vshowStr = vshowStr.toString();
                                                }else{
                                                    vshowStr = typeof(vshowStr);
                                                }
                                            }
                                            tdEl.push((
                                                <td key={key}>
                                                    {vshowStr}
                                                </td>
                                            ))
                                        }
                                    }
                                    return (
                                        <tr key={index} style={{paddingBottom: '10px'}}>
                                            {tdEl}
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className="buttons modal-footer">
                        <div className="right">
                            <a className="button tertiary cancel-button" onClick={function() {
                              Window._close();
                            }}>关闭</a>
                        </div>
                    </div>
                </div>
            )
        })
    }
});
var Grid = React.createClass({
    propTypes: {
        //表头上的一排内容
        tbars : React.PropTypes.array,
        gridData: React.PropTypes.object
    },
    getInitialState: function () {
        return {};
    },
    render: function () {
        if(!this.props.gridData){
            return null;
        }
        return (
            <div className="lyby_table clearfix">
                <GridToolbar gridData={this.props.gridData} tbars={this.props.tbars}/>
                <GridBody gridData={this.props.gridData}/>
            </div>
        )
    }
});

module.exports = Grid;
