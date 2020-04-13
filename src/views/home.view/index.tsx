import React from 'react';
import SearchBar from "@/components/search.bar";
// import Swiper from "@/components/swiper";
import MenuItems from "@/components/menu.items"
import NetworkPerformance from "@/network/NetworkPerformance";
import './index.scss'
import UnitTool from "@/tool/UnitTool";
const cityId = 110100

class Index extends React.Component<any, {
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

    renderHotPiece(){
        const {hotList} = this.state;
        const hotItemList = hotList.map(performance => {
            return (
                <div className="hot-item" key={performance.projectId}>
                    <img className="photo" src={performance.showPic} alt=""/>
                    <div className="name performance-name">{performance.projectName}</div>
                    <div className="price ellipsis-text"><span className="number">￥{UnitTool.formatPriceByFen(performance.minPrice)}</span>起</div>
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

    renderRecommendPiece(){
        const {recommendList} = this.state;
        const recommendItemList = recommendList.map(performance => {
            return (
                <div className="recommend-item flex-x" key={performance.projectId}>
                    <div className="photo-wrapper ellipsis-text">
                        <img className="photo" src={performance.showPic} alt=""/>
                    </div>
                    <div className="content-wrapper">
                        <div className="name performance-name">
                            {performance.projectName}
                        </div>
                        <div className="show-date"><span>{performance.showStartTime}</span></div>
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

export default Index;
