import React from 'react';
import './index.scss';

type ClickCallback = (InvoiceNavigatorModel) => void;
type ClickOther = (InvoiceNavigatorModel) => void;

class NavigatorInvoice extends React.Component<{
    navigatorMessage: InvoiceNavigatorModel,
    onClickCallback?: ClickCallback,
    onClickOther?: ClickOther
}, any> {
    renderLeftMessage() {
        const {navigatorMessage, onClickCallback} = this.props;
        if (navigatorMessage && navigatorMessage.isShowLeft && !navigatorMessage.leftText) {
            return (
                <div className="left-content" onClick={onClickCallback.bind(this)}>
                    <img src={require('./img/back.png')}/>
                </div>
            )
        } else if (navigatorMessage && navigatorMessage.isShowLeft && navigatorMessage.leftText) {
            return (
                <div className="left-content">
                    {navigatorMessage.leftText}
                </div>
            )
        } else {
            return ''
        }
    }

    renderRightMessage() {
        const {navigatorMessage, onClickOther} = this.props;
        if (navigatorMessage && navigatorMessage.isShowRight && navigatorMessage.rightText && navigatorMessage.rightText === '开票历史') {
            return (
                <div onClick={onClickOther.bind(this)}>
                    {navigatorMessage.rightText}
                </div>
            )
        } else if (navigatorMessage && navigatorMessage.isShowRight && navigatorMessage.rightText) {
            return (
                <div>
                    {navigatorMessage.rightText}
                </div>
            )
        } else {
            return ''
        }
    }

    render() {
        const navigatorMessage = this.props.navigatorMessage;
        return (
            <div className="navigator flex-middle-x">
                {this.renderLeftMessage()}
                <div className="center-content">
                    {
                        navigatorMessage && navigatorMessage.isShowCenter && navigatorMessage.centerText
                            ?
                            navigatorMessage.centerText
                            : ''
                    }
                </div>
                <div className="right-content">
                    {this.renderRightMessage()}
                </div>
            </div>
        )
    }
}

export default NavigatorInvoice;

