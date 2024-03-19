class GObjectName
extends GOperator1
{
    name    = null;
  //addLogo = null;



    constructor(nodeId, options)
    {
        super(OBJECT_NAME, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.name    = null;
      //this.addLogo = null;
    }



    copy()
    {
        const copy = new GObjectName(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value  ) copy.value   = this.value  .copy();
        if (this.name   ) copy.name    = this.name   .copy();
      //if (this.addLogo) copy.addLogo = this.addLogo.copy();

        return copy;
    }



    async eval(parse)
    {
        // if (this.isCached())
        //     return this;


        this.value = 
            this.input 
            ? (await this.input.eval(parse)).toValue() 
            : new NullValue();

        
        const name    = await evalTextValue  (this.name, parse);
      //const addLogo = await evalNumberValue(this.addLogo, parse);

        
        if (   this.options.enabled
            && this.value.isValid()
            && this.value.objects)
        {
            for (const obj of this.value.objects)
            {
                obj.nodeId     = this.nodeId;
                obj.objectName = name.value;
             // obj.objectName = (addLogo.value > 0 ? OBJECT_PREFIX : '') + name.value;
            }
        }


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type',    this.outputType()],
            ['name',    name             ]//,
          //['addLogo', addLogo          ]
        ]);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    isValid()
    {
        return super.isValid()
            && this.name    && this.name   .isValid()
         // && this.addLogo && this.addLogo.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.name   ) this.name   .pushValueUpdates(parse);
     // if (this.addLogo) this.addLogo.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.name   ) this.name   .invalidateInputs(parse, from, force);
     // if (this.addLogo) this.addLogo.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.name   ) this.name   .iterateLoop(parse);
     // if (this.addLogo) this.addLogo.iterateLoop(parse);
    }



    resetLoop(parse, nodeId)
    {
        super.resetLoop(parse, nodeId);

        if (this.name   ) this.name   .resetLoop(parse, nodeId);
     // if (this.addLogo) this.addLogo.resetLoop(parse, nodeId);
    }
}
