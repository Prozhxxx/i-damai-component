import React, {ReactElement} from "react";
import style from './index.module.scss';
import FontIcon from "@/components/font.icon";
import cn from 'classnames';

class AddressCell extends React.Component<{
    className?: string
    address: AddressModel,
    onClick: Function,
    selectable?: Boolean,
}, any>{

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        const {className, address, onClick, selectable = false} = this.props;
        const selectableEle = (
         <div>
             <FontIcon icon={'iconselectfill'} width={20} height={20}/>
         </div>
        );
        return (
            <div onClick={e => onClick()} className={cn(style.addressCell, className)}>
                {selectable && selectableEle}
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
