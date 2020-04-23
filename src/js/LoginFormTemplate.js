import React, {Component} from 'react';
import {List, InputItem, TextareaItem, Toast, Button, Modal, Popover} from 'antd-mobile';
import { createForm, formShape } from 'rc-form';
import CheckBoxInputItem from './components/CheckBoxInputItem';
import PickerInputItem from './components/PickerInputItem';

/*登录表单*/
class LoginFormTemplate extends Component {
    static propTypes = {
        form: formShape
    };
    constructor(props) {
        super(props);
        this.state = {
            sobCodeData: [],
            passwordType: "password"
        };
    }

    /**
     * 渲染开始前
     */
    componentWillMount() {
        this.setState({
            sobCodeData: [
                {
                    value: "1", label: "财政局"
                },
                {
                    value: "2", label: "公安局"
                }
            ]
        });
    }

    /**
     * 渲染完成后
     */
    componentDidMount() {
       let loginDataStr = window.localStorage.getItem("zczyLoginInfo");
       if (loginDataStr) {
           this.props.form.setFieldsValue(JSON.parse(loginDataStr));
       }
    }

    getFormData = () => {
       let form = this.props.form;
       return form.getFieldsValue();
    };

    validateAll = () => {
        let tag = true;
        let form = this.props.form;
        form.validateFields((error, values) => {
            if (error) {
                tag = false;
            }
        });
        return tag;
    };

    /**
     * 选中默认的值
     */
    selectDefaultSobCode = () => {
        if (this.state.sobCodeData.length) {
            return this.state.sobCodeData[0].value;
        }
        return "";
    };

    /**
     * 判断字段是否验证通过
     * @param field
     * @return {*}
     */
    fieldIsError = (field) => {
        let { getFieldError } = this.props.form;
        return getFieldError(field)
    };

    /**
     * 字段错误时className
     * @param field
     */
    fieldIsErrorClassName = (field) => {
        if (this.fieldIsError(field)) {
            return "fieldError"
        }
        return "";
    };

    /**
     * 用户名错误时提示
     */
    fieldErrorTip = (field) => {
        let { getFieldError } = this.props.form;
        if (this.fieldIsError(field)) {
            return  <Popover
                mask
                overlayClassName="fortest"
                overlayStyle={{ color: 'currentColor' }}
                visible={false}
                align={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [0, 5],
                }}
                overlay={[
                    <Popover.Item>{getFieldError(field)}</Popover.Item>,
                ]}
            >
                <i className={"fa fa-question-circle-o"} style={{color:"red",marginLeft:"5px"}}></i>
            </Popover>
        }
        return "";
    };

    /**
     * 密码提示
     */
    passwordTip = () => {
        let tip = "";
        if (this.props.form.getFieldValue("password")) {
            if (this.state.passwordType == "password") {
                tip = <i className={"icon-eye"} onClick={this.changePasswordType}></i>
            } else {
                tip = <i className={"icon-lock"} onClick={this.changePasswordType}></i>
            }
        }
        if (this.fieldIsError("password")) {
            let errorTip = this.fieldErrorTip("password");
            return <span>{tip}{errorTip}</span>
        }
        return tip;
    };

    /**
     * 改变password的类型
     * @param e
     */
    changePasswordType = (e) => {
        e.preventDefault && e.preventDefault();
        let passwordType = "password";
        if (this.state.passwordType === "password") {
            passwordType = "text"
        }
        this.setState({
            passwordType: passwordType
        });
    };

    render() {
        let { getFieldProps,getFieldError } = this.props.form;
        let data = this.props.form.getFieldsValue();
        return (
            <div>
                <List>
                  {/*  <input {...getFieldProps('loginType',{initialValue:"mobile"})} type="hidden" />*/}
                    <InputItem
                        {...getFieldProps('account',{
                            initialValue:data.account,
                            rules: [
                                {required: true, message: '用户名不能为空!'},
                                {max: 30, message: '最多30位字符!'}
                            ]
                        })}
                        className={this.fieldIsErrorClassName()}
                        editable={true}
                        extra={this.fieldErrorTip("account")}
                        placeholder={"用户名"}
                    ><i className={"fa fa-user"}></i></InputItem>
                    <InputItem
                        {...getFieldProps('password',{
                            initialValue:data.password,
                            rules: [
                                {required: true, message: '密码不能为空!'},
                     /*           {min: 6, message: '密码长度最少6位!'},*/
                                {max: 30, message: '密码长度最多30位!'}
                            ]
                        })}
                        type={this.state.passwordType}
                        extra={this.passwordTip()}
                        editable={true}
                        placeholder={"密码"}
                    ><i className={"fa fa-lock"}></i></InputItem>
                    <PickerInputItem
                        form={this.props.form}
                        name={"sobCode"}
                        text={<i className={"fa fa-sitemap"}></i>}
                        title={"选择单位"}
                        style={{textAlign:"left"}}
                        data={this.state.sobCodeData}
                        value={data.sobCode || this.selectDefaultSobCode()}
                        cols={1}
                    />
                    <div className={"centerCheckbox"}>
                        <CheckBoxInputItem
                            form={this.props.form}
                            name={"rememberMe"}
                            text={""}
                            isRequired={false}
                            value={data.rememberMe}
                            data={[{label: "记住我", value:"1"}]}
                        />
                    </div>
                </List>
            </div>
        );
    }
}

const LoginFormWrapper = createForm()(LoginFormTemplate);
export default LoginFormWrapper;
