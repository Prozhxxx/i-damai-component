import React, {Fragment} from "react";
import NetworkPerformance from "@/network/NetworkPerformance";
import NetworkMine from "@/network/NetworkMine";
import NetworkTrade from "@/network/NetworkTrade";
import FontIcon from "@/components/font.icon";
import {withRouter} from "react-router";
import {getParams, push} from "@/util/RouterManager";
import cn from 'classnames';
import UnitTool from "@/tool/UnitTool";
import './index.scss';


class PerformanceSelectView extends React.Component<any, {
    performanceDetail: PerformanceDetailModel,
    selectedSessionIndex: number,
    selectedPriceIndex: number,
    count: number,
}>{
    constructor(props) {
        super(props);
        this.state = {
            performanceDetail: null,
            selectedSessionIndex: 0,
            selectedPriceIndex: 0,
            count: 1,
        }
    }

    componentDidMount(): void {
        const {projectId} = getParams(this);
        this.fetchPerformanceDetail(projectId);
    }

    async fetchPerformanceDetail(projectId){
        return NetworkPerformance.useParams('coordinate').detail(projectId).then(data => {
            console.log(data);
            this.setState({
                performanceDetail: data
            });
            const damaiProjectPerformRespList = data.damaiProjectPerformRespList;
            return data;
        }, error => {
            console.log(error);
        })
    }

    onClickSessionItem(index){
        this.setState({ selectedSessionIndex: index })
    }

    onClickPriceItem(index){
        this.setState({ selectedPriceIndex: index });
    }

    onClickNext(){
        const {projectId} = getParams(this);
        const {performanceDetail, selectedSessionIndex, selectedPriceIndex, count} = this.state;
        const session = performanceDetail?.damaiProjectPerformRespList?.[selectedSessionIndex];
        const performId = session?.damaiProjectPerform?.performId;
        const priceId = session?.damaiProjectPerformPricesList?.[selectedPriceIndex]?.priceId;
        if (!performId || !priceId){
            return;
        }
        push(this,'/order-confirm', {
            projectId,
            performId,
            priceId,
            count,
        });
    }


    render(){
        const {performanceDetail, selectedSessionIndex, selectedPriceIndex, count} = this.state;
        if (!performanceDetail){
            return null
        }
        const {damaiProjectPerformRespList} = performanceDetail;
        let totalPrice = '';
        const price =
            damaiProjectPerformRespList?.[selectedSessionIndex]?.damaiProjectPerformPricesList?.[selectedPriceIndex]?.price*count;
        if (!isNaN(price)){
            totalPrice = UnitTool.formatPriceByFen(price);
        }
        return (
            <div className="performance-select-view">
                <div className={cn(['session-container'])}>
                    <div className="title">选择场次</div>
                    <div className="content">
                        {damaiProjectPerformRespList.map(({damaiProjectPerform}, index) => {
                            return (
                                <div className={cn(['item-wrapper', { 'active': selectedSessionIndex === index }])}
                                     key={damaiProjectPerform.performName}
                                     onClick={() => this.onClickSessionItem(index)}>
                                    <div className="item">
                                        {damaiProjectPerform.performName}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="price-container">
                    <div className="title">选择票档</div>
                    <div className="content">
                        {
                            damaiProjectPerformRespList.length > 0
                            && damaiProjectPerformRespList[selectedSessionIndex].damaiProjectPerformPricesList.map((priceModel, index) => {
                                return (
                                    <div className={cn(['item-wrapper price-item-wrapper', { 'active': selectedPriceIndex === index }])}
                                         key={priceModel.priceId}
                                         onClick={() => this.onClickPriceItem(index)}>
                                        <div className="item">{UnitTool.formatPriceByFen(priceModel.price)}元</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="count-container">
                    <div className="title">选择数量</div>
                    <div className="content flex-middle-x">
                        <div className="button" onClick={e => {
                            this.setState((state) => {
                                return state.count <= 1 ? null : {count: state.count-1};
                            })
                        }}>
                            -
                        </div>
                        <div>
                            {count}张
                        </div>
                        <div className="button" onClick={e => {
                            this.setState((state) => {
                                return {count: state.count+1};
                            })
                        }}>
                            +
                        </div>
                    </div>
                </div>
                <div className="bottom-bar flex-middle-x">
                    <div className={'price'}>合计：{`${totalPrice === '' ? '-' : totalPrice}`}元</div>
                    <div className={cn('buy', {'active': totalPrice !== ''})}
                         onClick={e => this.onClickNext()}>
                        下一步
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PerformanceSelectView);
