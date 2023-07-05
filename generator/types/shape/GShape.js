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



    isCached()
    {
        return super.isCached()
            && (  !this.input 
                || this.input.isCached());
    }



    async evalShapeBase(parse)
    {
        let props = this.props ? (await this.props.eval(parse)).toValue() : null;

        if (   props
            && STYLE_VALUES.includes(props.type))
            props = new ListValue([props]);

            
        if (this.input)
            this.value.props = props ?? this.input.value.props;
        else
            this.value.props = props;

            
        if (this.value.props != undefined) 
            this.updateValues.push(['props', this.value.props]);
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
                else if (prop.type ==   LAYER_MASK_VALUE)  addLayerMaskProp  (obj);
            }
        }
    }



    evalStyle(options = {})
    {

    }



    isValid()
    {
        return super.isValid()
            && this.props.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.props) this.props.pushValueUpdates(parse);
    }


    
    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input) this.input.invalidateInputs(from);
        if (this.props) this.props.invalidateInputs(from);
    }
}