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



function addColorProp(obj, prop)
{
    const rgb = scaleRgb(prop.toRgb());

    obj.fills.push([
        'SOLID', 
        rgb[0], 
        rgb[1], 
        rgb[2], 
        255   ]);
}



function addFillProp(obj, prop)
{
    const rgb = scaleRgb(prop.color.toRgb());

    obj.fills.push([
        'SOLID', 
        rgb[0], 
        rgb[1], 
        rgb[2], 
        prop.opacity.toValue().toNumber() ]);
}



function addGradientProp(obj, prop)                
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


    const isLinear = prop.gradType.value == 0;


    let   x   = prop.x    .toNumber() / 100;
    let   y   = prop.y    .toNumber() / 100;
    const a   = prop.angle.toNumber()/360*Tau;
    let   s   = nozero(prop.size  .toNumber() / 100);
    let   asp = nozero(prop.aspect.toNumber() / 100);
    let   sk  = prop.skew .toNumber() / 100;


    if (!isLinear)
    {
        x  -= s * Math.cos(a);
        y  -= s * Math.sin(a);

        s  *= 2;

        asp /= 2;
    }

    
    const p0 = point(x, y);
    const p1 = addv(p0, vector(a, s));
    
    const p2 = addv(
        addv(p0, vector(a + Tau/4, s * asp)),
        mulvs(unitv(subv(p1, p0)), distance(p0, p1) * sk));


    const identityHandles = 
        [[0,   1,   0],
         [0.5, 0.5, 1],
         [1,   1,   1]];


    let xform = [
        [p0.x, p1.x, p2.x],
        [p0.y, p1.y, p2.y],
        [1,    1,    1   ]];


    xform = mulm3m3(identityHandles, inversem3(xform));


    gradient[1] = [
        xform[0],
        xform[1] ];
        

    for (let j = 0; j < prop.stops.items.length; j++)
    {
        const item = prop.stops.items[j];

        if (item.type == COLOR_VALUE)
        {
            prop.stops.items[j] = new ColorStopValue(
                FillValue.fromRgb(scaleRgb(item.toRgb()), 100),
                NumberValue.NaN);
        }
        else if (item.type == FILL_VALUE)
        {
            prop.stops.items[j] = new ColorStopValue(
                item,
                NumberValue.NaN);
        }
    }


    if (    prop.stops.items.length > 0
        && !prop.stops.items[0].position.isValid()) 
        prop.stops.items[0].position = new NumberValue(0);

    if (    prop.stops.items.length > 1
        && !prop.stops.items.at(-1).position.isValid()) 
        prop.stops.items.at(-1).position = new NumberValue(100);
    
    if (prop.stops.items.length > 2)
    {
        for (let j = 1; j < prop.stops.items.length-1; j++)
        {
            const item = prop.stops.items[j];

            if (!item.position.isValid())
            {
                let prevValid = j-1;
                let nextValid = j+1;

                while ( prevValid > 0
                    && !prop.stops.items[prevValid].position.isValid()) 
                    prevValid--;

                while ( nextValid < prop.stops.items.length-1
                    && !prop.stops.items[nextValid].position.isValid()) 
                    nextValid++;
                        
                const pv = prop.stops.items[prevValid].position.toNumber();
                const nv = prop.stops.items[nextValid].position.toNumber();

                item.position = new NumberValue((pv + (nv - pv) * ((j - prevValid) / (nextValid - prevValid)))); 
            }
        }
    }


    for (let j = 0; j < prop.stops.items.length; j++)
    {
        const item = prop.stops.items[j];
        const rgba = item.fill.toRgba();

        gradient[2].push([
            rgba[0], 
            rgba[1], 
            rgba[2], 
            rgba[3],
            item.position.toNumber() / 100]);
    }


    obj.fills.push(gradient);
}



function addStrokeProp(obj, prop)
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



function addDropShadowProp(obj, prop)
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



function addInnerShadowProp(obj, prop)
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



function addLayerBlurProp(obj, prop)
{
    obj.effects.push([
        'LAYER_BLUR', 
        prop.radius.toNumber(),
        prop.visible ]);
}



function addBackBlurProp(obj, prop)
{
    obj.effects.push([
        'BACKGROUND_BLUR', 
        prop.radius.toNumber(),
        prop.visible ]);
}



function addMaskProp(obj)
{
    obj.isMask = true;
}