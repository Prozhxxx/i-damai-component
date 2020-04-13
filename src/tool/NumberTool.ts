import {JToolNumber} from 'icemilk';


class NumberTool extends JToolNumber{
    static fixNumberTo(number, fixed){
        return Number(number).toFixed(fixed);
    }
}

export default NumberTool;

