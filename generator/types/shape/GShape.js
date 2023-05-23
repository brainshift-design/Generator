class GShape
extends GShapeBase
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
        super.copyBase(base);
        
        this.copyProperties(base.props);
    }



    copyProperties(props)
    {
        this.props = props.copy();
    }



    async evalShapeBase(parse, input, evalHeight = true)
    {
        super.evalShapeBase(parse, input, evalHeight);


        let props = this.props ? (await this.props.eval(parse)).toValue() : null;

        if (   props
            && STYLE_VALUES.includes(props.type))
            props = new ListValue([props]);


        if (this.input)
            this.value.props = props ?? input.props;
        else
            this.value.props = props;

            
        if (this.value.props != undefined) 
            this.updateValues.push(['props', this.value.props]);
    }



    async evalObjects(parse)
    {
        for (const obj of this.objects)
        {
            console.assert(obj.fills,   'obj.fills must not be null'  );
            console.assert(obj.strokes, 'obj.strokes must not be null');
            console.assert(obj.effects, 'obj.effects must not be null');

            for (let i = this.value.props.items.length-1; i >= 0; i--)
            {
                const prop = this.value.props.items[i];
                console.log('prop =', prop);
                

                if (prop.type == COLOR_VALUE)
                {
                    const rgb = scaleRgb(prop.toRgb());

                    obj.fills.push([
                        'SOLID', 
                        rgb[0], 
                        rgb[1], 
                        rgb[2], 
                        255   ]);
                }

                else if (prop.type == FILL_VALUE)
                {
                    const rgb = scaleRgb(prop.color.toRgb());

                    obj.fills.push([
                        'SOLID', 
                        rgb[0], 
                        rgb[1], 
                        rgb[2], 
                        prop.opacity.toValue().toNumber() ]);
                }

                else if (prop.type == GRADIENT_VALUE)
                {
                    const gradient = 
                    [
                        '', // type
                        [], // transform
                        []  // stops
                    ];


                    switch(prop.gradType.value)
                    {
                        case 0: gradient[0] = 'GRADIENT_LINEAR';  break;
                        case 1: gradient[0] = 'GRADIENT_RADIAL';  break;
                        case 2: gradient[0] = 'GRADIENT_ANGULAR'; break;
                        case 3: gradient[0] = 'GRADIENT_DIAMOND'; break;
                    }


                    for (let j = 0; j < prop.stops.length; j++)
                    {
                        const rgba = scaleRgb(prop.stops[j].toRgba());

                        gradient[2].push([
                            rgba[0], 
                            rgba[1], 
                            rgba[2], 
                            rgba[3],
                            prop.stops[j].position]);
                    }


                    console.log('gradient =', gradient);
                    obj.fills.push(gradient);
                }

                else if (prop.type == STROKE_VALUE)
                {
                    const rgb = scaleRgb(prop.fill.color.toRgb());

                    obj.strokes.push([
                        'SOLID', 
                        rgb[0],
                        rgb[1],
                        rgb[2],
                        prop.fill.opacity.toValue().toNumber() ]);


                    obj.strokeWeight = prop.weight.toValue().toNumber();

                    switch (prop.fit.toValue().value)
                    {
                        case 0: obj.strokeAlign = 'INSIDE';  break;
                        case 1: obj.strokeAlign = 'CENTER';  break;
                        case 2: obj.strokeAlign = 'OUTSIDE'; break;
                    }

                    switch (prop.join.toValue().value)
                    {
                        case 0: obj.strokeJoin = 'MITER'; break;
                        case 1: obj.strokeJoin = 'BEVEL'; break;
                        case 2: obj.strokeJoin = 'ROUND'; break;
                    }

                    obj.strokeMiterLimit = prop.miter.toValue().value;
                }

                else if (prop.type == DROP_SHADOW_VALUE)
                {
                    const rgba = prop.fill.toRgba();

                    obj.effects.push([
                        'DROP_SHADOW', 
                        rgba[0],
                        rgba[1],
                        rgba[2],
                        rgba[3],
                        prop.x.toNumber(),
                        prop.y.toNumber(),
                        prop.blur.toNumber(),
                        prop.spread.toNumber(),
                        BlendModes[prop.blend.value][2],
                        prop.behind.value > 0,
                        prop.visible ]);
                }

                else if (prop.type == INNER_SHADOW_VALUE)
                {
                    const rgba = prop.fill.toRgba();

                    obj.effects.push([
                        'INNER_SHADOW', 
                        rgba[0],
                        rgba[1],
                        rgba[2],
                        rgba[3],
                        prop.x.toNumber(),
                        prop.y.toNumber(),
                        prop.blur.toNumber(),
                        prop.spread.toNumber(),
                        BlendModes[prop.blend.value][2],
                        prop.visible ]);
                }

                else if (prop.type == LAYER_BLUR_VALUE)
                {
                    obj.effects.push([
                        'LAYER_BLUR', 
                        prop.radius.toNumber(),
                        prop.visible ]);
                }

                else if (prop.type == BACK_BLUR_VALUE)
                {
                    obj.effects.push([
                        'BACKGROUND_BLUR', 
                        prop.radius.toNumber(),
                        prop.visible ]);
                }

                else if (prop.type == LAYER_MASK_VALUE)
                    obj.isMask = true;
            }
        }


        if (this.value)
            this.value.objects = this.objects.map(o => o.copy());
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.props) this.props.pushValueUpdates(parse);
    }


    
    evalStyle(options = {})
    {

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