class GShape
extends GShapeBase
{
    input = null;

    props = null;
   


    constructor(type, nodeId, options)
    {
        super(type, nodeId, options);
    }



    copyBase(base)
    {
        super.copyBase(base);
        
        if (base.input) this.input = base.input.copy();
        if (base.props) this.props = base.props.copy();
    }



    baseIsValid()
    {
        return this.value
            && this.value.props.isValid();
    }



    isCached()
    {
        return super.isCached()
            && (  !this.input 
                || this.input.isCached());
    }



    async evalShapeBase(parse, add = false, input = null)
    {
        let props = this.props ? (await this.props.eval(parse)).toValue() : null;

        if (   props
            && STYLE_VALUES.includes(props.type))
            props = new ListValue([props]);

        
        if (this.value)
        {
            if (this.input)
            {
                if (add)
                {
                    this.value.props = new ListValue();

                    
                    if (this.input.value.props.type == LIST_VALUE)
                        this.value.props.items.push(...this.input.value.props.items);
                    else
                        this.value.props.items.push(...input.items);
                    

                    if (props)
                        this.value.props.items.push(...props.items);
                }
                else
                    this.value.props = props ?? this.input.value.props;
            }
            else
                this.value.props = props;

                    
            if (   this.value
                && this.value.isValid()
                && this.value.props != undefined) 
            {
                this.setUpdateValues(parse, 
                [
                    ['props', this.value.props]
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
            consoleAssert(obj.fills,   'obj.fills must not be null'  );
            consoleAssert(obj.strokes, 'obj.strokes must not be null');
            consoleAssert(obj.effects, 'obj.effects must not be null');


            if (  !this.value.props
                || this.value.props.items == undefined) 
                continue;


            for (let i = this.value.props.items.length-1; i >= 0; i--)
            {
                const prop = this.value.props.items[i];
                
                     if (prop.type ==        COLOR_VALUE)  addColorProp      (obj, prop);
                else if (prop.type ==         FILL_VALUE)  addFillProp       (obj, prop);
                else if (prop.type ==     GRADIENT_VALUE)  addGradientProp   (obj, prop);
                else if (prop.type ==       STROKE_VALUE)  addStrokeProp     (obj, prop);
                else if (prop.type ==  DROP_SHADOW_VALUE)  addDropShadowProp (obj, prop);
                else if (prop.type == INNER_SHADOW_VALUE)  addInnerShadowProp(obj, prop);
                else if (prop.type ==   LAYER_BLUR_VALUE)  addLayerBlurProp  (obj, prop);
                else if (prop.type ==    BACK_BLUR_VALUE)  addBackBlurProp   (obj, prop);
                else if (prop.type ==   LAYER_MASK_VALUE)  addMaskProp       (obj);
            }
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


    
    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.input) this.input.invalidateInputs(parse, from);
        if (this.props) this.props.invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.input) this.input.iterateLoop(parse);
        if (this.props) this.props.iterateLoop(parse);
    }
}