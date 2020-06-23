import React, {ReactNode} from "react";
import {withRouter} from "react-router";
import './index.scss';
import {getParams, push} from "@/util/RouterManager";
import NetworkInvoice from "@/network/NetworkInvoice";
import NumberTool from "@/tool/NumberTool";
import DateTool from "@/tool/DateTool";

const currHeight = {
    height: window.screen.height - 49 + 'px'
}

class InvoiceDetailView extends React.Component<any, {
    invoiceType: number
    invoiceMsg: ApplyForInvoice
}> {
    constructor(props) {
        super(props);
        this.state = {
            invoiceType: 0,
            invoiceMsg: {
                deliveryType: 0,
                type: 0,
                title: '',
                taxNo: '',
                name: '',
                phone: '',
                area: '',
                address: '',
                email: '',
                remark: '',
                createTime: '',
                amount: 0,
                projectName: '',
                tails: {
                    statusCN: ''
                }
            },
        }
    }

    componentDidMount() {
        const {invoiceType} = getParams(this.props.location)
        this.setState({
            invoiceType: invoiceType
        })
        this.fetchInvoiceDetail();
    }

    fetchInvoiceDetail() {
        const {invoiceId} = getParams(this.props.location);
        NetworkInvoice.useParams('openId').invoiceDetail({invoiceId: invoiceId}).then((ret) => {
            this.setState({
                invoiceMsg: {
                    ...ret
                }
            })
        }, err => {
            console.log(err);
        })

    }

    onClickCopy() {
        // 复制
    }

    onClickOrderDetail(orderId) {
        const {history} = this.props;
        push(history, '/order-detail', {
            orderId: orderId
        });
    }

    dataFormat(time) {
        const timeStr = DateTool.dateStringFromTimeInterval(time / 1000, 'YYYY-MM-DD HH:mm');
        const timeArray = timeStr.split(' ').map((data, index) => {
            if (index === 0) {
                return data.split('-').map((ret) => ret)
            } else {
                return data
            }
        })
        return `${timeArray[0][0]}年${timeArray[0][1]}月${timeArray[0][2]}日${timeArray[1]}`;
    }

    renderEInvoiceDetail() {
        const {dataFormat, onClickOrderDetail} = this;
        const {invoiceMsg} = this.state;
        return (
            <div className="e-invoice">
                <div className="single-title flex-middle-x">
                    <div className="left-item">
                        {invoiceMsg.tails.statusCN}
                    </div>
                    <div className="right-item">电子发票发送至您的邮箱</div>
                </div>
                <div className="nav-title">
                    接收方式
                </div>
                <div className="single-title flex-middle-x">
                    <div className="left-item">电子邮箱</div>
                    <div className="email-item">
                        {invoiceMsg.email}
                    </div>
                </div>
                <div className="nav-title">
                    发票信息
                </div>
                <ul className="invoice-order-detail">
                    <li className="flex-middle-x">
                        <div className="left-item">发票抬头</div>
                        <div className="right-item">{invoiceMsg.title}</div>
                    </li>
                    {invoiceMsg.taxNo ? <li className="flex-middle-x">
                        <div className="left-item">发票税号</div>
                        <div className="right-item">{invoiceMsg.taxNo}</div>
                    </li> : ''}
                    <li className="flex-middle-x">
                        <div className="left-item">发票内容</div>
                        <div className="right-item">娱乐</div>
                    </li>
                    <li className="flex-middle-x">
                        <div className="left-item">发票金额</div>
                        <div className="price-item">
                            {NumberTool.fixDigits(invoiceMsg.amount / 100, 2)}<span>元</span>
                        </div>
                    </li>
                    <li className="flex-middle-x">
                        <div className="left-item">申请时间</div>
                        <div className="right-item">{dataFormat(invoiceMsg.createTime)}</div>
                    </li>
                </ul>
                <div className="single-title top10 flex-middle-x"
                     onClick={onClickOrderDetail.bind(this, invoiceMsg.orderId)}>
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
        const {onClickCopy, onClickOrderDetail, dataFormat} = this;
        const {invoiceMsg} = this.state;
        return (
            <div className="paper-invoice">
                <div className="nav-title">
                    收件信息
                </div>
                <ul className="invoice-order-detail">
                    <li className="flex-middle-x">
                        <div className="left-item">快递公司</div>
                        <div className="right-item">顺丰</div>
                    </li>
                    {
                        invoiceMsg.expressNo ? <li className="flex-middle-x">
                            <div className="left-item">快递单号</div>
                            <div className="right-item">{invoiceMsg.expressNo} <span className="copy-btn"
                                                                                     onClick={onClickCopy.bind(this)}>复制</span>
                            </div>
                        </li> : ''
                    }
                    <li className="flex-middle-x">
                        <div className="left-item">收件人</div>
                        <div className="right-item">{invoiceMsg.name}</div>
                    </li>
                    <li className="flex-middle-x">
                        <div className="left-item">电话号码</div>
                        <div className="right-item">{invoiceMsg.phone}</div>
                    </li>
                    <li className="flex-middle-x">
                        <div className="left-item">地址</div>
                        <div className="right-item">{invoiceMsg.area}{invoiceMsg.address}</div>
                    </li>
                </ul>
                <div className="nav-title">
                    发票信息
                </div>
                <ul className="invoice-order-detail">
                    <li className="flex-middle-x">
                        <div className="left-item">发票抬头</div>
                        <div className="right-item">{invoiceMsg.title}</div>
                    </li>
                    {invoiceMsg.taxNo ? <li className="flex-middle-x">
                        <div className="left-item">发票税号</div>
                        <div className="right-item">{invoiceMsg.taxNo}</div>
                    </li> : ''}
                    <li className="flex-middle-x">
                        <div className="left-item">发票内容</div>
                        <div className="right-item">{invoiceMsg.projectName}</div>
                    </li>
                    <li className="flex-middle-x">
                        <div className="left-item">发票金额</div>
                        <div className="price-item">
                            {NumberTool.fixDigits(invoiceMsg.amount / 100, 2)}<span>元</span>
                        </div>
                    </li>
                    <li className="flex-middle-x">
                        <div className="left-item">申请时间</div>
                        <div className="right-item">{dataFormat(invoiceMsg.createTime)}</div>
                    </li>
                </ul>
                <div className="single-title top10 flex-middle-x"
                     onClick={onClickOrderDetail.bind(this, invoiceMsg.orderId)}>
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

export default withRouter(InvoiceDetailView);
