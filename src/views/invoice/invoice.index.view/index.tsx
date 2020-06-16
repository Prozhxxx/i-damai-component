import React from "react";
import {useParams, withRouter} from "react-router";
import {push} from "@/util/RouterManager";
import Navigator from "@/components/navigatorInvoice";
import './index.scss';
const currHeight = {
    height: window.screen.height - 49 + 'px'
}
class InvoiceIndexView extends React.Component<any, {
    navigatorMessage: InvoiceNavigatorModel,
    isCheckedCo: boolean,
    showSubmitAlert: boolean,
    checkImg: string,
    checkedImg: string
}> {
    constructor(props) {
        super(props);
        this.state = {
            navigatorMessage: {
                isShowLeft: true,
                isShowCenter: true,
                centerText: '开发票',
                isShowRight: true,
                rightText: '开票历史'
            },
            isCheckedCo: true,
            showSubmitAlert: false,
            checkImg: require('./img/check.png'),
            checkedImg: require('./img/checked.png')
        }
    }

    onClickMoreInfo() {
        const {history} = this.props;
        push(history, '/invoice-moreinfo', {});
    }

    onClickCallback() {
        // const {history} = this.props;
        // push(history, '/invoice-moreinfo', {});
    }

    onClickShowAlert() {
        this.setState({
            showSubmitAlert: !this.state.showSubmitAlert
        })
    }

    onClickCheckBox() {
        this.setState({
            isCheckedCo: !this.state.isCheckedCo
        })
    }

    onClickHistoryInvoice() {
        const {history} = this.props;
        push(history, '/invoice-list', {});
    }
    onClickInvoiceSubmit() {
        const {history} = this.props;
        push(history, '/invoice-finish', {});
    }

    renderTicketMessage() {
        const {onClickMoreInfo,onClickCheckBox} = this;
        const {isCheckedCo, checkImg, checkedImg} = this.state;
        return (
            <div className="ticket-content">
                <div className="item-area flex-middle-x">
                    <div className="item-left">抬头类型</div>
                    <div className="item-right flex-middle-x title">
                        <img src={isCheckedCo ? checkedImg : checkImg} onClick={onClickCheckBox.bind(this)}/>
                        <span className="left-title">企业抬头</span>
                        <img src={isCheckedCo ? checkImg : checkedImg} onClick={onClickCheckBox.bind(this)}/>
                        <span> 个人/非企业抬头</span>
                    </div>
                </div>
                <div className="item-area flex-middle-x">
                    <div className="item-left">发票抬头</div>
                    <div className="item-right"><input type="text" placeholder="请填写发票抬头(必填)"/></div>
                </div>
                {
                    isCheckedCo ?
                        <div className="item-area flex-middle-x">
                            <div className="item-left">发票税号</div>
                            <div className="item-right"><input type="text" placeholder="请填写纳税人识别号(必填)"/></div>
                        </div> : ''
                }
                <div className="item-area flex-middle-x">
                    <div className="item-left">发票金额</div>
                    <div className="item-right title-price">88元</div>
                    <img className="item-icon" src={require('../img/right-icon.png')}/>
                </div>
                <div className="item-area last-item-area flex-middle-x">
                    <div className="item-left">更多信息</div>
                    <div className="item-right" onClick={onClickMoreInfo.bind(this)}>
                        <input type="text" placeholder="请备注、地址等信息(非必填)"/>
                    </div>
                </div>
            </div>
        )
    }

    renderUserMessage() {
        return (
            <div className="user-content">
                <div className="item-area flex-middle-x">
                    <div className="item-left">收件人</div>
                    <div className="item-right"><input type="text" placeholder="请填写收件人(必填)"/></div>
                </div>
                <div className="item-area flex-middle-x">
                    <div className="item-left">联系电话</div>
                    <div className="item-right"><input type="text" placeholder="请填写收件人联系电话(必填)"/></div>
                </div>
                <div className="item-area flex-middle-x">
                    <div className="item-left">电子邮箱</div>
                    <div className="item-right"><input type="text" placeholder="用于接收电子发票(必填)"/></div>
                </div>
                <div className="item-area flex-middle-x">
                    <div className="item-left">所在地区</div>
                    <img className="item-icon" src={require('../img/right-icon.png')}/>
                </div>
                <div className="item-area flex-middle-x">
                    <div className="item-left">街道</div>
                    <img className="item-icon" src={require('../img/right-icon.png')}/>
                </div>
                <div className="item-area last-item-area flex-middle-x">
                    <div className="item-left">详细地址</div>
                    <div className="item-right"><input type="text" placeholder="请填写详细地址，不少于4个字"/></div>
                </div>
            </div>
        )
    }

    renderButton() {
        const {onClickShowAlert} = this
        return (
            <div className="submit-btn flex-center-x">
                <div className="btn" onClick={onClickShowAlert.bind(this)}>
                    提交
                </div>
            </div>
        )
    }

    renderSubmitOrder() {
        const {showSubmitAlert} = this.state;
        const {onClickShowAlert,onClickInvoiceSubmit} = this;
        if (showSubmitAlert) {
            return (
                <div className="submit-order-content">
                    <div className="submit-content">
                        <div className="title flex-center-x">
                            确认提交
                            <img src={require('./img/close.png')} onClick={onClickShowAlert.bind(this)}/>
                        </div>
                        <div className="item-area flex-middle-x">
                            <div className="item-left">发票抬头</div>
                            <div className="item-right">XXXXXXXX</div>
                        </div>
                        <div className="item-area flex-middle-x">
                            <div className="item-left">发票税号</div>
                            <div className="item-right">XXXXXXXX</div>
                        </div>
                        <div className="item-area flex-middle-x">
                            <div className="item-left">电子邮箱</div>
                            <div className="item-right">XXXXXXXX</div>
                        </div>
                        <div className="item-area flex-middle-x">
                            <div className="item-left">收件地址</div>
                            <div className="item-right">XXXXXXXX</div>
                        </div>
                        <div className="item-area flex-middle-x">
                            <div className="item-left">快递费用</div>
                            <div className="item-right">顺丰倒付</div>
                        </div>
                        <div className="last-item-area item-area tip ">
                            请确认邮箱无误，纸质发票将在系统开具后通过快递邮寄给您，请注意查收（快递费用需本人承担）
                        </div>
                        <div className="btn" onClick={onClickInvoiceSubmit.bind(this)}>
                            提交
                        </div>
                    </div>
                </div>
            )
        } else {
            return ''
        }

    }

    render() {
        return (
            <div className="invoice-index-view" style={currHeight}>
                <Navigator navigatorMessage={this.state.navigatorMessage}
                           onClickCallback={() => this.onClickCallback()}
                           onClickOther={() => this.onClickHistoryInvoice()}>
                </Navigator>
                {this.renderTicketMessage()}
                {this.renderUserMessage()}
                {this.renderButton()}
                {this.renderSubmitOrder()}
            </div>
        )
    }
}

export default withRouter(InvoiceIndexView);
