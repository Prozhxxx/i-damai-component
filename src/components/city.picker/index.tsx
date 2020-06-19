import React from "react";
import cn from 'classnames';
import style from './index.module.scss';


class CityPicker extends React.Component<{
    onHandleChange: (type: string, id:string, update: (isUpdate: boolean) => void) => void,
    cityTree: ProvinceTreeModel[],
    province: ProvinceTreeModel,
    city: CityTreeModel,
    area: AreaTreeModel,
}, {
}>{
    private provinceRef;
    private cityRef;
    private areaRef;
    private refList;

    constructor(props) {
        super(props);
        this.provinceRef = React.createRef();
        this.cityRef = React.createRef();
        this.areaRef = React.createRef();
        this.refList = [ this.provinceRef, this.cityRef, this.areaRef ]
    }


    renderWheel(nameList){
        return (
            <>
                {nameList.map(({name, id}, index) => {
                    return (
                        <div key={index} className={cn(style.wheelItem, 'ellipsis-text')}>{name !== '' ? name : ''}</div>
                    )
                })}
            </>
        )
    }

    componentDidMount(): void {
        const {refList} = this;
        refList.map(ref => {
            ref.current.addEventListener('touchend', e => {
                e.stopPropagation();
                this.mouseUpHandler(ref)
            }, {
                capture: true
            });
        });
        this.doAdjustById()
    }

    mouseUpHandler(ref){
        this.doAdjustItem(ref);
    }

    doAdjustItem(ref){
        if (!ref.current){
            return;
        }
        const scrollerEle = ref.current;
        const wrapperEle = scrollerEle.parentElement;
        const {height} = wrapperEle.getBoundingClientRect();
        const offset = wrapperEle.scrollTop;
        // 40为item高度
        const itemHeight = 40;
        const pre = Math.floor((offset + height*0.5)/itemHeight);
        wrapperEle.scrollTop = (pre+0.5)*itemHeight - height*0.5;
        let {cityTree, province, city, area} = this.props;
        if (cityTree){
            if (ref === this.provinceRef){
                province = cityTree.find((_, index) => index === pre - 1);
                this.onHandleChange('province', province , (isUpdate) => {
                });
            }

            if (ref === this.cityRef){
                const city = province.cityList.find((_, index) => index === pre - 1);
                this.onHandleChange('city', city, (isUpdate = true) => {
                })
            }

            if (ref === this.areaRef){
                const area = city.areaList.find((_, index) => index === pre - 1);
                this.onHandleChange('area', area,() => {})
            }
        }
    }

    doAdjustById(){
        const itemHeight = 40;
        const {cityTree, province, city, area} = this.props;

        if (this.refList.some(_ => _.current === null)){
            return;
        }

        let provinceIndex = cityTree.findIndex(({id}) => province?.id === id);
        provinceIndex = provinceIndex === -1 ? 0 : provinceIndex;
        const provinceWrapperEle = this.provinceRef.current.parentElement;
        const {height} = provinceWrapperEle.getBoundingClientRect();
        provinceWrapperEle.scrollTop = (provinceIndex+1+0.5)*itemHeight - height*0.5;

        let cityIndex = province.cityList.findIndex(({id}) => city?.id === id);
        cityIndex = cityIndex === -1 ? 0 : cityIndex;
        const cityWrapperEle = this.cityRef.current.parentElement;

        setTimeout(() => {
            cityWrapperEle.scrollTop = (cityIndex+1+0.5)*itemHeight - height*0.5;
        }, 0)

        let areaIndex = city.areaList.findIndex(({id}) => area?.id === id);
        areaIndex = areaIndex === -1 ? 0 : areaIndex;
        const areaWrapperEle = this.areaRef.current.parentElement;
        // 为了解决当area为空时  转换到有值后不进行更新
        setTimeout(() => {
            areaWrapperEle.scrollTop = (areaIndex+1+0.5)*itemHeight - height*0.5;
        }, 0)
    }

    onHandleChange(type, id, update){
        this.props.onHandleChange(type, id, update);
    }

    render() {
        const {province, city, area} = this.props;
        const {cityTree} = this.props;
        let provinces, cities, areas;
        if (cityTree){
            provinces = cityTree;
            cities = provinces.find(({id}) => id === province?.id)?.cityList ?? provinces[0].cityList;
            areas = cities.find(({id}) => id === city?.id)?.areaList ?? cities[0].areaList;
            this.doAdjustById()
        }
        return (
            <div className={cn(style.cityPicker, 'flex-middle-x')}>
                <div className={cn(style.mark)}/>
                <div className={cn(style.wrapper)}>
                    <div className={cn(style.scroller, style.province)}
                         ref={this.provinceRef}
                    >
                        {cityTree && this.renderWheel(provinces)}
                    </div>
                </div>
                <div className={cn(style.wrapper)}>
                    <div className={cn(style.scroller, style.city)}
                         ref={this.cityRef}>
                        {cityTree && this.renderWheel(cities)}
                    </div>
                </div>
                <div className={cn(style.wrapper)}>
                    <div className={cn(style.scroller, style.area)}
                         ref={this.areaRef}>
                        {cityTree && this.renderWheel(areas)}
                    </div>
                </div>
            </div>
        );
    }

}

export default CityPicker;
