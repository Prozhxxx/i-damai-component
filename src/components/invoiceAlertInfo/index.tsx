import {connect, ConnectedProps} from "react-redux";
import React, {ReactNode} from "react";
import './index.scss';

class AlertInfo extends React.Component<ConnectedProps<string> & {
    content: ReactNode
}, any> {
    render() {
        const {content} = this.props;
        return (
            <div className="alert-info flex-center-y">
                <div className="alert-content">
                    {content}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state['ui']['alert']
};

const mapDispatchToProps = dispatch => {
    return {
        changeState: setTimeout(() => {
            dispatch({type: 'ALERT', data: {isShow: false}});
        }, 1000)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlertInfo);