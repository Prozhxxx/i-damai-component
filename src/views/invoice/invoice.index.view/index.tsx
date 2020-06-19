import React from "react";
import {useParams, withRouter} from "react-router";
import {pop, push} from "@/util/RouterManager";
import Navigator from "@/components/navigatorInvoice";
import CityScroll from "@/components/invoiceCityScrioll";
import InvoiceMoreInfo from "@/components/invoiceMoreInfo";
import StringTool from "@/tool/StringTool";
import './index.scss';
import NetworkInvoice from "@/network/NetworkInvoice";
import {object} from "prop-types";

const currHeight = {
    height: window.screen.height - 49 + 'px'
}

type srcollF = () => void;

class InvoiceIndexView extends React.Component<any, {
    navigatorMessage: InvoiceNavigatorModel,
    invoiceMessage: ApplyForInvoice,
    moreInfo: InvoiceMoreInfos
    moreInfoString: string
    isCheckedCo: boolean,
    showSubmitAlert: boolean,
    showMoreInfo: boolean,
    showCityAlert: boolean,
    checkImg: string,
    checkedImg: string
}> {
    constructor(props) {
        super(props);
        this.state = {
            navigatorMessage: {
                isShowLeft: false,
                isShowCenter: true,
                centerText: '开发票',
                isShowRight: true,
                rightText: '开票历史'
            },
            invoiceMessage: {
                deliveryType: 0,
                type: 0,
                title: '',
                taxNo: '',
                name: '',
                phone: 0,
                area: '',
                address: '',
                email: '',
                remark: ''
            },
            isCheckedCo: true,
            showMoreInfo: false,
            moreInfo: {
                registerAddr: '',
                registerTel: 0,
                registerBank: '',
                bankNo: 0,
                message: ''
            },
            moreInfoString: '',
            showSubmitAlert: false,
            showCityAlert: false,
            checkImg: require('./img/check.png'),
            checkedImg: require('./img/checked.png')
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(key, event) {
        const target = event.target;
        const value = target.value;
        this.setState({
            invoiceMessage: {
                ...this.state.invoiceMessage,
                [key]: value
            }
        });
    }


    moreInfoMessage(data) {
        this.setState({
                moreInfo: {
                    ...data
                }
            },
            () => {
                const {moreInfo} = this.state;
                this.onClickMoreInfo();
                if (!moreInfo.registerAddr && !moreInfo.registerTel && !moreInfo.registerBank && !moreInfo.bankNo && !moreInfo.message) {
                    return
                }
                this.setState({
                    moreInfoString: `${moreInfo.registerAddr ? '注册地址：' : ''}${moreInfo.registerAddr}${moreInfo.registerTel ? '注册电话：' : ''}${moreInfo.registerTel || ''}
                    ${moreInfo.registerBank ? '开户银行：' : ''}${moreInfo.registerBank}${moreInfo.bankNo ? '银行账号：' : ''}${moreInfo.bankNo || ''}`
                })
            }
        )
    }

    onClickMoreInfo() {
        this.setState({
            showMoreInfo: !this.state.showMoreInfo
        })
    }

    onClickShowSubmitAlert() {
        const {invoiceMessage} = this.state;
        // if (!StringTool.isMobile(invoiceMessage.phone.toString())) {
        //     console.log('请输入正确手机号');
        //     this.setState({
        //         invoiceMessage: {
        //             ...invoiceMessage,
        //             phone: 0
        //         }
        //     });
        //     return
        // }
        this.setState({
            showSubmitAlert: !this.state.showSubmitAlert
        })
    }

    onClickCityAlert() {
        console.log(this.state.showCityAlert);
        this.setState({
            showCityAlert: !this.state.showCityAlert
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
        const {isCheckedCo, invoiceMessage, moreInfo} = this.state;
        NetworkInvoice.useParams('openId').applyForInvoice({
            type: isCheckedCo ? 1 : 2,
            title: invoiceMessage.title,
            taxNo: invoiceMessage.taxNo,
            orderId: '325956835171368960',
            name: invoiceMessage.name,
            phone: invoiceMessage.phone,
            area: '上海市闵行区', // invoiceMessage.area,
            address: '宜山路1618号c308',// invoiceMessage.address,
            email: invoiceMessage.email,
            remark: invoiceMessage.remark,
            registerAddress: moreInfo.registerAddr,
            registerPhone: moreInfo.registerTel,
            openBank: moreInfo.registerBank,
            bankCard: moreInfo.bankNo
        }).then((ret) => {
            console.log(ret);
            push(history, '/invoice-finish', {});
        }, err => {
            console.log(err)
        })
    }

    renderInvoiceMessage() {
        const {onClickMoreInfo, onClickCheckBox} = this;
        const {isCheckedCo, checkImg, checkedImg, moreInfoString} = this.state;
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
                    <div className="item-right">
                        <input type="text" name="title"
                               onChange={e => {
                                   this.handleInputChange('title', e)
                               }}
                               placeholder="请填写发票抬头(必填)"/></div>
                </div>
                {
                    isCheckedCo ?
                        <div className="item-area flex-middle-x">
                            <div className="item-left">发票税号</div>
                            <div className="item-right"><input type="text" name="taxNo"
                                                               onChange={e => {
                                                                   this.handleInputChange('taxNo', e)
                                                               }}
                                                               placeholder="请填写纳税人识别号(必填)"/></div>
                        </div> : ''
                }
                <div className="item-area flex-middle-x">
                    <div className="item-left">发票金额</div>
                    <div className="item-right title-price">88元</div>
                </div>
                <div className="item-area last-item-area flex-middle-x">
                    <div className="item-left">更多信息</div>
                    <div className="item-right ellipsis-text" onClick={onClickMoreInfo.bind(this)}>
                        {
                            moreInfoString ? moreInfoString :
                                <input type="text" placeholder="请备注、地址等信息(非必填)"/>
                        }
                    </div>
                </div>
            </div>
        )
    }

    renderUserMessage() {
        const {onClickCityAlert, onClickShowSubmitAlert} = this
        return (
            <div>
                <div className="user-content">
                    <div className="item-area flex-middle-x">
                        <div className="item-left">收件人</div>
                        <div className="item-right"><input type="text" name="name"
                                                           onChange={e => {
                                                               this.handleInputChange('name', e)
                                                           }}
                                                           placeholder="请填写收件人(必填)"/></div>
                    </div>
                    <div className="item-area flex-middle-x">
                        <div className="item-left">联系电话</div>
                        <div className="item-right"><input type="tel" name="phone"
                                                           onChange={e => {
                                                               this.handleInputChange('phone', e)
                                                           }}
                                                           placeholder="请填写收件人联系电话(必填)"/>
                        </div>
                    </div>
                    <div className="item-area flex-middle-x">
                        <div className="item-left">电子邮箱</div>
                        <div className="item-right"><input type="text" name="email"
                                                           onChange={e => {
                                                               this.handleInputChange('email', e)
                                                           }}
                                                           placeholder="用于接收电子发票(必填)"/></div>
                    </div>
                    <div className="item-area flex-middle-x" onClick={onClickCityAlert.bind(this)}>
                        <div className="item-left">所在地区</div>
                        <img className="item-icon" src={require('../img/right-icon.png')}/>
                    </div>
                    <div className="item-area last-item-area flex-middle-x">
                        <div className="item-left">详细地址</div>
                        <div className="item-right"><input type="text" name="address"
                                                           onChange={e => {
                                                               this.handleInputChange('address', e)
                                                           }}
                                                           placeholder="请填写详细地址，不少于4个字"/></div>
                    </div>
                </div>
                <div className="submit-btn flex-center-x">
                    <div className="btn" onClick={onClickShowSubmitAlert.bind(this)}>
                        提交
                    </div>
                </div>
            </div>
        )
    }

    renderSubmiInvoiceMessage() {
        const {isCheckedCo, showSubmitAlert, invoiceMessage} = this.state;
        const {onClickShowSubmitAlert, onClickInvoiceSubmit} = this;
        return (
            showSubmitAlert ? <div className="alert-content">
                <div className="submit-content">
                    <div className="title flex-center-x">
                        确认提交
                        <img src={require('./img/close.png')} onClick={onClickShowSubmitAlert.bind(this)}/>
                    </div>
                    <div className="item-area flex-middle-x">
                        <div className="item-left">发票抬头</div>
                        <div className="item-right">{invoiceMessage.title}</div>
                    </div>
                    {
                        isCheckedCo ?
                            <div className="item-area flex-middle-x">
                                <div className="item-left">发票税号</div>
                                <div className="item-right">{invoiceMessage.taxNo}</div>
                            </div> : ''
                    }
                    <div className="item-area flex-middle-x">
                        <div className="item-left">电子邮箱</div>
                        <div className="item-right">{invoiceMessage.email}</div>
                    </div>
                    <div className="item-area flex-middle-x">
                        <div className="item-left">收件地址</div>
                        <div className="item-right">{invoiceMessage.address}</div>
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
            </div> : ''
        )
    }

    render() {
        const {navigatorMessage, showCityAlert, showMoreInfo, moreInfo} = this.state;
        const {onClickHistoryInvoice, onClickCityAlert, onClickMoreInfo, moreInfoMessage} = this;
        return (
            <div className="invoice-index-view" style={currHeight}>
                {
                    showMoreInfo ?
                        <InvoiceMoreInfo moreInfo={moreInfo} showInfo={onClickMoreInfo.bind(this)}
                                         infoFn={moreInfoMessage.bind(this)}></InvoiceMoreInfo> :
                        <div>
                            <Navigator navigatorMessage={navigatorMessage}
                                       onClickOther={onClickHistoryInvoice.bind(this)}>
                            </Navigator>
                            {this.renderInvoiceMessage()}
                            {this.renderUserMessage()}
                            {this.renderSubmiInvoiceMessage()}
                            <CityScroll showCityAlert={showCityAlert}
                                        onClickShow={onClickCityAlert.bind(this)}>
                            </CityScroll>
                        </div>

                }
            </div>
        )
    }
}

export default withRouter(InvoiceIndexView);
