import React from "react";
import {withRouter} from "react-router";

class PerformanceDetailView extends React.Component<any, any>{
    renderInfoPiece(){
        return (
            <div>
            </div>
        )
    }

    renderAddressPiece(){
        return (
            <div>
            </div>
        )
    }

    componentDidMount(): void {
        const {location} = this.props;
        console.log(location)
    }

    render(){
        return (
            <div>
                {this.renderInfoPiece()}
                {this.renderAddressPiece()}
            </div>
        )
    }
}

export default withRouter(PerformanceDetailView);
