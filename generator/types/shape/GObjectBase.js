class GObjectBase
extends GOperator
{
    // fill    = null;
    // stroke  = null;
    

    objects = [];
    styles  = [];



    constructor(type, nodeId, options)
    {
        super(type, nodeId, options);
    }



    copyBase(base)
    {
        // if (base.fill  ) this.fill   = base.fill  .copy();
        // if (base.stroke) this.stroke = base.stroke.copy();

        this.copyObjects(base.objects);
        this.copyStyles (base.styles );
    }



    copyObjects(objects)
    {
        this.objects = objects.map(o => o.copy());
    }



    copyStyles(styles)
    {
        this.styles = styles.map(s => s.copy());
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



    evalObjects(options = {})
    {
        // for (const obj of this.objects)
        //     obj.nodeId = this.nodeId;
    }



    
    evalStyle(options = {})
    {
        // for (const style of this.styles)
        //     style.nodeId = this.nodeId;
    }
}





// evalObjects()
// {
//     if (!this.objects)
//         return;
    
    
//     if (this.options.enabled)
//     {
//         const rgb = scaleRgb(this.color.toValue().toRgb());

//         for (const obj of this.objects)
//         {
//             if (!obj.fills) 
//                 obj.fills = [];

//             obj.fills.push([
//                 'SOLID', 
//                         rgb[0]
//                 + ' ' + rgb[1]
//                 + ' ' + rgb[2]
//                 + ' ' + this.opacity.toValue().toNumber()]);
//         }
//     }

    
//     super.evalObjects();
// }




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
