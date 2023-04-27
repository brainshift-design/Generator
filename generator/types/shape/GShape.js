class GShape
extends GOperator
{
    props = null;
   


    constructor(type, nodeId, options)
    {
        super(type, nodeId, options);
    }



    copyBase(base)
    {
        this.copyProperties(base.props);
    }



    copyProperties(props)
    {
        this.props = props.map(p => p.copy());
    }



    async evalBase(parse, input)
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


        genPushUpdateValue(parse, this.nodeId, 'props', this.value.props);
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
            && this.props.isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.props) this.props.invalidate();
    }
}