class GStart
extends GOperator
{
    input    = null;

    feedback = null;
    loopId   = NULL;

    

    constructor(nodeId, options)
    {
        super(START, nodeId, options);
    }


    
    copy()
    {
        const copy = new GStart(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();
        if (this.input) copy.input = this.input.copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (  !this.input 
                || this.input.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = 
            this.input 
            ? (await this.input.eval(parse)).toValue() 
            : NullValue;


        this.updateValues = [['', NullValue]];


        await this.evalObjects(parse);

        
        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        const repeat = parse.repeats.find(r => r.repeatId == this.loopId);

        this.updateObjects(
               this.feedback
            && repeat
            && repeat.iteration > 0
            ? this.feedback.iterationObjects 
            : (this.input ? this.input.objects : []),
            repeat 
            ? repeat.iteration.toString()
            : '');

        this.feedback = null;

        
        await super.evalObjects(parse);
    }



    updateObjects(objects, iteration)
    {
        if (!this.value.isValid())
            return;
            
        this.value.objects = objects.map(o => o.copy());

        for (const obj of this.value.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;// + (iteration != '' ? ':' + iteration : '');
        }
    }
    

    
    toValue()
    {
        return this.value.copy();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        this.feedback = from;

        if (this.input) this.input.invalidateInputs(from);
    }
}
