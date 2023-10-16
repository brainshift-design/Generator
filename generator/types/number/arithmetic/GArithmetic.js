class GArithmetic
extends GOperator
{
    inputs = [];



    getOrderNode()
    {
        const orderNodes = [];

        for (const input of this.inputs)
        {
            const orderNode = input.getOrderNode();
            if (orderNode) orderNodes.push(orderNode);            
        }

        console.assert(orderNodes.length < 2, 'Error: sort order requires not more than one order node');
        
        return orderNodes.length == 1
             ? orderNodes[0]
             : null;
    }



    isCached()
    {
        for (const input of this.inputs)
            if (!input.isCached())
                return false;

        return super.isCached();
    }



    isValid()
    {
        return  this.inputs.length > 0
            && !this.inputs.find(i => !i.isValid());
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));
    }
}
