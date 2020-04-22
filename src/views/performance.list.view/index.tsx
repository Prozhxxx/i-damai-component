import React from "react";

class PerformanceListView extends React.Component<any, any>{

    constructor(props) {
        super(props);
        this.state = {
            categoryList: []
        }
    }

    componentDidMount(): void {
    }

    renderCategory(){
        return (
            <div>
            </div>
        );
    }

    renderFilterBar(){
        return null;
    }

    renderPerformanceList(){
        return null;
    }

    render(){
        return (
            <div>
                {this.renderCategory()}
                {this.renderFilterBar()}
                {this.renderPerformanceList()}
            </div>
        );
    }
}


export default PerformanceListView;
