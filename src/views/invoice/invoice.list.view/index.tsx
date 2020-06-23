import React from "react";
import {useParams, withRouter} from "react-router";
import './index.scss';
import {push} from "@/util/RouterManager";
import NetworkInvoice from "@/network/NetworkInvoice";
import NumberTool from "@/tool/NumberTool";
import DateTool from "@/tool/DateTool";

const currHeight = {
    height: window.screen.height - 49 + 'px'
}

class InvoiceListView extends React.Component<any, {
    invoiceList: object,
    count: number,
    deliveryType: object
    invoiceType: object
}> {

    constructor(props) {
        super(props);
        this.state = {
            invoiceList: {},
            count: 0,
            deliveryType: {
                1: '纸质',
                2: '电子'
            },
            invoiceType: {
                1: '开票中',
                2: '开票成功',
                3: '开票失败'
            }
        }

    }

    componentDidMount() {
        this.fetchInvoiceList()
    }

    onClickDetail(type, invoiceId) {
        const {history} = this.props;
        push(history, '/invoice-detail', {
            invoiceType: type ? type : 0,
            invoiceId: invoiceId
        });
    }

    fetchInvoiceList() {
        NetworkInvoice.useParams('openId').invoiceList().then((ret) => {
            if (ret) {
                this.setState({
                    invoiceList: {
                        ...ret
                    },
                    count: Object.keys(ret).length
                })
            }
        }, err => {
            console.log(err)
        })
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

    renderInvoiceHistoty() {
        const {dataFormat, onClickDetail} = this;
        const {count, invoiceList, deliveryType, invoiceType} = this.state;
        const message = Object.keys(invoiceList).map((data, index) => {
            return (
                <div key={index}>
                    <div className="list-title">{data}</div>
                    {
                        invoiceList[data].map((data) => {
                            return (
                                <ul className="list-item" key={data.id}
                                    onClick={onClickDetail.bind(this, data.deliveryType, data.id)}>
                                    <li className="flex-middle-x">
                                        <div className="item-left ellipsis-text">{
                                            data.projectName
                                        }</div>
                                        <div className="item-right">
                                            <span className="invoice-type">
                                                {invoiceType[data.status]}
                                            </span>
                                            <img className="more-msg" src={require('../img/right-icon.png')}/>
                                        </div>
                                    </li>
                                    <li className="flex-middle-x">
                                        <div className="item-left">
                                            <img className="time-icon" src={require('../img/time-icon.png')}/>
                                            <span>
                                                {
                                                    dataFormat(data.createTime)
                                                }
                                            </span>
                                            {
                                                data.deliveryType ?
                                                    <span className="e-invoice">
                                                    {deliveryType[data.deliveryType]}
                                                    </span> :
                                                    ''
                                            }
                                        </div>
                                        <div className="item-right invoice-price">
                                            {
                                                NumberTool.fixDigits(data.amount / 100, 2)
                                            }
                                            元
                                        </div>
                                    </li>
                                </ul>
                            )
                        })
                    }
                </div>
            )
        })

        return (
            <div className="invoice-area">
                {
                    count ? <div>{message}</div> :
                        <div className="no-message flex-center-y">
                            暂无相关信息~
                        </div>
                }

            </div>
        )
    }

    render() {
        return (
            <div className="invoice-list" style={currHeight}>
                {this.renderInvoiceHistoty()}
            </div>
        )
    }
}

export default withRouter(InvoiceListView);
