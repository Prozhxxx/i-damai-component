import React, {ReactElement} from "react";
import style from './index.module.scss';
import cn from 'classnames';

class AddressCell extends React.Component<{
    className?: string
    address: AddressModel,
    onClick: Function
}, any>{

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        const {className, address, onClick} = this.props;
        return (
            <div onClick={e => onClick()} className={cn(style.addressCell, className)}>
                <div className={cn(style.contect, 'flex-middle-x')}>
                    <div className={style.name}>{address?.name}</div>
                    <div className={style.phone}>{address?.phone}</div>
                </div>
                <div className={style.address}>{address?.address}</div>
            </div>
        )
    }

}

export default AddressCell;
