import React from "react";
import {useParams, withRouter} from "react-router";
import {getParams, push} from "@/util/RouterManager";
import NetworkPerformance from '@/network/NetworkPerformance';
import NetworkMine from '@/network/NetworkMine';
import FontIcon from "@/components/font.icon";
import UnitTool from "@/tool/UnitTool";
import DateTool from "@/tool/DateTool";
import cn from 'classnames';
import './index.scss';

class PerformanceDetailView extends React.Component<any, {
    performanceDetail: PerformanceDetailModel,
    hadColled: boolean,
    selectedSessionIndex: number
}>{

    constructor(props) {
        super(props);
        this.state = {
            performanceDetail: null,
            hadColled: false,
            selectedSessionIndex: 0
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
            const damaiProjectPerformRespList = data.damaiProjectPerformRespList;
            if (damaiProjectPerformRespList && damaiProjectPerformRespList.length > 0){
                const [{damaiProjectPerform}] = damaiProjectPerformRespList;
                return this.fetchSessionStatus(damaiProjectPerform.performId)
            }
            return data;
        }, error => {
            console.log(error);
        })
    }

    async fetchPerformanceStatus(projectId){
        return NetworkPerformance.theStatus(projectId).then(data => {
            console.log(data);
            return data;
        }, error => {
            console.log(error);
        })
    }

    async fetchSessionStatus(performId){
        return NetworkPerformance.sessionStatus(performId).then(data => {
            console.log(data);
            return data;
        }, error => {
            console.log(error);
        })
    }

    async fetchCollectPerformance(){
        const {performanceDetail} = this.state;
        return NetworkMine.useParams('openId').collectPerformance({
            projectId: performanceDetail.damaiProject.projectId,
            projectName: performanceDetail.damaiProject.projectName,
            posterUrl: performanceDetail.damaiProject.posterUrl,
            area: performanceDetail.damaiProject.cityId,
            address: performanceDetail.damaiProject.venueAddress,
            startTime: performanceDetail.damaiProjectDetail.showStartTime,
            endTime: performanceDetail.damaiProjectDetail.showEndTime,
        }).then(data => {
            console.log(data);
        }, error => {
            console.log(error);
        });
    }

    onClickCollection(){
        this.fetchCollectPerformance();
        // this.setState((state, props) => ({
        //     hadColled: !state.hadColled
        // }))
    }

    onClickBuy(){
        const {history} = this.props;
        const {projectId} = getParams(this.props.location);
        push(history,'/performance-select', {
            projectId: projectId,
        });
    }

    onClickSession(session, index){
        this.setState({ selectedSessionIndex: index })
    }

    renderInfoPiece(){
        const {performanceDetail, selectedSessionIndex} = this.state;
        if (!performanceDetail){
            return null
        }
        const {damaiProject, damaiProjectDetail, damaiProjectPerformRespList} = performanceDetail;
        const minPrice = UnitTool.formatPriceByFen(performanceDetail.minPrice);
        const maxPrice = UnitTool.formatPriceByFen(performanceDetail.maxPrice);
        let sessionList = null;
        if (damaiProjectPerformRespList && damaiProjectPerformRespList.length > 1){
            sessionList = (
                <div className="session">
                    <div className="container">
                        {damaiProjectPerformRespList.map(({damaiProjectPerform}, i) => {
                            const starTime = DateTool.dateStringFromTimeInterval(damaiProjectPerform.startTime*0.001, 'yyyy.MM.dd');
                            const endTime = DateTool.dateStringFromTimeInterval(damaiProjectPerform.endTime*0.001, 'yyyy.MM.dd');
                            let dateTime = `${starTime}-${endTime}`;
                            if(starTime === endTime){
                                dateTime = starTime
                            }
                            return (
                                <div className={cn('item-wrapper flex-center-y', {active: selectedSessionIndex === i})}
                                     key={damaiProjectPerform.performId}
                                     onClick={e => this.onClickSession(damaiProjectPerform, i)}>
                                    <div className="title">
                                        {damaiProjectPerform.performName}
                                    </div>
                                    <div className="subtitle">
                                        {dateTime}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
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
                {sessionList}
                <div className="message flex-middle-x">
                    <div className="piece-content message-content flex-middle-x">
                        {['不支持退', '不支持选座', '不提供发票', '快递票'].map(_ => {
                            return (
                                <div className="item flex-middle-x" key={_}>
                                    <FontIcon icon="icontishi" className="orange-icon"/>
                                    <span className="ellipsis-text">{_}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className="icon-wrapper">
                        <FontIcon icon="iconcl-icon-right" className="icon"/>
                    </div>
                </div>
                <div className="date flex-middle-x">
                    <div className="piece-content">
                        <div>{damaiProjectDetail.showTime}</div>
                        <div className="sub">以现场为准</div>
                    </div>
                    <div className="icon-wrapper">
                        <FontIcon icon="iconcl-icon-right" className="icon"/>
                    </div>
                </div>
            </div>
        )
    }

    renderAddressPiece(){
        const {performanceDetail} = this.state;
        if (!performanceDetail){
            return null;
        }
        const {damaiProject} = performanceDetail;
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
        if (!performanceDetail){
            return null;
        }
        const {damaiProjectDetail} = performanceDetail;
        return (
            <div className="detail-piece">
                <div dangerouslySetInnerHTML={{ __html: damaiProjectDetail.showDetail }}>
                </div>
            </div>
        )
    }

    renderBottomPiece(){
        const {hadColled} = this.state;
        const {onClickCollection, onClickBuy} = this;
        return (
            <div className="bottom-piece flex-x">
                <div className="coll-btn flex-center-y" onClick={onClickCollection.bind(this)}>
                    <FontIcon icon={hadColled ? 'iconshoucang_tianchong': 'iconshoucang'} className="icon"/>
                    <div className={cn({colled: hadColled})}>收藏</div>
                </div>
                <div className="buy-btn flex-center-x" onClick={onClickBuy.bind(this)}>
                    <span>立即购买</span>
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
                {this.renderBottomPiece()}
            </div>
        )
    }
}

export default withRouter(PerformanceDetailView);
