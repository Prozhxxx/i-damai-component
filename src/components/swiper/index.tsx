import React from 'react';

class Swiper extends React.Component<any, any>{
    render(){
        return (
            <div>
                {
                    [1, 2, 3, 4, 5].map(_ => {
                        return (
                            <div className="tmp" key={_}>
                                {_}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}

export default Swiper;
