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