import React from "react";
import {useParams, withRouter} from "react-router";
import {push} from "@/util/RouterManager";
import Navigator from "@/components/navigatorInvoice";
import './index.scss';

class InvoiceIndexView extends React.Component<any, {
    navigatorMessage: InvoiceNavigatorModel,
    showSubmitAlert: Boolean
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
            showSubmitAlert: false
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

    onClickHistoryInvoice() {
        const {history} = this.props;
        push(history, '/invoice-list', {});
    }

    renderTicketMessage() {
        const {onClickMoreInfo} = this;
        return (
            <div className="ticket-content">
                <div className="item-area flex-middle-x">
                    <div className="item-left">抬头类型</div>
                    <div className="item-right flex-middle-x title">
                        <img src={require('./img/check.png')}/>
                        <span className="left-title">企业抬头</span>
                        <img src={require('./img/check.png')}/>
                        <span> 个人/非企业抬头</span>
                    </div>
                </div>
                <div className="item-area flex-middle-x">
                    <div className="item-left">发票抬头</div>
                    <div className="item-right"><input type="text" placeholder="请填写发票抬头(必填)"/></div>
                </div>
                <div className="item-area flex-middle-x">
                    <div className="item-left">发票税号</div>
                    <div className="item-right"><input type="text" placeholder="请填写纳税人识别号(必填)"/></div>
                </div>
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
        if (showSubmitAlert) {
            return (
               <div className="submit-order-content">
                   <div className="submit-content">
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
                   </div>
               </div>
            )
        } else {
            return ''
        }

    }

    render() {
        return (
            <div className="invoice-index-view">
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
