import React, {Fragment, RefObject} from "react";
import style from './index.module.scss';
import classnames from 'classnames';
import {connect, ConnectedProps} from "react-redux";

class CityLayer extends React.Component<ConnectedProps<typeof connector> &
{
    cityList: CityModel[],
    updateUserLocationCity: Function,
    hiddenCityLayer: Function,
}, any>{

    private titleRefs: React.RefObject<any>[] = [];

    onClickCityItem(city){
        this.props.updateUserLocationCity(city)
        this.props.hiddenCityLayer();
    }

    onClickInitialItem(initial, index){
        const node: Element = this.titleRefs[index].current;
        console.log(node)
        node.scrollIntoView(true)
    }

    render(){
        const cityList = this.props.cityList.map(city => {
            return city.nameEn ? city : {
                ...city,
                nameEn: '_'
            }
        });
        const {location, locationCity} = this.props;
        const cityMap = new Map<string, CityModel[]>();
        for (const city of cityList.sort((a, b) => a.nameEn.localeCompare(b.nameEn))){
            const initialChar = city.nameEn[0];
            cityMap.has(initialChar) ?
                cityMap.get(initialChar).push(city) :
                cityMap.set(initialChar, [city])
        }
        const titleRefs: React.RefObject<any>[] = Array.from(cityMap.keys()).map((key, index) => {
            return React.createRef();
        });
        this.titleRefs = titleRefs;
        return (
            <div className={style.cityLayer}>
                <div className={classnames('flex-center-y', style.initialIndex)}>
                    <div className={style.container}>
                        {
                            Array.from(cityMap.keys()).map((initial, index) => (
                                <div key={initial} onClick={e => this.onClickInitialItem(initial, index)}>
                                    {initial.toUpperCase()}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={style.contentWrapper}>
                    <p className={style.title}>
                        定位城市
                    </p>
                    <div className={style.content}>
                        <div className={style.item}>
                            {location.hasLocation ? locationCity.name : '定位失败'}
                        </div>
                    </div>
                    {
                        Array.from(cityMap.keys()).map((initial, index) => (
                            <Fragment key={initial}>
                                <a className={style.title} ref={titleRefs[index]}>
                                    {initial.toUpperCase()}
                                </a>
                                <div className={style.content}>
                                    {cityMap.get(initial).map(city => {
                                        return (
                                            <div className={style.item}
                                                 key={city.id}
                                                 onClick={e => this.onClickCityItem(city)}>
                                                {city.name}
                                            </div>
                                        )
                                    })}
                                </div>
                            </Fragment>
                        ))
                    }
                </div>
            </div>
        )
    }
}
const connector = connect(
    state => ({
        location: state['site']['location'],
        locationCity: state['site']['locationCity'],
        isShowCityLayer: state['ui']['layer']['cityLayer'],
    }),
    dispatch => ({
        hiddenCityLayer: () => dispatch({
            type: 'UPDATE_UI_LAYER_CITY_LAYER',
            data: false
        }),
        updateUserLocationCity: (city: CityModel) => dispatch({
            type: 'UPDATE_USER_LOCATION_CITY',
            data: {
                cityId: city.id,
                name: city.name,
                hasLocationCity: true
            }
        }),
    })
);

export default connector(CityLayer);
