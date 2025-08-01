class GShape
extends GShapeBase
{
    input = null;

    props = null;
   


    constructor(type, nodeId, options)
    {
        super(type, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.input = null;
        this.props = null;
    }



    copyBase(base)
    {
        super.copyBase(base);
        
        if (base.input) this.input = base.input.copy();
        if (base.props) this.props = base.props.copy();
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'props':  return this.input ? this.value.props : this.props;
        }

        return null;
    }



    baseIsValid()
    {
        return this.value
            && this.value.props
            && this.value.props.isValid();
    }



    isCached()
    {
        return super.isCached()
            && (  !this.input 
                || this.input.isCached());
    }



    async evalShapeBase(parse)
    {
        let props = await evalListValue(this.props, parse);

        if (   props
            && STYLE_VALUES.includes(props.type))
            props = new ListValue([props]);

        
        if (this.value)
        {
            if (this.input)
            {
                this.value.props = props ?? this.input.toNewValue().props;
                
                if (props)  this.value.props = props;  else  props = this.value.props;  
            }
            else
                this.value.props = props;

                    
            if (   this.value
                && this.value.isValid()
                && this.value.props != undefined) 
            {
                this.setUpdateValues(parse, 
                [
                    //['props', props]
                ], 
                true);

                
                if (!this.props) this.props = this.value.props.copy();
            }
        }
    }



    async evalObjects(parse)
    {
        if (!this.value)
            return;


        for (const obj of this.value.objects)
        {
            consoleAssert(obj.fills,   'obj.fills   must not be null');
            consoleAssert(obj.strokes, 'obj.strokes must not be null');
            consoleAssert(obj.effects, 'obj.effects must not be null');

            if (this.value.props)
                addProps(obj, this.value.props);
        }
    }



    evalStyle(options = {})
    {

    }



    isValid()
    {
        return super.isValid()
            && (!this.input || this.input.isValid())
            && this.props && this.props.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.props) this.props.pushValueUpdates(parse);
    }


    
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.input) this.input.invalidateInputs(parse, from, force);
        if (this.props) this.props.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.input) this.input.iterateLoop(parse);
        if (this.props) this.props.iterateLoop(parse);
    }
}



function addProps(obj, props)
{
    if (isListValueType(props.type))
    {               
        for (let i = 0; i < props.items.length; i++)
            addProp(obj, props.items[i]);
    }
    else
        addProp(obj, props);
}