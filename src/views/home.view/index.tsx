import React from 'react';
import SearchBar from "@/components/search.bar";
// import Swiper from "@/components/swiper";
import MenuItems from "@/components/menu.items"
import NetworkPerformance from "@/network/NetworkPerformance";
import UnitTool from "@/tool/UnitTool";
import DateTool from "@/tool/DateTool";
import {withRouter, RouteComponentProps} from 'react-router';
import './index.scss'
const cityId = 110100

class HomeView extends React.Component<RouteComponentProps, {
    categoryList: CategoryModel[],
    hotList: PerformanceModel[],
    recommendList: PerformanceModel[]
}>{
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            hotList: [],
            recommendList: []
        }
    }

    async componentDidMount(){
        await this.fetchCategoryList();
        await this.fetchHotPerformance();
        await this.fetchRecommendPerformance();
    }

    async fetchCategoryList(){
        return NetworkPerformance.categoryList().then((categoryList: CategoryModel[]) => {
            this.setState({
                categoryList
            });
            return categoryList
        }, error => {
            return error
        })
    }

    async fetchHotPerformance(){
        return NetworkPerformance.hotList(cityId).then((hotList) => {
            this.setState({
                hotList
            });
            return hotList;
        }, error => {
            console.log(error);
        })
    }

    async fetchRecommendPerformance(){
        return NetworkPerformance.recommendList(cityId).then((recommendList) => {
            this.setState({
                recommendList
            });
            return recommendList;
        }, error => {
            console.log(error);
        })
    }

    renderPriceLabel(price, className='') {
        return (
            <div className={`price-label ellipsis-text ${className}`}><span
                className="number">￥{price}</span>起
            </div>
        )
    }

    renderHotPiece(){
        const {hotList} = this.state;
        const hotItemList = hotList.map(performance => {
            return (
                <div className="hot-item" key={performance.projectId}>
                    <img className="photo" src={performance.showPic} alt=""/>
                    <div className="name performance-name">{performance.projectName}</div>
                    {this.renderPriceLabel(UnitTool.formatPriceByFen(performance.minPrice))}
                </div>
            )
        })
        return (
            <div className="piece-area">
                <div className="piece-title title-1">热门排行</div>
                <div className="flex-middle-x hot-container">
                    {hotItemList}
                </div>
            </div>
        )
    }

    onClickRecommendItem(performance){
        const {history} = this.props;
        history.push({
            pathname: '/performance-detail',
            hash: {
                projectId: performance.projectId
            }
        });
    }

    renderRecommendPiece(){
        const {recommendList} = this.state;
        const {onClickRecommendItem} = this;
        const recommendItemList = recommendList.map(performance => {
            const showStartTime = DateTool.dateStringFromTimeInterval(performance.showStartTime*0.001, 'yyyy.MM.dd');
            const showEndTime = DateTool.dateStringFromTimeInterval(performance.showEndTime*0.001, 'yyyy.MM.dd');
            return (
                <div className="recommend-item flex-x" key={performance.projectId} onClick={onClickRecommendItem.bind(this, performance)}>
                    <div className="photo-wrapper ellipsis-text">
                        <img className="photo" src={performance.showPic} alt=""/>
                    </div>
                    <div className="content-wrapper flex-y">
                        <div className="name performance-name">
                            {performance.projectName}
                        </div>
                        <div className="show-date"><span>{showStartTime}-{showEndTime}</span></div>
                        <div className="show-venue">
                            {performance.venueName}
                        </div>
                        {this.renderPriceLabel(UnitTool.formatPriceByFen(performance.minPrice),'price')}
                    </div>
                </div>
            )
        })
        return (
            <div className="piece-area">
                <div className="piece-title title-1">为您推荐</div>
                <div className="recommend-container">
                    {recommendItemList}
                </div>
            </div>
        )
    }

    render(){
        return (
            <div className="home-view">
                <SearchBar>
                </SearchBar>
                {/*<Swiper>*/}
                {/*</Swiper>*/}
                <MenuItems categoryList={this.state.categoryList}>
                </MenuItems>
                {this.renderHotPiece()}
                {this.renderRecommendPiece()}
            </div>
        )
    }
}

export default withRouter(HomeView);
