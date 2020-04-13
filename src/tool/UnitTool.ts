import NumberTool from '@/tool/NumberTool'

class UnitTool {
    static formatPrice(price) {
        return NumberTool.fixNumberTo(price, 2);
    }

    static formatPriceByFen(price){
        return NumberTool.fixNumberTo(price*0.01, 2);
    }
}

export default UnitTool;

