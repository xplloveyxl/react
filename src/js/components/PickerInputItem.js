import React, {Component} from 'react';
import {Picker,List} from 'antd-mobile';

/*下拉选择格式input处理*/
class PickerInputItem extends Component {
    constructor(props) {
        super(props);
        this.form = this.props.form;
        this.name = this.props.name;
        this.text = this.props.text;
        this.title = this.props.title;
        this.value = this.props.value || "";
        this.showValue = this.props.showValue || this.value;
        this.data = this.props.data || [];
        this.cols = this.props.cols || 1;
        this.saveLevel = this.props.saveLevel || "all"; //保存时，取哪一层的值，一般要么全取，要么取最后一级的值
        this.format = this.props.format || this.formatPicker;
        this.extra = this.props.extra || "请选择";
        this.disabled = this.props.disabled;
        this.isRequired = this.props.isRequired;
        this.customValidator = this.props.customValidator;
        this.callback = this.props.callback;
        this.state = {
            showValue: this.showValue,
        };
    }

    componentDidMount() {

    }

    /**
     * 父页面修改props时触发
     * @param props
     */
    componentWillReceiveProps(props) {
        this.form = props.form;
        this.name = props.name;
        this.text = props.text;
        this.title = props.title;
        this.value = props.value || "";
        this.showValue = props.showValue || this.value;
        this.data = props.data || [];
        this.cols = props.cols || 1;
        this.saveLevel = props.saveLevel || "last"; //保存时，取哪一层的值，一般要么全取(需要将值设置为'all')，要么取最后一级的值
        this.format = props.format || this.formatPicker;
        this.extra = props.extra || "请选择";
        this.disabled = props.disabled;
        this.isRequired = props.isRequired;
        this.customValidator = props.customValidator;
        this.callback = props.callback;
        this.setState({
            showValue: this.value,
        },() => {

        })
    }

    /**
     * 默认的格式化方法
     * @param labels
     */
    formatPicker = (labels) => {
        if (labels.length === 0) {
            return this.extra;
        }
       /* if (typeof labels === "string") {
            return labels.join(",");
        } else {
            return labels;
        }*/
        return labels;
    };

    /**
     * 设计隐藏值
     * @param {Array/String} value
     */
    setPickerHiddenValue = (value) => {
        //去掉最后的""元素
        if (value[value.length - 1] === "") {
            value.splice(value.length - 1, 1);
        }
        let oldData = this.form.getFieldsValue();
        let oldHiddenValue = oldData[this.name];
        let oldValueArr = value;
        value = value.join(",");
        let hiddenValue = value;
        if (this.saveLevel === "last") {
            hiddenValue = oldValueArr[oldValueArr.length - 1];
        }
        let data = {
            [this.name]: hiddenValue
        };
        this.props.form.setFieldsValue(data, () => {
            this.showValue = value;
            this.value = hiddenValue;
            this.setState({
                showValue: value
            }, () => {
                if (oldHiddenValue != hiddenValue) {
                    if (this.callback && typeof this.callback == "function") {
                        this.callback(value, hiddenValue);
                    }
                }
            })
        });
    };

    render() {
        let { getFieldProps,getFieldError,getFieldValue } = this.form;
        let state = this.state;
        return (
            <div className={"pickerContainer"}>
                <Picker
                    data={this.data}
                    value={(state.showValue+"").split(",")}
                    cols={this.cols}
                    title={this.title || this.text}
                    format={this.format}
                    /*extra={this.extra} 用了format失效了，只能在format里面处理*/
                    disabled={this.disabled}
                    onChange={selectValue => this.setPickerHiddenValue(selectValue)}
                >
                    <List.Item arrow="horizontal"> {this.isRequired ?<span className={'required-flag'}>*</span> : ""}{this.text}</List.Item>
                </Picker>
                <input type="hidden" {...getFieldProps(this.name, {
                    initialValue: this.value,
                    rules: [
                        {required: this.isRequired, message: '请选择' + this.text + '!',type: typeof getFieldValue(this.name)},
                        {validator: this.customValidator, type: typeof getFieldValue(this.name)}
                    ]
                })} />
                <div className={'validateError'}>
                    {(getFieldError(this.name) || []).join(', ')}
                </div>
            </div>
        );

    }
}

export default PickerInputItem;
