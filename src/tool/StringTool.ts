import {JToolString} from "icemilk";
import { v4 as uuidv4 } from 'uuid';

class StringTool extends JToolString{
    static uuid(){
        return uuidv4();
    }
}

export default StringTool;
