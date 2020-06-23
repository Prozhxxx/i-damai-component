import React from "react";
import {withRouter} from 'react-router';
import {getParams, pop, push} from "@/util/RouterManager";
import InvoiceMoreInfo from "@/components/invoiceMoreInfo";
import StringTool from "@/tool/StringTool";
import './index.scss';
import NetworkInvoice from "@/network/NetworkInvoice";
import NetworkCity from "@/network/NetworkCity";
import CityPicker from "@/components/city.picker";
import RouterManager from "@/util/RouterManager";
import AlertManager from "@/util/AlertManager";
import NumberTool from "@/tool/NumberTool";

const currHeight = {
    height: window.screen.height - 49 + 'px'
}

let currProps;

class InvoiceIndexView extends React.Component<any, {
    cityTree: any,
    province: ProvinceTreeModel,
    city: CityTreeModel,
    area: AreaTreeModel,
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
        currProps = this.props;
        this.state = {
            cityTree: null,
            province: null,
            city: null,
            area: null,
            invoiceMessage: {
                deliveryType: 0,
                type: 0,
                title: '',
                taxNo: '',
                name: '',
                phone: '',
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

    componentDidMount(): void {
        NetworkCity.cityTree().then(cityTree => {
            this.setState({
                cityTree,
                province: cityTree?.[0],
                city: cityTree?.[0].cityList?.[0],
                area: cityTree?.[0].cityList?.[0].areaList?.[0],
            });
        }, error => {
            console.log(error);
        })
        this.navRightItem()
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

    onHandleCityPickerChange(type, obj, update) {
        let {province, city, area, cityTree} = this.state;
        if (type === 'province') {
            province = obj;
            city = province?.cityList?.[0];
            area = city?.areaList?.[0];
        }
        if (type === 'city') {
            city = obj;
            area = city?.areaList?.[0];
        }
        if (type === 'area') {
            area = obj;
        }
        console.log(province, city, area)
        this.setState({
            province,
            city,
            area
        });
    }

    navRightItem() {
        RouterManager.updateNavigatorItem(null,
            <div className="nav-right" onClick={() => {
                const {history} = this.props;
                push(history, '/invoice-list');
            }}>
                开票历史
            </div>)
    }

    onShowAlert(message) {
        AlertManager.showAlert(message)
    }

    moreInfoMessage(data) {
        this.setState({
                moreInfo: data
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
        const {isCheckedCo, invoiceMessage} = this.state;
        if (StringTool.isEmpty(invoiceMessage.title)) {
            this.onShowAlert('请填写发票抬头');
            return
        }
        if (isCheckedCo && StringTool.isEmpty(invoiceMessage.taxNo)) {
            this.onShowAlert('请填写发票税号');
            return
        }
        if (StringTool.isEmpty(invoiceMessage.name)) {
            this.onShowAlert('请填写收件人');
            return
        }
        if (StringTool.isEmpty(invoiceMessage.area)) {
            this.onShowAlert('请选择所在地区');
            return
        }
        if (StringTool.isEmpty(invoiceMessage.address)) {
            this.onShowAlert('详细地址不少于4个字');
            return
        }
        if (!invoiceMessage.email || !StringTool.isEmail(invoiceMessage.email)) {
            this.onShowAlert('请输入正确邮箱');
            this.setState({
                invoiceMessage: {
                    ...invoiceMessage,
                    email: ''
                }
            });
            return
        }
        if (!invoiceMessage.phone || !StringTool.isMobile(invoiceMessage.phone.toString())) {
            this.onShowAlert('请输入正确手机号');
            this.setState({
                invoiceMessage: {
                    ...invoiceMessage,
                    phone: ''
                }
            });
            return
        }
        this.setState({
            showSubmitAlert: !this.state.showSubmitAlert
        })
    }

    onClickCityAlert() {
        this.setState({
            showCityAlert: !this.state.showCityAlert
        })
    }

    onClickCheckedCity() {
        const {province, city, area} = this.state;
        this.setState({
            showCityAlert: false,
            invoiceMessage: {
                ...this.state.invoiceMessage,
                area: province.name + city.name + area.name
            }
        })
        console.log(this.state.invoiceMessage)
    }

    onClickCheckBox() {
        this.setState({
            isCheckedCo: !this.state.isCheckedCo
        })
    }

    onClickInvoiceSubmit() {
        const {history} = this.props;
        const {isCheckedCo, invoiceMessage, moreInfo} = this.state;
        const {orderId} = getParams(this.props.location);
        NetworkInvoice.useParams('openId').applyForInvoice({
            type: isCheckedCo ? 1 : 2,
            title: invoiceMessage.title,
            taxNo: invoiceMessage.taxNo,
            orderId: '325350381930414080', //  orderId,
            name: invoiceMessage.name,
            phone: invoiceMessage.phone,
            area: invoiceMessage.area,
            address: invoiceMessage.address,
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
        const {invoiceMessage, isCheckedCo, checkImg, checkedImg, moreInfoString} = this.state;
        const {price} = getParams(this.props.location);
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
                               value={invoiceMessage.title}
                               onChange={e => {
                                   this.handleInputChange('title', e)
                               }}
                               placeholder="请填写发票抬头(必填)"/></div>
                </div>
                {
                    isCheckedCo &&
                    <div className="item-area flex-middle-x">
                        <div className="item-left">发票税号</div>
                        <div className="item-right"><input type="text" name="taxNo"
                                                           value={invoiceMessage.taxNo}
                                                           onChange={e => {
                                                               this.handleInputChange('taxNo', e)
                                                           }}
                                                           placeholder="请填写纳税人识别号(必填)"/></div>
                    </div>
                }
                <div className="item-area flex-middle-x">
                    <div className="item-left">发票金额</div>
                    <div className="item-right title-price">
                        {NumberTool.fixNumberTo(price ? price / 100 : 0, 2)}
                        元
                    </div>
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
        const {invoiceMessage} = this.state
        return (
            <div>
                <div className="user-content">
                    <div className="item-area flex-middle-x">
                        <div className="item-left">收件人</div>
                        <div className="item-right"><input type="text" name="name"
                                                           value={invoiceMessage.name}
                                                           onChange={e => {
                                                               this.handleInputChange('name', e)
                                                           }}
                                                           placeholder="请填写收件人(必填)"/></div>
                    </div>
                    <div className="item-area flex-middle-x">
                        <div className="item-left">联系电话</div>
                        <div className="item-right"><input type="tel" name="phone"
                                                           value={invoiceMessage.phone}
                                                           onChange={e => {
                                                               this.handleInputChange('phone', e)
                                                           }}
                                                           placeholder="请填写收件人联系电话(必填)"/>
                        </div>
                    </div>
                    <div className="item-area flex-middle-x">
                        <div className="item-left">电子邮箱</div>
                        <div className="item-right"><input type="text" name="email"
                                                           value={invoiceMessage.email}
                                                           onChange={e => {
                                                               this.handleInputChange('email', e)
                                                           }}
                                                           placeholder="用于接收电子发票(必填)"/></div>
                    </div>
                    <div className="item-area flex-middle-x" onClick={onClickCityAlert.bind(this)}>
                        <div className="item-left">所在地区</div>
                        <div className="item-right ellipsis-text">{invoiceMessage.area}</div>
                        <img className="item-icon" src={require('../img/right-icon.png')}/>
                    </div>
                    <div className="item-area last-item-area flex-middle-x">
                        <div className="item-left">详细地址</div>
                        <div className="item-right"><input type="text" name="address"
                                                           value={invoiceMessage.address}
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

    renderSubmitInvoiceMessage() {
        const {isCheckedCo, showSubmitAlert, invoiceMessage} = this.state;
        const {onClickShowSubmitAlert, onClickInvoiceSubmit} = this;
        return (
            showSubmitAlert && <div className="alert-content">
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
                        isCheckedCo &&
                        <div className="item-area flex-middle-x">
                            <div className="item-left">发票税号</div>
                            <div className="item-right">{invoiceMessage.taxNo}</div>
                        </div>
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
            </div>
        )
    }

    renderCityMessage() {
        const {onClickCityAlert, onClickCheckedCity} = this;
        const {showCityAlert, cityTree, province, city, area} = this.state;
        return (
            showCityAlert &&
            <div className="alert-content">
                <div className="scroll-city">
                    <div className="scroll-city-title flex-middle-x">
                        <div className="left-item" onClick={onClickCityAlert.bind(this)}>
                            取消
                        </div>
                        <div className="right-item" onClick={onClickCheckedCity.bind(this)}>
                            完成
                        </div>
                    </div>
                    <div className="scroll-city-content flex-middle-x">
                        {cityTree && <CityPicker cityTree={cityTree}
                                                 onHandleChange={this.onHandleCityPickerChange.bind(this)}
                                                 province={province}
                                                 city={city}
                                                 area={area}/>}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {showMoreInfo, moreInfo} = this.state;
        const {onClickMoreInfo, moreInfoMessage} = this;
        return (
            <div className="invoice-index-view" style={currHeight}>
                {
                    showMoreInfo ?
                        <InvoiceMoreInfo moreInfo={moreInfo} showInfo={onClickMoreInfo.bind(this)}
                                         infoFn={moreInfoMessage.bind(this)}></InvoiceMoreInfo> :
                        <div>
                            {this.renderInvoiceMessage()}
                            {this.renderUserMessage()}
                            {this.renderSubmitInvoiceMessage()}
                            {this.renderCityMessage()}
                        </div>

                }
            </div>
        )
    }
}

export default withRouter(InvoiceIndexView);