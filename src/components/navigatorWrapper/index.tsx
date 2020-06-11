import React from "react";
import GlobalConstant from "@/util/GlobalConstant";

export function navigatorWrapper(WrappedComponent, title?){
    return class extends React.Component<any, any>{
        constructor(props) {
            super(props);
            let navigatorOption = {};
            if (typeof WrappedComponent.navigatorOptionPicker === 'function'){
                navigatorOption = WrappedComponent.prototype.navigatorOptionPicker(this);
            }
            title = title || navigatorOption['title'];
            GlobalConstant.store.dispatch({
                type: 'UPDATE_UI_NAVIGATOR',
                data: {
                    title,
                    leftItem: navigatorOption['leftItem'],
                    rightItem: navigatorOption['rightItem']
                }
            })
        }
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
}