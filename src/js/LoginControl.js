import React, {Component} from 'react';
import {Toast, Button, Checkbox, WhiteSpace} from 'antd-mobile';
import LoginFormTemplate from './LoginFormTemplate';
import loginImg from '../image/logo.png';
console.log(loginImg)

class LoginControl extends Component {
    constructor(props) {
        super(props);
       /* document.title = "用户登录";*/
        this.state = {
            errorTip: ""
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
    }

    componentWillUnmount() {
        //this.serverRequest.abort();
        //this.props.history.push("taskList/1")
    }

    /**
     *  开始登录
     **/
    startLogin = (e) => {
        e.preventDefault && e.preventDefault();
        let formComponent = this.baseFormWrappedRef;
        if (formComponent.validateAll()) {
            this.doLogin(formComponent.getFormData());
        }
    };

    /**
     *  发起登录请求
     **/
    doLogin = (data) => {
        let self = this;

    };

    render() {
        return (
            <div className={"loginBgContainer"} style={{height:document.documentElement.clientHeight}}>
                <div className={"formContainer"}>
                    <img  src={loginImg} width={"200"} />
                    {
                        this.state.errorTip ?
                            <div className="error_top_container">
                                <i className={"fa fa-exclamation-circle "}></i> {this.state.errorTip}
                            </div> : ""
                    }
                    <LoginFormTemplate
                        parentControl={this}
                        wrappedComponentRef={(form) => this.baseFormWrappedRef = form}
                    />
                    <Button inline  type="primary" onClick={this.startLogin}>登录</Button>
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                </div>
            </div>
        )
    }
}

export default LoginControl;
