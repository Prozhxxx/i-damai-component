import React from "react";
import NetworkMine from "@/network/NetworkMine";
import cn from 'classnames';
import {withRouter} from 'react-router';
import RouterManager, {push, getParams, pop} from "@/util/RouterManager";
import BuyerCell from '@/components/buyer.cell';
import {RouteComponentProps} from "react-router";
import './index.scss';

type SelectedableBuyer = (BuyerModel & {selected: Boolean});

class BuyerView extends React.Component<RouteComponentProps<{}, {}, {
    buyerToken: string,
    selectable: boolean,
    selectBuyerIdList?: string[],
}>, {
    selectedMenuIndex: number,
    buyerList: SelectedableBuyer[],
    selectable?: boolean,
}>{

    private buyerToken: string;
    constructor(props) {
        super(props);
        this.state = {
            selectedMenuIndex: 0,
            buyerList: [],
            selectable: false,
        };
        this.buyerToken = null;
    }

    componentDidMount(): void {
        this.createMetadata();
        this.createRightItem();
        this.fetchAddressList();
    }

    createMetadata(){
        const { buyerToken, selectable } = this.props.location.state;
        this.setState({ selectable });
        this.buyerToken = buyerToken;
    }

    createRightItem(){
        const rightItem = (
            <div onClick={e => this.onClickOK()}>
                确定
            </div>
        );
        RouterManager.updateNavigatorItem(null, rightItem)
    }


    onClickOK(){
        const {buyerList} = this.state;
        const selectBuyList = buyerList.filter(({selected}) => selected);
        window.eventTarget.dispatchEvent(new CustomEvent(this.buyerToken, {
            detail: {
                buyerList: selectBuyList
            }
        }));
        pop(this)
    }


    onClickBuyerCell(buyer){
        let buyerList = [...this.state.buyerList];
        const {id} = buyer;
        buyerList = buyerList.map((buyer) => {
            if (id === buyer.id){
                return {
                    ...buyer,
                    selected: !buyer.selected
                }
            }
            return buyer
        });
        this.setState({ buyerList })
    }

    async fetchAddressList(){
        const {selectBuyerIdList = []} = this.props.location.state;
        return NetworkMine.useParams('openId').buyerList().then(data => {
            this.setState({
                buyerList: data.map((buyer) => ({
                    ...buyer,
                    selected: selectBuyerIdList.some(id => id === buyer.id)
                })),
            });
            return data;
        }, error => {
            console.log(error);
        })
    }
    onClickAdd(){
        const {history} = this.props;
        push(history,'/add-buyer');
    }

    onClickMenu(index){
        this.setState({
            selectedMenuIndex: index
        })
    }

    render(){
        const {selectedMenuIndex, buyerList, selectable} = this.state;
        return (
            <div className={cn('buyer-view')}>
                {/*<div className={cn('head flex-middle-x')}>*/}
                {/*    {['实名购票管理', '收件地址管理'].map((title, index) => {*/}
                {/*        return (*/}
                {/*            <div className={cn('menu', {active: selectedMenuIndex === index})}*/}
                {/*                 key={title}*/}
                {/*                 onClick={e => {this.onClickMenu(index)}}>*/}
                {/*                {title}*/}
                {/*            </div>*/}
                {/*        )*/}
                {/*    })}*/}
                {/*</div>*/}
                <div>
                    {buyerList.map(buyer => {
                        return (
                            <BuyerCell key={buyer.id}
                                       buyer={buyer}
                                       className={cn('buyer-cell')}
                                       onClick={e => this.onClickBuyerCell(buyer)}
                                       selectable={selectable}
                                       active={buyer.selected}/>
                        )
                    })}
                </div>
                <div className={cn('add-button')} onClick={e => {
                    this.onClickAdd();
                }}>+ 新增</div>
            </div>
        );
    }
}

export default withRouter(BuyerView);
