import React from "react";
import cn from 'classnames';
import NetworkMine from "@/network/NetworkMine";
import FontIcon from "@/components/font.icon";
import './index.scss';
import NetworkCity from "@/network/NetworkCity";
import CityPicker from "@/components/city.picker";
import {RouteComponentProps, withRouter} from "react-router";
import {pop} from "@/util/RouterManager";

class AddAddressView extends React.Component<RouteComponentProps, {
    addressRegion: string,
    cityTree: any,
    province: ProvinceTreeModel,
    city: CityTreeModel,
    area: AreaTreeModel,
    address: string,
    name: string,
    phone: string,
}>{
    constructor(props) {
        super(props);
        this.state = {
            addressRegion: '',
            cityTree: null,
            province: null,
            city: null,
            area: null,
            address: '',
            name: '',
            phone: '',
        }
    }

    componentDidMount(): void {
        NetworkCity.cityTree().then(cityTree => {
            this.setState({
                cityTree,
                province: cityTree?.[0],
                city: cityTree?.[0].cityList?.[0],
                area: cityTree?.[0].cityList?.[0].areaList?.[0],
            });
        }, error => {
            console.log(error);
        })
    }

    fetchAddAddress(){
        const {province, city, area, address, name, phone} = this.state;
        const params = {
            provinceId: province?.id,
            cityId: city?.id,
            areaId: area?.id,
            address,
            name,
            phone,
        };
        NetworkMine.useParams('openId').addAddress(params).then(data => {
            console.log(data);
            pop(this);
        }, error => {
            console.log(error);
        })
    }

    onHandleCityPickerChange(type, obj, update){
        let {province, city, area, cityTree} = this.state;
        if (type === 'province'){
            province = obj;
            city = province?.cityList?.[0];
            area = city?.areaList?.[0];
        }
        if (type === 'city'){
            city = obj;
            area = city?.areaList?.[0];
        }
        if (type === 'area'){
            area = obj;
        }
        console.log(province, city, area)
        this.setState( {
            province,
            city,
            area
        });
    }

    onInputChange(e){
        const target = e.target;
        const name: ('name' | 'phone') = target.name;
        const value = target.value;
        // @ts-ignore
        // https://github.com/Microsoft/TypeScript/issues/13948
        this.setState({
            [name]: value
        })
    }

    onClickAddAddees(){
        const {province, city, area, address, name, phone} = this.state;
        if (address === '' || name === '' || phone === ''){
            console.log('地址信息不全');
            return;
        }
        this.fetchAddAddress();
    }

    render(){
        const {cityTree, province, city, area} = this.state;
        let addressRegion = '';
        if (cityTree){
            addressRegion = `${province?.name ?? ''} ${city?.name ?? ''} ${area?.name ?? ''}`;
        }
        return (
            <div className={cn('add-address-view')}>
                <div className={cn('address-contacts')}>
                    <div className={cn('item flex-middle-x')}>
                        <div className="title">姓名</div>
                        <input name="name" onChange={this.onInputChange.bind(this)} placeholder="请填写观演人姓名"/>
                    </div>
                    <div className={cn('item flex-middle-x')}>
                        <div className="title">手机号</div>
                        <input name="phone" onChange={this.onInputChange.bind(this)} placeholder="请填写观演人手机号"/>
                    </div>
                </div>
                <div className={cn('address-location')}>
                    <div className={cn('item flex-middle-x')}>
                        <div className={cn('title')}>所在地区</div>
                        <div className={cn('picker-text')}>{addressRegion}</div>
                        <FontIcon icon="iconcl-icon-right" width={20} height={20}/>
                    </div>
                    <div className={cn('item flex-middle-x')}>
                        <div className={cn('title')}>详细地址</div>
                        <input name="address" onChange={this.onInputChange.bind(this)} placeholder="请填写详细地址不少于4个字"/>
                    </div>
                </div>
                <div className={cn('is-default')}>
                    <div className={cn('item flex-middle-x')}>
                        <div className={cn('title')}>设为默认地址</div>
                        <div></div>
                    </div>
                </div>
                <div>
                    {cityTree && <CityPicker cityTree={cityTree}
                                             onHandleChange={this.onHandleCityPickerChange.bind(this)}
                                             province={province}
                                             city={city}
                                             area={area}/>}
                </div>
                <div className={cn('bottom-area')}>
                    <div className="content" onClick={e => this.onClickAddAddees()}>确定</div>
                </div>
            </div>
        );
    }
}

export default withRouter(AddAddressView);
