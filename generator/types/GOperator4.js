class GOperator4
extends GOperator
{
    input0 = null;
    input1 = null;
    input2 = null;
    input3 = null;



    reset()
    {
        super.reset();

        this.input0 = null;
        this.input1 = null;
        this.input2 = null;
        this.input3 = null;
    }



    copyBase(base)
    {
        super.copyBase(base);

        if (base.input0) this.input0 = base.input0.copy();
        if (base.input1) this.input1 = base.input1.copy();
        if (base.input2) this.input2 = base.input2.copy();
        if (base.input3) this.input3 = base.input3.copy();
    }



    isCached()
    {
        return super.isCached()
            && (!this.input0 || this.input0.isCached())
            && (!this.input1 || this.input1.isCached())
            && (!this.input2 || this.input2.isCached())
            && (!this.input3 || this.input3.isCached());
    }



    inputNameFromNode(node)
    {
        return this.input0 && this.input0.nodeId == node.nodeId
            || this.input1 && this.input1.nodeId == node.nodeId
            || this.input2 && this.input2.nodeId == node.nodeId
            || this.input3 && this.input3.nodeId == node.nodeId;
    }



    isValid()
    {
        return this.input0 && this.input0.isValid()
            && this.input1 && this.input1.isValid()
            && this.input2 && this.input2.isValid()
            && this.input3 && this.input3.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input0) this.input0.pushValueUpdates(parse);
        if (this.input1) this.input1.pushValueUpdates(parse);
        if (this.input2) this.input2.pushValueUpdates(parse);
        if (this.input3) this.input3.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.input0) this.input0.invalidateInputs(parse, from, force);
        if (this.input1) this.input1.invalidateInputs(parse, from, force);
        if (this.input2) this.input2.invalidateInputs(parse, from, force);
        if (this.input3) this.input3.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.input0) this.input0.iterateLoop(parse);
        if (this.input1) this.input1.iterateLoop(parse);
        if (this.input2) this.input2.iterateLoop(parse);
        if (this.input3) this.input3.iterateLoop(parse);
    }
}