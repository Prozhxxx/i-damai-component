import React, {ReactNode} from "react";
import {useParams, withRouter} from "react-router";
// import Navigator from "@/components/navigatorInvoice";
import './index.scss';
import {getParams, push} from "@/util/RouterManager";
import {number} from "prop-types";
import {navigatorWrapper} from "@/components/NavigatorWrapper";
const currHeight = {
    height: window.screen.height - 49 + 'px'
}
class InvoiceDetailView extends React.Component<any, {
    invoiceType: number
}> {
    constructor(props) {
        super(props);
        this.state = {
            invoiceType: 0
        }
    }

    componentDidMount(): void {
        const {invoiceType} = getParams(this.props.location)
        this.setState({
            invoiceType: invoiceType
        })
    }

    onClickCopy() {
        // 复制
    }

    renderEInvoiceDetail() {
        return (
            <div className="e-invoice">
                <div className="single-title flex-middle-x">
                    <div className="left-item">已开票</div>
                    <div className="right-item">电子发票发送至您的邮箱</div>
                </div>
                <div className="nav-title">
                    接收方式
                </div>
                <div className="single-title flex-middle-x">
                    <div className="left-item">电子邮箱</div>
                    <div className="email-item">
                        913488395@qq.com
                    </div>
                </div>
                <div className="nav-title">
                    发票信息
                </div>
                <ul className="invoice-order-detail">
                    <li className="flex-middle-x">
                        <div className="left-item">发票抬头</div>
                        <div className="right-item">上海XXXXXX</div>
                    </li>
                    <li className="flex-middle-x">
                        <div className="left-item">发票税号</div>
                        <div className="right-item">3783784837</div>
                    </li>
                    <li className="flex-middle-x">
                        <div className="left-item">发票内容</div>
                        <div className="right-item">娱乐</div>
                    </li>
                    <li className="flex-middle-x">
                        <div className="left-item">发票金额</div>
                        <div className="price-item">
                            2384 <span>元</span>
                        </div>
                    </li>
                    <li className="flex-middle-x">
                        <div className="left-item">申请时间</div>
                        <div className="right-item">2020年4月6日 18:33</div>
                    </li>
                </ul>
                <div className="single-title top10 flex-middle-x">
                    <div className="left-item">演出订单</div>
                    <div className="right-item">
                        <img className="icon" src={require('../img/right-icon.png')}/>
                    </div>
                </div>
                <div className="single-title top10 flex-middle-x">
                    <div className="left-item">联系客服</div>
                    <div className="right-item">021-263323131</div>
                </div>
            </div>
        )
    }

    renderPaperInvoiceDetail() {
        const {onClickCopy} = this;
        return (
            <div className="paper-invoice">
                <div className="single-title flex-middle-x">
                    <div className="left-item">已开票</div>
                    <div className="right-item">电子发票发送至您的邮箱</div>
                </div>
                <div className="nav-title">
                    收件信息
                </div>
                <ul className="invoice-order-detail">
                    <li className="flex-middle-x">
                        <div className="left-item">快递公司</div>
                        <div className="right-item">顺丰</div>
                    </li>
                    <li className="flex-middle-x">
                        <div className="left-item">快递单号</div>
                        <div className="right-item">3783784837 <span className="copy-btn"
                                                                     onClick={onClickCopy.bind(this)}>复制</span></div>
                    </li>
                </ul>
                <div className="single-title top10 flex-middle-x">
                    <div className="left-item">演出订单</div>
                    <div className="right-item">
                        <img className="icon" src={require('../img/right-icon.png')}/>
                    </div>
                </div>
                <div className="single-title top10 flex-middle-x">
                    <div className="left-item">联系客服</div>
                    <div className="right-item">021-263323131</div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="invoice-detail" style={currHeight}>
                {
                    this.state.invoiceType == 1 ? this.renderEInvoiceDetail() : this.renderPaperInvoiceDetail()
                }

            </div>
        )
    }
}

export default withRouter(navigatorWrapper(InvoiceDetailView, '发票详情'));
