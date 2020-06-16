import React from "react";
import {useParams, withRouter} from "react-router";
// import Navigator from "@/components/navigatorInvoice";
import './index.scss';
import {push} from "@/util/RouterManager";
import {navigatorWrapper} from "@/components/NavigatorWrapper";

class InvoiceMoreInfoView extends React.Component<any, {
    // navigatorMessage: InvoiceNavigatorModel,
}> {
    constructor(props) {
        super(props);
        this.state = {
            // navigatorMessage: {
            //     isShowLeft: true,
            //     isShowCenter: true,
            //     centerText: '更多信息',
            //     isShowRight: false
            // }
        }
    }

    onClickCallback(){
        const {history} = this.props;
        push(history, '/invoice-index', {});
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
            <div className="invoice-more-info">
                {/*<Navigator navigatorMessage={this.state.navigatorMessage}*/}
                           {/*onClickCallback={() => this.onClickCallback()}></Navigator>*/}
                {this.renderTicketMessage()}
                {this.renderButton()}
            </div>
        )
    }
}

export default withRouter(navigatorWrapper(InvoiceMoreInfoView, '更多信息'));
