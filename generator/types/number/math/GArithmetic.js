class GArithmetic
extends GNumberType
{
    input = null;

    operand;



    copyBase(base)
    {
        super.copyBase(base);

        this.operand = base.operand.copy();
    }
}



function evalNodeValue(node, operation, isDiv, parse)
{
    if (!node.input)
    {
        node.value = NumberValue.NaN;
        return;
    }


    node.input    = node.input  .eval(parse).copy();
    node.operand  = node.operand.eval(parse).copy();
    
    const input   = node.input  .toValue();
    const operand = node.operand.toValue();


    if (isDiv)
    {
        if (operand.value == 0)
        {
            node.value = NumberValue.NaN;
            return;
        }

        const dec = Math.max(input.decimals, operand.decimals);

        node.value = new NumberValue(
            floorTo(operation(input.value, operand.value), dec), 
            dec);
    }
    else
    {
        node.value = new NumberValue(
            operation(input.value,    operand.value   ),
            Math.max (input.decimals, operand.decimals));
    }



    genPushUpdateValue(parse, node.nodeId, 'operand', operand);
}
