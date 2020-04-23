import React, {Component} from 'react';
import {List,Checkbox} from 'antd-mobile';

const CheckboxItem = Checkbox.CheckboxItem;


/*复选框格式input处理*/
class CheckBoxInputItem extends Component {
    constructor(props) {
        super(props);
        this.form = this.props.form;
        this.name = this.props.name;
        this.text = this.props.text;
        this.value = this.props.value || "";
        this.data = this.props.data || [];
        this.renderHeader = this.props.renderHeader || this.defaultRenderHeader;
        this.disabled = this.props.disabled === true;
        this.isRequired = this.props.isRequired;
        this.callback = this.props.callback;
        this.state = {

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
        this.value = props.value || "";
        this.data = props.data || [];
        this.renderHeader = props.renderHeader || this.defaultRenderHeader;
        this.disabled = props.disabled === true;
        this.isRequired = props.isRequired;
        this.callback = props.callback;
        this.setState({

        })
    }

    /**
     * 默认渲染头部样式
     */
    defaultRenderHeader = () => {
        return <span>{this.isRequired ? <span className={'required-flag'}>*</span>:""}{this.text}</span>;
    };

    /**
     * 根据value找到对应data的数据
     * @param value
     */
    getDataByValue = (value) => {
        let data;
        for (let i = 0; i < this.data.length; i++) {
            let currData = this.data[i];
            if (currData.value === value) {
                data = currData;
                break;
            }
        }
        return {...data};
    };

    /**
     * 根据values找到对应datas的数据
     * @param value
     */
    getDatasByValues = (values) => {
        let datas = [];
        let valuesArr = values.split(",");
        for (let i = 0; i < this.data.length; i++) {
            let currData = this.data[i];
            for (let j = 0; j < valuesArr.length; j++) {
                if (currData.value === valuesArr[j]) {
                    datas.push({...currData});
                    break;
                }
            }

        }
        return datas;
    };

    /**
     * checkbox选中或者取消
     * @param value
     * @param event
     */
    onChange = (value, event) => {
        let oldValue = this.value;
        let oldValueArray = oldValue ? oldValue.split(",") : [];
        let index = oldValueArray.indexOf(value);
        if (index == -1) {
            oldValueArray.push(value);
        } else {
            oldValueArray.splice(index,1);
        }
        let newValue = oldValueArray.join(",");
        let formData = {
            [this.name]: newValue
        };
        this.value = newValue;
        this.form.setFieldsValue(formData, () => {
            if (this.callback && typeof this.callback == 'function') {
                this.callback(this.getDatasByValues(newValue));
            }
        })
    };

    /**
     * 设置隐藏值
     * @param value
     */
    setCheckboxHiddenValue = (value) => {

    };

    render() {
        let { getFieldProps,getFieldError } = this.form;
        return (
            <div className={"CheckBoxItemContainer"}>
                <List renderHeader={() => this.defaultRenderHeader()}>
                    {this.data.map(data => (
                        <CheckboxItem type={"checkbox"} key={data.value} checked={this.value.split(",").indexOf(data.value) != -1} disabled={this.disabled} onChange={(e) => this.onChange(data.value, e)}>
                            {data.label}
                        </CheckboxItem>
                    ))}
                </List>
                <input type="hidden" {...getFieldProps(this.name, {
                    initialValue: this.value,
                    rules: [
                        {required: this.isRequired, message: '请选择' + this.text + '!'}
                    ]
                })} />
                <div className={'validateError'}>
                    {(getFieldError(this.name) || []).join(', ')}
                </div>
            </div>
        );

    }
}

export default CheckBoxInputItem;
