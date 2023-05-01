class GShape
extends GOperator
{
    x      = null;
    y      = null;
    width  = null;
    height = null;
    angle  = null;

    props  = null;
   


    constructor(type, nodeId, options)
    {
        super(type, nodeId, options);
    }



    copyBase(base)
    {
        //if (base.value ) this.value  = base.value .copy();
        if (base.x     ) this.x      = base.x     .copy();
        if (base.y     ) this.y      = base.y     .copy();
        if (base.width ) this.width  = base.width .copy();
        if (base.height) this.height = base.height.copy();
        if (base.angle ) this.angle  = base.angle .copy();

        this.copyProperties(base.props);
    }



    copyProperties(props)
    {
        this.props = props.map(p => p.copy());
    }



    async evalBaseParams(parse, evalHeight = true)
    {
        const x      = this.x      ? (await this.x     .eval(parse)).toValue() : null;
        const y      = this.y      ? (await this.y     .eval(parse)).toValue() : null;
        const width  = this.width  ? (await this.width .eval(parse)).toValue() : null;

        const height = evalHeight
                    && this.height ? (await this.height.eval(parse)).toValue() : null;

        const angle  = this.angle  ? (await this.angle .eval(parse)).toValue() : null;

        return [x, y, width, height, angle];
    }



    async evalShapeBase(parse, input, evalHeight = true)
    {
        let props = this.props ? (await this.props.eval(parse)).toValue() : null;

        if (   props
            && (   props.type ==  COLOR_VALUE
                || props.type ==   FILL_VALUE
                || props.type == STROKE_VALUE))
            props = new ListValue([props]);


        if (this.input)
            this.value.props = props ?? input.props;
        else
            this.value.props = props;


        if (parse.isLastRepeat())
        {
            genPushUpdateValue(parse, this.nodeId, 'x',      this.value.x     );
            genPushUpdateValue(parse, this.nodeId, 'y',      this.value.y     );
            genPushUpdateValue(parse, this.nodeId, 'width',  this.value.width );

            if (evalHeight) // lines don't have height
                genPushUpdateValue(parse, this.nodeId, 'height', this.value.height);

            genPushUpdateValue(parse, this.nodeId, 'angle',  this.value.angle );

            genPushUpdateValue(parse, this.nodeId, 'props',  this.value.props );
        }
    }



    async evalObjects(parse)
    {
        for (const obj of this.objects)
        {
            for (let i = this.value.props.items.length-1; i >= 0; i--)
            {
                const prop = this.value.props.items[i];
                

                if (prop.type == COLOR_VALUE)
                {
                    if (!obj.fills) 
                        obj.fills = [];


                    const rgb = scaleRgb(prop.toRgb());

                    obj.fills.push([
                        'SOLID', 
                                rgb[0]
                        + ' ' + rgb[1]
                        + ' ' + rgb[2]
                        + ' ' + '255']);
                }

                else if (prop.type == FILL_VALUE)
                {
                    if (!obj.fills) 
                        obj.fills = [];


                    const rgb = scaleRgb(prop.color.toRgb());

                    obj.fills.push([
                        'SOLID', 
                                rgb[0]
                        + ' ' + rgb[1]
                        + ' ' + rgb[2]
                        + ' ' + prop.opacity.toValue().toNumber()]);
                }

                else if (prop.type == STROKE_VALUE)
                {
                    if (!obj.strokes)
                        obj.strokes = [];


                    const rgb = scaleRgb(prop.fill.color.toRgb());

                    obj.strokes.push([
                        'SOLID', 
                                rgb[0]
                        + ' ' + rgb[1]
                        + ' ' + rgb[2]
                        + ' ' + prop.fill.opacity.toValue().toNumber()]);


                    obj.strokeWeight = prop.weight.toValue().toNumber();

                    switch (prop.fit.toValue().value)
                    {
                        case 0: obj.strokeFit = 'INSIDE';  break;
                        case 1: obj.strokeFit = 'CENTER';  break;
                        case 2: obj.strokeFit = 'OUTSIDE'; break;
                    }

                    switch (prop.join.toValue().value)
                    {
                        case 0: obj.strokeJoin = 'MITER'; break;
                        case 1: obj.strokeJoin = 'BEVEL'; break;
                        case 2: obj.strokeJoin = 'ROUND'; break;
                    }

                    obj.strokeMiterLimit = prop.miter.toValue().value;
                }
            }
        }
    }


    
    evalStyle(options = {})
    {
        // for (const style of this.styles)
        //     style.nodeId = this.nodeId;
    }



    isValid()
    {
        return super.isValid()
            && this.x     .isValid()
            && this.y     .isValid()
            && this.width .isValid()
            && this.height.isValid()
            && this.angle .isValid()
            && this.props .isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.x     ) this.x     .invalidate();
        if (this.y     ) this.y     .invalidate();
        if (this.width ) this.width .invalidate();
        if (this.height) this.height.invalidate();
        if (this.angle ) this.angle .invalidate();
        if (this.props ) this.props .invalidate();
    }
}