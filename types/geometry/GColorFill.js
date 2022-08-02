class GColorFill
extends GGeometryBase
{
    input = null;

    color;
    opacity;



    constructor(nodeId, active)
    {
        super(COLOR_FILL, nodeId, active);

        this.color = new GColorValue(
            new GNumberValue(1),
            new GNumberValue(0),
            new GNumberValue(0),
            new GNumberValue(0));

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
            if (this.input)
            {
                this.result = this.input.eval(parse).copy();
                console.assert(GEOMETRY_VALUES.includes(this.result.type));

                console.log('this.color =', this.color);
                this.result.fills.push([
                    COLOR_FILL, 
                    this.color.toString(), 
                    this.opacity.toString()])

                this.result.valid = true;
            }
            else
                this.result = new GGeometryValueBase();

                
            this.valid = true;
           
            
            genPushUpdateValue(parse, this.nodeId, this.result.type, this.result);


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