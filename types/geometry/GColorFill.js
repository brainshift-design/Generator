class GColorFill
extends GGeometryBase
{
    input = null;

    color;
    opacity;



    constructor(nodeId, active)
    {
        super(COLOR_FILL, nodeId, active);

        this.color   = GColorValue.create(1, 0, 0, 0);
        this.opacity = new GNumberValue(100);
    }



    copy()
    {
        const fill = new GColorFill(this.nodeId, this.active);

        if (this.input) fill.input = this.input.copy();

        fill.color   = this.color  .copy();
        fill.opacity = this.opacity.copy();

        return fill;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            const color   = this.color  .eval(parse).copy();
            const opacity = this.opacity.eval(parse).copy();

            if (this.input)
            {
                this.result = this.input.eval(parse).copy();
                console.assert(GEOMETRY_VALUES.includes(this.result.type));

                this.result.fills.push([
                    COLOR_FILL, 
                    color  .toRgbString(), 
                    (opacity.value / 100).toString()]);

                this.result.valid = true;
            }
            else
                this.result = new GGeometryValueBase();

                
            this.valid = true;
           
            
            genPushUpdateValue(parse, this.nodeId, this.result.type, this.result);

            genPushUpdateValue(parse, this.nodeId, 'color',   color  );
            genPushUpdateValue(parse, this.nodeId, 'opacity', opacity);


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