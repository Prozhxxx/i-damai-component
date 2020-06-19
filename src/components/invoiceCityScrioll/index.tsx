import React from 'react';
import './index.scss';

type onClickShow = () => void

class InvoiceScroll extends React.Component<{
    showCityAlert: boolean,
    onClickShow?: onClickShow
}, any> {
    constructor(props) {
        super(props);
        this.state = {

            selectCity: {
                city1: '',
                city2: '',
                city3: '',
            },
            citylist: ['11', '12', '13', '14', '15', '21', '22', '23', '24', '25', '31', '32', '33', '34', '35', '41', '42']
        }
    }

    functions() {
        let elem = document.querySelector('.city-list1');

        elem.addEventListener('scroll', (e) => {

            this.setState({
                selectCity: {
                    ...this.state.selectCity,
                    city1: 22
                }
            })
        });
        elem.addEventListener('scrollEnd', (e) => {
            let elem = document.querySelector('.city-list1');
            let curr = elem.scrollTop;
            console.log(curr)
        })

    }

    renderAlertMessage() {
        const {selectCity, citylist} = this.state;
        const {showCityAlert, onClickShow} = this.props;
        const citylistMsg = citylist.map((data, index) => <li key={index}>{data}</li>)
        return (
            showCityAlert ?
                <div className="alert-content">
                    <div className="scroll-city">
                        <div className="scroll-city-title flex-middle-x">
                            <div className="left-item" onClick={onClickShow.bind(this)}>
                                取消
                            </div>
                            <div className="right-item">
                                完成
                            </div>
                        </div>
                        <div className="scroll-city-content flex-middle-x">
                            <ul className="city-list1">
                                {citylistMsg}
                            </ul>
                            <ul>
                                <li>1</li>
                                <li>1</li>
                                <li>1</li>
                            </ul>
                            <ul>
                                <li>1</li>
                                <li>1</li>
                                <li>1</li>
                                <li>1</li>
                                <li>1</li>
                                <li>1</li>
                                <li>1</li>
                                <li>1</li>
                            </ul>
                        </div>
                        <ul className="scroll-tip-box">
                            <li>{selectCity.city1}</li>
                            <li>{selectCity.city2}</li>
                            <li>{selectCity.city3}</li>
                        </ul>
                    </div>
                </div> : ''
        )
    }

    render() {
        return (
            <div>
                {this.renderAlertMessage()}
            </div>
        )
    }
}

export default InvoiceScroll;

