import React from "react";
import {useParams, withRouter} from "react-router";
import './index.scss';
import {push} from "@/util/RouterManager";
import {navigatorWrapper} from "@/components/NavigatorWrapper";

class InvoiceFinishView extends React.Component<any, {}> {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onClickHistory() {
        const {history} = this.props;
        push(history, '/invoice-list');
    }

    renderInvoiceFinish() {
        const {onClickHistory} = this;
        return (
            <div className="finish-content">
                <img src={require('../img/sucsses-icon.png')}/>
                <p className="text">提交成功</p>
                <div className="btn" onClick={onClickHistory.bind(this)}>
                    开票历史
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="invoice-finish flex-center-y">
                {this.renderInvoiceFinish()}
            </div>
        )
    }
}

export default withRouter(navigatorWrapper(InvoiceFinishView, '提交成功'));
