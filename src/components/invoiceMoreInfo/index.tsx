import React from "react";
import {useParams, withRouter} from "react-router";
// import Navigator from "@/components/navigatorInvoice";
import './index.scss';
import {push} from "@/util/RouterManager";
import FontIcon from "@/components/font.icon";

const currHeight = {
    height: window.screen.height - 49 + 'px'
}

class InvoiceMoreInfo extends React.Component<any, {
    tempMoreInfo: InvoiceMoreInfos
}> {
    constructor(props) {
        super(props);
        this.state = {
            tempMoreInfo: {
                ...props.moreInfo
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(key, event) {
        const target = event.target;
        let value = target.value;
        if (value.replace(/\s/g, '').length === 0) {
            value = ''
        }
        this.setState({
            tempMoreInfo: {
                ...this.state.tempMoreInfo,
                [key]: value
            }
        })
    }

    renderTicketMessage() {
        const {showInfo, moreInfo} = this.props;
        return (
            <div className="info-content">
                <div className="nav-title flex-middle-x">
                    <div className="left flex-center-x" onClick={showInfo.bind(this)}>
                        <FontIcon icon="iconcl-icon-left" width={30} height={30}/>
                    </div>
                    <div className="middle">更多信息</div>
                </div>
                <div className="item-area flex-middle-x">
                    <div className="item-left">注册地址</div>
                    <div className="item-right"><input type="text" name="registerAddr"
                                                       defaultValue={moreInfo.registerAddr}
                                                       onChange={e => {
                                                           this.handleInputChange('registerAddr', e)
                                                       }}/></div>
                </div>
                <div className="item-area flex-middle-x">
                    <div className="item-left">注册电话</div>
                    <div className="item-right"><input type="tel" name="registerTel"
                                                       defaultValue={moreInfo.registerTel || ''}
                                                       onChange={e => {
                                                           this.handleInputChange('registerTel', e)
                                                       }}/></div>
                </div>
                <div className="item-area flex-middle-x">
                    <div className="item-left">开户银行</div>
                    <div className="item-right"><input type="text" name="registerBank"
                                                       defaultValue={moreInfo.registerBank}
                                                       onChange={e => {
                                                           this.handleInputChange('registerBank', e)
                                                       }}/></div>
                </div>
                <div className="item-area flex-middle-x">
                    <div className="item-left">银行账号</div>
                    <div className="item-right"><input type="text" name="bankNo"
                                                       defaultValue={moreInfo.bankNo || ''}
                                                       onChange={e => {
                                                           this.handleInputChange('bankNo', e)
                                                       }}/></div>
                </div>
                <div className="item-area last-item-area flex-middle-x">
                    <div className="item-left">备注信息</div>
                    <div className="item-right">
                        <input type="text" name="message"
                               defaultValue={moreInfo.message}
                               onChange={e => {
                                   this.handleInputChange('message', e)
                               }}/>
                    </div>
                </div>
            </div>
        )
    }

    renderButton() {
        const {infoFn} = this.props;
        const {tempMoreInfo} = this.state;
        return (
            <div className="submit-btn flex-center-x">
                <div className="btn" onClick={infoFn.bind(this, tempMoreInfo)}>
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

export default withRouter(InvoiceMoreInfo);

