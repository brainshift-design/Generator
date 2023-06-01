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



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = 
            this.input 
            ? (await this.input.eval(parse)).toValue() 
            : NullValue;


        //this.updateValues = [['value', this.value]];
        this.updateValues = [['', NullValue]];


        this.evalObjects(parse);

        
        this.validate();

        return this;
    }



    evalObjects(parse, options = {})
    {
        // if (this.feedback)
        //     console.log('this.feedback.iterationObjects =', this.feedback.iterationObjects);

        
        const repeat = parse.repeats.find(r => r.repeatId == this.loopId);
        console.log('this.loopId =', this.loopId);
        console.log('repeat =', repeat);

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

        
        super.evalObjects(parse);
    }



    updateObjects(objects, iteration)
    {
        this.objects = objects.map(o => o.copy());

        for (const obj of this.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId + (iteration != '' ? ':' + iteration : '');
        }
    }
    

    
    toValue()
    {
        return this.value.copy();
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        this.feedback = from;

        if (this.input) this.input.invalidateInputs(from);
    }
}
