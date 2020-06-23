import React from "react";
import NetworkMine from "@/network/NetworkMine";
import cn from 'classnames';
import {withRouter} from 'react-router';
import RouterManager, {push, getParams, pop} from "@/util/RouterManager";
import BuyerCell from '@/components/buyer.cell';
import {RouteComponentProps} from "react-router";
import './index.scss';
import {ChildrenPage} from "@/components/childrenPageWrapper";
import AddBuyerView from "@/views/manage/add.buyer.view";

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
    private unregisterCallback: () => void;
    constructor(props) {
        super(props);
        this.state = {
            selectedMenuIndex: 0,
            buyerList: [],
            selectable: false,
        };
        this.buyerToken = null;
        this.unregisterCallback = null;
    }

    componentDidMount(): void {
        this.createMetadata();
        this.createRightItem();
        this.fetchBuyerList();
        this.unregisterCallback = this.props.history.listen((
            location,
            action,
        ) => {
            if (location.pathname === '/order-confirm/buyer'){
                const rightItem = (
                    <div onClick={e => this.onClickOK()}>
                        确定
                    </div>
                );
                RouterManager.updateNavigatorItem(null, rightItem)
            }
        });
        window.eventTarget.addEventListener('RefreshBuyerList', (e: Event) => {
            this.fetchBuyerList()
        });
    }

    componentWillUnmount(): void {
        if (this.unregisterCallback){
            this.unregisterCallback();
        }
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

    async fetchBuyerList(){
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
        push(history,'/order-confirm/buyer/add-buyer');
    }

    onClickMenu(index){
        this.setState({
            selectedMenuIndex: index
        })
    }

    render(){
        const {selectedMenuIndex, buyerList, selectable} = this.state;
        return (
            <ChildrenPage location={this.props.location}
                          pathname={'/order-confirm/buyer'}
                          routes={[{
                              component: AddBuyerView,
                              title: '增加购票人',
                              path: '/order-confirm/buyer/add-buyer'
                          }]}>
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
            </ChildrenPage>
        );
    }
}

export default withRouter(BuyerView);
