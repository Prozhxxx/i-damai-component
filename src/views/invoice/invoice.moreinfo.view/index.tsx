import React from "react";
import {useParams, withRouter} from "react-router";
// import Navigator from "@/components/navigatorInvoice";
import './index.scss';
import {push} from "@/util/RouterManager";
import {navigatorWrapper} from "@/components/NavigatorWrapper";
const currHeight = {
    height: window.screen.height - 49 + 'px'
}
class InvoiceMoreInfoView extends React.Component<any, {}> {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderTicketMessage() {
        return (
            <div className="info-content">
                <div className="item-area flex-middle-x">
                    <div className="item-left">注册地址</div>
                    <div className="item-right"><input type="text"/></div>
                </div>
                <div className="item-area flex-middle-x">
                    <div className="item-left">注册电话</div>
                    <div className="item-right"><input type="text"/></div>
                </div>
                <div className="item-area flex-middle-x">
                    <div className="item-left">开户银行</div>
                    <div className="item-right"><input type="text"/></div>
                </div>
                <div className="item-area flex-middle-x">
                    <div className="item-left">银行账号</div>
                    <div className="item-right"><input type="text"/></div>
                </div>
                <div className="item-area last-item-area flex-middle-x">
                    <div className="item-left">备注信息</div>
                    <div className="item-right">
                        <input type="text"/>
                    </div>
                </div>
            </div>
        )
    }

    renderButton() {
        return (
            <div className="submit-btn flex-center-x">
                <div className="btn ">
                    提交
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="invoice-more-info" style={currHeight}>
                {this.renderTicketMessage()}
                {this.renderButton()}
            </div>
        )
    }
}

export default withRouter(navigatorWrapper(InvoiceMoreInfoView, '更多信息'));
