import React from "react";
import {useParams, withRouter} from "react-router";
// import Navigator from "@/components/navigatorInvoice";
import './index.scss';
import {push} from "@/util/RouterManager";
import {navigatorWrapper} from "@/components/NavigatorWrapper";

class InvoiceListView extends React.Component<any, {
    // navigatorMessage: InvoiceNavigatorModel,
}> {
    constructor(props) {
        super(props);
        this.state = {
            // navigatorMessage: {
            //     isShowLeft: true,
            //     isShowCenter: true,
            //     centerText: '开票历史',
            //     isShowRight: false
            // }
        }
    }

    onClickCallback() {
        const {history} = this.props;
        push(history, '/invoice-index', {});
    }

    onClickDetail(type) {
        const {history} = this.props;
        push(history, '/invoice-detail', {
            invoiceType: type
        });
    }

    renderInvoiceHistoty() {
        const {onClickDetail} = this;
        return (
            <div className="invoice-area">
                <div>
                    <div className="list-title">2020年4月</div>
                    <ul className="list-item" onClick={onClickDetail.bind(this, 1)}>
                        <li className="flex-middle-x">
                            <div className="item-left ellipsis-text">【上海】「限时赠礼！火热预售」莫奈</div>
                            <div className="item-right">
                                <span className="invoice-type">申请中</span>
                                <img className="more-msg" src={require('../img/right-icon.png')}/>
                            </div>
                        </li>
                        <li className="flex-middle-x">
                            <div className="item-left">
                                <img className="time-icon" src={require('../img/time-icon.png')}/>
                                <span>2020年03月28日 21:47</span>
                                <span className="e-invoice">电子</span>
                            </div>
                            <div className="item-right invoice-price">88元</div>
                        </li>
                    </ul>
                    <ul className="list-item" onClick={onClickDetail.bind(this, 2)}>
                        <li className="flex-middle-x">
                            <div className="item-left ellipsis-text">【上海】「限时赠礼！火热预售」莫奈</div>
                            <div className="item-right">
                                <span className="invoice-type">开票失败</span>
                                <img className="more-msg" src={require('../img/right-icon.png')}/>
                            </div>
                        </li>
                        <li className="flex-middle-x">
                            <div className="item-left">
                                <img className="time-icon" src={require('../img/time-icon.png')}/>
                                <span>2020年03月28日 21:47</span>
                                <span className="e-invoice">纸质</span>
                            </div>
                            <div className="item-right invoice-price">88元</div>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="list-title">2020年5月</div>
                    <ul className="list-item"  onClick={onClickDetail.bind(this, 1)}>
                        <li className="flex-middle-x">
                            <div className="item-left ellipsis-text">【上海】「限时赠礼！火热预售」莫奈</div>
                            <div className="item-right">
                                <span className="invoice-type">开票成功</span>
                                <img className="more-msg" src={require('../img/right-icon.png')}/>
                            </div>
                        </li>
                        <li className="flex-middle-x">
                            <div className="item-left">
                                <img className="time-icon" src={require('../img/time-icon.png')}/>
                                <span>2020年03月28日 21:47</span>
                                <span className="e-invoice">电子</span>
                            </div>
                            <div className="item-right invoice-price">88元</div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="invoice-list">
                {/*<Navigator navigatorMessage={this.state.navigatorMessage}*/}
                           {/*onClickCallback={() => this.onClickCallback()}></Navigator>*/}
                {this.renderInvoiceHistoty()}
            </div>
        )
    }
}

export default withRouter(navigatorWrapper(InvoiceListView, '开票历史'));
