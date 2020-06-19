import React from "react";
import NetworkMine from "@/network/NetworkMine";
import AddressCell from "@/components/address.cell";
import {RouteComponentProps, withRouter} from "react-router";
import cn from "classnames";
import {pop, push} from "@/util/RouterManager";
import './index.scss';



class AddressView extends React.Component<RouteComponentProps<{}, {}, {
    addressToken
}>, {
    addressList: AddressModel[],
}>{

    private addressToken: string;
    constructor(props) {
        super(props);
        this.state = {
            addressList: []
        };
        this.addressToken = null;
    }

    componentDidMount(): void {
        this.fetchAddressList();
        const {addressToken} = this.props.location.state;
        this.addressToken = addressToken;
    }

    async fetchAddressList(){
        return NetworkMine.useParams('openId').addressList().then(data => {
            this.setState({ addressList: data })
        }, error => {
            console.log(error)
        })
    }

    onClickAddAddress(){
        push(this, '/add-address')
    }


    onClickAddressCell(address){
        pop(this)
        window.eventTarget.dispatchEvent(new CustomEvent(this.addressToken, { 'detail': { address } }))
    }

    render(){
        const {addressList} = this.state;
        return (
            <div className="address-view">
                <div className={cn('address-list')}>
                    {addressList.map(address => {
                        return (
                            <AddressCell key={address.id}
                                         className="address-cell"
                                         address={address}
                                         onClick={e => this.onClickAddressCell(address)}/>
                        )
                    })}
                </div>
                <div className={cn('add-button')} onClick={e => {
                    this.onClickAddAddress();
                }}>+ 新增</div>
            </div>
        )
    }
}


export default withRouter(AddressView);
