import React from "react";
import NetworkPerformance from '@/network/NetworkPerformance';
import PerformanceListCell from '@/components/performance.list.cell';
import classnames from 'classnames'
import {withRouter, RouteComponentProps} from "react-router";
import {getParams, push} from '@/util/RouterManager';
import FontIcon from "@/components/font.icon";
import './index.scss';

class PerformanceListView extends React.Component<RouteComponentProps, {
    categoryList: CategoryModel[],
    performanceList: PerformanceModel[],
    activeCategoryId: string,
}>{
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            activeCategoryId: null,
            performanceList: []
        }
    }

    async componentDidMount() {
        const {location} = this.props;
        const activeCategoryId = getParams(location)['codeId'];
        this.setState({
            activeCategoryId
        });
        await this.fetchCategoryList();
        await this.fetchPerformanceList(activeCategoryId);
    }

    async fetchCategoryList(){
        return NetworkPerformance.categoryList().then(categoryList => {
            this.setState({
                categoryList
            });
            return categoryList;
        }, error => {
            console.log(error);
        })
    }

    async fetchPerformanceList(categoryId){
        return NetworkPerformance
            .useParams('cityId')
            .listByCategory({classifyId: categoryId})
            .then(performanceList => {
                this.setState({
                    performanceList
                });
                console.log(performanceList);
                return performanceList;
            }, error => {
                console.log(error);
            })
    }

    onClickCategory(category){
        const {activeCategoryId} = this.state;
        if (activeCategoryId !== category.codeId){
            this.setState({
                activeCategoryId: category.codeId
            }, () => this.fetchPerformanceList(category.codeId))
        }
    }

    onClickPerformance(performance){
        const {history} = this.props;
        push(history,'/performance-detail', {
            projectId: performance.projectId,
        });
    }

    renderCategoryPiece(){
        const {categoryList, activeCategoryId} = this.state;
        const {onClickCategory} = this;
        return (
            <div className="category-piece">
                {
                    categoryList.map(category => {
                        const active = activeCategoryId === category.codeId;
                        return (
                            <span className={classnames('category-item', 'subtitle-2', {active})}
                                  key={category.codeId}
                                  onClick={onClickCategory.bind(this, category)}>
                                {category.codeName}
                            </span>
                        )
                    })
                }
            </div>
        );
    }

    renderFilterBar(){
        return (
            <div className="filter-bar flex-middle-x">
                <div className="filter-item">
                    <span>全部时间</span>
                    <FontIcon className="icon" icon={'iconxiala'}/>
                </div>
                <div className="filter-item">
                    <span>推荐排序</span>
                    <FontIcon className="icon" icon={'iconxiala'}/>
                </div>
                <div className="filter-item">
                    <span>距离最近</span>
                    <FontIcon className="icon" icon={'iconxiala'}/>
                </div>
            </div>
        );
    }

    renderPerformanceList(){
        const {performanceList} = this.state;
        const {onClickPerformance} = this;
        return (
            <div className="performance-list">
                {
                    performanceList.map(performance => {
                        return (
                            <PerformanceListCell performance={performance}
                                                 key={performance.projectId}
                                                 onClick={performance => this.onClickPerformance(performance)}/>
                        )
                    })
                }
            </div>
        )
    }

    render(){
        return (
            <div className={'performance-list-view'}>
                <div className={'head-container'}>
                    {this.renderCategoryPiece()}
                    {/*{this.renderFilterBar()}*/}
                </div>
                {this.renderPerformanceList()}
            </div>
        );
    }
}


export default withRouter(PerformanceListView);
