import React from "react";
import cn from 'classnames';
import {withRouter} from "react-router";
import './index.scss';
import {pop, push} from "@/util/RouterManager";
import NetworkMine from "@/network/NetworkMine";

class PerformanceSelectInfoView extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            selectedAccessWayType: 0,
            selectPaperType: 'expressTake',
            buyer: null,
            expressAddress: null
        }
    }

    componentDidMount(): void {
        NetworkMine.useParams('openId').addressList().then(data => {
            console.log(data);
            if (data.length > 0){
                this.setState({ expressAddress: data[0] })
            }
        }, error => {
            console.log(error);
        })
    }

    renderPaperTicket(){
        const {selectPaperType, selectedAccessWayType, expressAddress} = this.state;
        if (selectedAccessWayType !== 1){
            return null;
        }
        let paperInfoEle = null;
        const isExpressTake = selectPaperType === 'expressTake';
        const isShopTake = selectPaperType === 'shopTake';
        if (isExpressTake) {
            if (expressAddress){
                paperInfoEle = (
                    <div>{JSON.stringify(expressAddress)}</div>
                )
            } else {
                paperInfoEle = (
                    <div className={cn()} onClick={e => this.onClickAddExpressAddress()}>添加收件地址</div>
                )
            }
        }

        if (isShopTake) {
            paperInfoEle = (
                <div className={cn()}>
                    <div>门店列表</div>
                    {['门店地址', '门店地址'].map((title, index) => {
                        return (
                            <div key={index}>{title}</div>
                        )
                    })}
                </div>
            )
        }

        const paperAccessChange = (selectPaperType) => {
            this.setState({ selectPaperType });
        };

        return (
            <>
                <div className={cn('flex-middle-x', 'paper-list')}>
                    <div className={cn('item flex-middle-x')}>
                        <input type="radio"
                               id="expressTake"
                               name="paperType"
                               value="expressTake"
                               checked={isExpressTake}
                               onChange={paperAccessChange.bind(this, 'expressTake')}/>
                        <label htmlFor="expressTake">快递邮寄</label>
                    </div>
                    <div className={cn('item flex-middle-x')}>
                        <input type="radio"
                               id="shopTake"
                               name="paperType"
                               value="shopTake"
                               checked={isShopTake}
                               onChange={paperAccessChange.bind(this, 'shopTake')}/>
                        <label htmlFor="shopTake">门店自取</label>
                    </div>
                </div>
                {paperInfoEle}
            </>
        )
    }

    renderBuyer(){
        const {buyer} = this.state;
        if (buyer) {
            return (
                <div>
                    由用户
                </div>
            )
        }
        return (
            <div className={cn('add-buyer')} onClick={e => this.onClickAddBuyer()}>添加观影人</div>
        )
    }

    onClickAccessWayItem(index){
        this.setState({
            selectedAccessWayType: index
        })
    }

    onClickAddBuyer(){
        const {history} = this.props;
        push(history,'/buyer', {
            buyerCallback: (buyer) => {
                this.setState({ buyer })
            }
        });
    }

    onClickAddExpressAddress(){
        push(this, 'add-address')
    }


    onClickBottomBar(){
        const {history} = this.props;
        pop(history);
    }

    render(){
        const {selectedAccessWayType} = this.state;
        return (
            <div className={'performance-select-info-view'}>
                <div className={cn('buyer flex-y piece')}>
                    <div className={cn('title')}>观影人</div>
                    <div className={cn('content')}>
                        {this.renderBuyer()}
                    </div>
                </div>
                <div className={cn('access-way flex-y piece')}>
                    <div className={cn('title')}>取票方式</div>
                    <div className={cn('content')}>
                        <div className={cn('item-list flex-middle-x')}>
                            {
                                ['电子票', '纸制品', '自助取票'].map((title, index) => {
                                    return (
                                        <div className={cn('item', {active: index === selectedAccessWayType})}
                                             key={title}
                                             onClick={e => this.onClickAccessWayItem(index)}>
                                            {title}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={cn()}>
                            {
                                this.renderPaperTicket()
                            }
                        </div>
                    </div>
                </div>
                <div className={cn('bottom-bar')} onClick={e => this.onClickBottomBar()}>
                    确定
                </div>
            </div>
        )
    }
}

export default withRouter(PerformanceSelectInfoView);
