import NumberTool from '@/tool/NumberTool'

class UnitTool {
    static formatPrice(price) {
        return NumberTool.fixNumberTo(price, 2);
    }

    static formatPriceByFen(price, shrink=true){
        if (!shrink){
            return NumberTool.fixNumberTo(price*0.01, 2);
        }
        return parseFloat(Number(price*0.01).toFixed(2)).toString();
    }
}

export default UnitTool;

