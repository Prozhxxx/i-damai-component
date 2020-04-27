import React from 'react';
import SearchBar from "@/components/search.bar";
// import Swiper from "@/components/swiper";
import MenuItems from "@/components/menu.items"
import PerformanceListCell from '@/components/performance.list.cell';
import NetworkPerformance from "@/network/NetworkPerformance";
import UnitTool from "@/tool/UnitTool";
import {withRouter, RouteComponentProps} from 'react-router';
import {push} from "@/util/RouterManager";
import './index.scss'

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
        return NetworkPerformance.useParams('cityId').hotList().then((hotList) => {
            this.setState({
                hotList
            });
            return hotList;
        }, error => {
            console.log(error);
        })
    }

    async fetchRecommendPerformance(){
        return NetworkPerformance.useParams('location').recommendList().then((recommendList) => {
            this.setState({
                recommendList
            });
            return recommendList;
        }, error => {
            console.log(error);
        })
    }

    onClickRecommendItem(performance){
        const {history} = this.props;
        push(history,'/performance-detail', {
            projectId: performance.projectId,
        });
    }

    onClickHotItem(performance){
        const {history} = this.props;
        push(history,'/performance-detail', {
            projectId: performance.projectId,
        });
    }

    onClickCategoryItem(category){
        const {history} = this.props;
        push(history,'/performance-list', {
            codeId: category.codeId,
        });
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
        const {onClickHotItem} = this;
        const hotItemList = hotList.map(performance => {
            return (
                <div className="hot-item" key={performance.projectId} onClick={onClickHotItem.bind(this, performance)}>
                    <img className="photo" src={performance.showPic} alt=""/>
                    <div className="name performance-name">{performance.projectName}</div>
                    {this.renderPriceLabel(UnitTool.formatPriceByFen(performance.minPrice))}
                </div>
            )
        });
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
                <PerformanceListCell key={performance.projectId}
                                     performance={performance}
                                     className="recommend-item"
                                     onClick={performance => this.onClickRecommendItem(performance)}/>
            )
        });
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
                <MenuItems categoryList={this.state.categoryList}
                           onClickItem={category => this.onClickCategoryItem(category)}>
                </MenuItems>
                {this.renderHotPiece()}
                {this.renderRecommendPiece()}
            </div>
        )
    }
}

export default withRouter(HomeView);
