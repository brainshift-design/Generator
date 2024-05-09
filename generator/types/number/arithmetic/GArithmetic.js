class GArithmetic
extends GOperator
{
    inputs = [];



    reset()
    {
        super.reset();

        this.inputs = [];
    }



    getConditionNode()
    {
        const conditionNodes = [];

        for (const input of this.inputs)
        {
            const conditionNode = input.getConditionNode();
            if (conditionNode) conditionNodes.push(conditionNode);            
        }

        console.assert(conditionNodes.length < 2, 'Error: sort order requires not more than one order node');

        return conditionNodes.length == 1
             ? conditionNodes[0]
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

        if (this.nodeId == 'math')
            console.log('this.inputs =', this.inputs);
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
