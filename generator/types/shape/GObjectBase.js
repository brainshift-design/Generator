class GObjectBase
extends GOperator
{
    // fill    = null;
    // stroke  = null;
    

    objects = [];
    //styles  = [];
    props   = [];



    constructor(type, nodeId, options)
    {
        super(type, nodeId, options);
    }



    copyBase(base)
    {
        // if (base.fill  ) this.fill   = base.fill  .copy();
        // if (base.stroke) this.stroke = base.stroke.copy();

        this.copyObjects(base.objects);
        //this.copyStyles (base.styles );
        this.copyProperties(base.props);
    }



    copyObjects(objects)
    {
        this.objects = objects.map(o => o.copy());
    }



    // copyStyles(styles)
    // {
    //     this.styles = styles.map(s => s.copy());
    // }



    copyProperties(props)
    {
        this.props = props.map(p => p.copy());
    }



    // addUpdateObject(parse, nodeId, objects)
    // {
    //     if (this.options.active) 
    //         genPushUpdateObject(parse, nodeId, objects);
    //     else 
    //         this.objects.push(...objects);
    // }



    evalBase(parse, input)
    {
    //     if (!this.valid)
    //     {
    //         const fill   = evalFillValue  (this.fill,   parse);
    //         const stroke = evalStrokeValue(this.stroke, parse);
            
    //         if (input)
    //         {
    //             if (this.fill  ) this.result.fill   = fill;
    //             if (this.stroke) this.result.stroke = stroke;
    //         }
    //         else
    //         {
    //             this.result.fill   = fill;
    //             this.result.stroke = stroke;
    //         }


    //         genPushUpdateValue(parse, this.nodeId, 'fill',   this.result.fill  );
    //         genPushUpdateValue(parse, this.nodeId, 'stroke', this.result.stroke);
    //     }
    }



    async evalObjects(parse)
    {
        const props = this.props ? (await this.props.eval(parse)).toValue() : null;

        if (this.input)
            this.value.props = props.copy();


        for (const obj of this.objects)
        {
            // for (const prop of this.props.value.items)
            for (let i = this.props.value.items.length-1; i >= 0; i--)
            {
                const prop = this.props.value.items[i];
                

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
            }
        }


        genPushUpdateValue(parse, this.nodeId, 'props', this.props.toValue());
    }



    
    evalStyle(options = {})
    {
        // for (const style of this.styles)
        //     style.nodeId = this.nodeId;
    }
}






// evalObjects(options = {})
// {
//     if (!this.objects)
//         return;


//     if (this.options.enabled)
//     {
//         const rgb = scaleRgb(this.fill.color.toValue().toRgb());

//         for (const obj of this.objects)
//         {
//             if (!obj.strokes)
//                 obj.strokes = [];

//             obj.strokes.push([
//                 'SOLID', 
//                         rgb[0]
//                 + ' ' + rgb[1]
//                 + ' ' + rgb[2]
//                 + ' ' + this.fill.opacity.toValue().value]);


//             if (this.weight)
//                 obj.strokeWeight = this.weight.toValue().value;

//             if (this.fit)
//                 switch (this.fit.toValue().value)
//                 {
//                     case 0: obj.strokeAlign = 'INSIDE';  break;
//                     case 1: obj.strokeAlign = 'CENTER';  break;
//                     case 2: obj.strokeAlign = 'OUTSIDE'; break;
//                 }

//             if (this.join)
//                 switch (this.join.toValue().value)
//                 {
//                     case 0: obj.strokeJoin = 'MITER'; break;
//                     case 1: obj.strokeJoin = 'BEVEL'; break;
//                     case 2: obj.strokeJoin = 'ROUND'; break;
//                 }

//             if (this.miter)
//                 obj.strokeMiterLimit = this.miter.toValue().value;
//         }
//     }

    
//     super.evalObjects();
// }
