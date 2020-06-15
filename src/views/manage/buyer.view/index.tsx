import React from "react";
import NetworkMine from "@/network/NetworkMine";
import cn from 'classnames';
import {withRouter} from 'react-router';
import {push} from "@/util/RouterManager";
import BuyerCell from '@/components/buyer.cell';
import './index.scss';


class BuyerView extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            selectedMenuIndex: 0,
            buyerList: []
        }
    }

    componentDidMount(): void {
        NetworkMine.useParams('openId').buyerList().then(data => {
            this.setState({
                buyerList: data
            })
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
        const {selectedMenuIndex, buyerList} = this.state;
        return (
            <div className={cn('buyer-view')}>
                <div className={cn('head flex-middle-x')}>
                    {['实名购票管理', '收件地址管理'].map((title, index) => {
                        return (
                            <div className={cn('menu', {active: selectedMenuIndex === index})}
                                 key={title}
                                 onClick={e => {this.onClickMenu(index)}}>
                                {title}
                            </div>
                        )
                    })}
                </div>
                <div>
                    {buyerList.map(buyer => {
                        return (
                            <BuyerCell key={buyer.id} buyer={buyer} className={cn('buyer-cell')}/>
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
