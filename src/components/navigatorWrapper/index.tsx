import React from "react";
import RouterManager from "@/util/RouterManager";


export function navigatorWrapper(WrappedComponent, title?):
    React.ComponentType<any>{
    return class extends React.Component<any, any>{
        private title: string;
        constructor(props) {
            super(props);
            let navigatorOption = {};
            if (typeof WrappedComponent.prototype.navigatorOptionPicker === 'function'){
                navigatorOption = WrappedComponent.prototype.navigatorOptionPicker(this);
            }
            this.title = navigatorOption?.['title'] ?? title;
            // WrappedComponent.prototype.updateTitle = this.updateTitle.bind(this);
        }

        updateTitle(title){
          // RouterManager.updateNavigatorTitle(title)
        }

        componentDidMount(): void {
            // this.updateTitle(this.title);
        }

        componentWillUnmount(): void {
            // this.updateTitle('');
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
}