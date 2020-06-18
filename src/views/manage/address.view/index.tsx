import React from "react";
import NetworkMine from "@/network/NetworkMine";
import AddressCell from "@/components/address.cell";
import {withRouter} from "react-router";
import cn from "classnames";
import './index.scss';
import {push} from "@/util/RouterManager";


class AddressView extends React.Component<any, any>{

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(): void {
        this.fetchAddressList();
    }

    async fetchAddressList(){
        return NetworkMine.useParams('openId').addressList().then(data => {
            console.log(data)
        }, error => {
            console.log(error)
        })
    }

    onClickAddAddress(){
        push(this, '/add-address')
    }


    render(){
        return (
            <div className="address-view">
                <div className={cn('add-button')} onClick={e => {
                    this.onClickAddAddress();
                }}>+ 新增</div>
            </div>
        )
    }
}


export default withRouter(AddressView);
