import React from "react";
import {useParams, withRouter} from "react-router";
import {getParams} from "@/util/RouterManager";
import NetworkPerformance from '@/network/NetworkPerformance';
import FontIcon from "@/components/font.icon";
import UnitTool from "@/tool/UnitTool";
import './index.scss';

class PerformanceDetailView extends React.Component<any, {
    performanceDetail
}>{

    constructor(props) {
        super(props);
        this.state = {
            performanceDetail: {}
        }
    }

    componentDidMount(): void {
        const {projectId} = getParams(this.props.location);
        this.fetchPerformanceDetail(projectId);
    }

    async fetchPerformanceDetail(projectId){
        return NetworkPerformance.useParams('coordinate').detail(projectId).then(data => {
            console.log(data);
            this.setState({
                performanceDetail: data
            })
        }, error => {
            console.log(error);
        })
    }

    renderInfoPiece(){
        const {performanceDetail} = this.state;
        if (!performanceDetail.damaiProjectDetail){
            return null;
        }
        const {damaiProject} = performanceDetail;
        const minPrice = UnitTool.formatPriceByFen(performanceDetail.minPrice);
        const maxPrice = UnitTool.formatPriceByFen(performanceDetail.maxPrice);
        return (
            <div className="info-piece">
                <div className="head">
                    <div className="gauss-wrapper">
                        <img className="gauss-banner" src={performanceDetail.damaiProjectDetail.showPic} alt=""/>
                    </div>
                    <div className="info flex-x">
                        <div className="photo-area">
                            <img className="photo" src={performanceDetail.damaiProjectDetail.showPic} alt=""/>
                        </div>
                        <div className="content-area">
                            <div className="name">{damaiProject.projectName}</div>
                            <div className="price">{`￥${minPrice}-￥${maxPrice}`}</div>
                        </div>
                    </div>
                </div>
                <div className="message flex-middle-x">
                    {['不支持退', '不支持选座', '不提供发票', '快递票'].map(_ => {
                        return (
                            <div className="item" key={_}>{_}</div>
                        )
                    })}
                    <FontIcon icon="iconcl-icon-right" className="icon"/>
                </div>
                <div className="date flex-middle-x">
                    <div style={{flex: 1}}>
                        <div>2020.01.11-2021.01.09</div>
                        <div className="sub">约120分钟(以现场为准)</div>
                    </div>
                    <FontIcon icon="iconcl-icon-right" className="icon"/>
                </div>
            </div>
        )
    }

    renderAddressPiece(){
        const {performanceDetail} = this.state;
        if (!performanceDetail.damaiProjectDetail){
            return null;
        }
        const {damaiProject} = performanceDetail;
        console.log(performanceDetail)
        return (
            <div className="address-piece flex-middle-x">
                <div className="content">
                    <div className="flex-middle-x">
                        <div className="city">{damaiProject.cityName}</div>
                        <div className="name">{damaiProject.projectName}</div>
                    </div>
                    <div className="address">{damaiProject.venueAddress}</div>
                </div>
                <div>
                    <div>座位图</div>
                </div>
                <div>
                    <div>距离</div>
                </div>
                <FontIcon icon="iconcl-icon-right" className="icon"/>
            </div>
        )
    }

    renderDetailPiece(){
        const {performanceDetail} = this.state;
        if (!performanceDetail.damaiProjectDetail){
            return null;
        }
        const {damaiProject} = performanceDetail;
        return (
            <div className="detail-piece">
                <div dangerouslySetInnerHTML={{ __html: damaiProject.showDetail }}>
                </div>
            </div>
        )
    }

    render(){
        return (
            <div className="performance-detail-view">
                {this.renderInfoPiece()}
                {this.renderAddressPiece()}
                {this.renderDetailPiece()}
            </div>
        )
    }
}

export default withRouter(PerformanceDetailView);
