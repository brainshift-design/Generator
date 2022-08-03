class GColorStroke
extends GGeometryBase
{
    input = null;

    color;
    opacity;

    strokeWeight;
    strokeFit;
    strokeJoin;
    strokeMiter;



    constructor(nodeId, active)
    {
        super(COLOR_FILL, nodeId, active);

        this.color        = GColorValue.create(1, 0, 0, 0);
        this.opacity      = new GNumberValue(1);

        this.strokeWeight = new GNumberValue(1);
        this.strokeFit    = new GNumberValue(0);
        this.strokeJoin   = new GNumberValue(0);
        this.strokeMiter  = new GNumberValue(28.96, 2);
    }



    copy()
    {
        const strk = new GColorStroke(this.nodeId, this.active);

        if (this.input) strk.input = this.input.copy();

        strk.color        = this.color       .copy();
        strk.opacity      = this.opacity     .copy();

        strk.strokeWeight = this.strokeWeight.copy();
        strk.strokeFit    = this.strokeFit   .copy();
        strk.strokeJoin   = this.strokeJoin  .copy();
        strk.strokeMiter  = this.strokeMiter .copy();

        return strk;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            const color        = this.color       .eval(parse).copy();
            const opacity      = this.opacity     .eval(parse).copy();
            const strokeWeight = this.strokeWeight.eval(parse).copy();
            const strokeFit    = this.strokeFit   .eval(parse).copy();
            const strokeJoin   = this.strokeJoin  .eval(parse).copy();
            const strokeMiter  = this.strokeMiter .eval(parse).copy();

            if (this.input)
            {
                this.result = this.input.eval(parse).copy();
                console.assert(GEOMETRY_VALUES.includes(this.result.type));

                this.result.strokes.push([
                    COLOR_FILL, 
                    color.toRgbString(), 
                    (opacity.value / 100).toString()]);

                this.result.strokeWeight = strokeWeight;
                this.result.strokeFit    = strokeFit;
                this.result.strokeJoin   = strokeJoin;
                this.result.strokeMiter  = strokeMiter;

                this.result.valid = true;
            }
            else
                this.result = new GGeometryValueBase();

                
            this.valid = true;
           
            
            genPushUpdateValue(parse, this.nodeId, this.result.type, this.result);

            genPushUpdateValue(parse, this.nodeId, 'color',        color       );
            genPushUpdateValue(parse, this.nodeId, 'opacity',      opacity     );
            genPushUpdateValue(parse, this.nodeId, 'strokeWeight', strokeWeight);
            genPushUpdateValue(parse, this.nodeId, 'strokeFit',    strokeFit   );
            genPushUpdateValue(parse, this.nodeId, 'strokeJoin',   strokeJoin  );
            genPushUpdateValue(parse, this.nodeId, 'strokeMiter',  strokeMiter );


            if (   this.active
                && this.result.valid)
                genPushUpdateObject(
                    parse,
                    this.nodeId,
                    this.result.toFigmaObject());
        }


        return this.result;
    }
}