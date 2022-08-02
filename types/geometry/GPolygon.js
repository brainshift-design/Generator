class GPolygon
extends GOperator
{
    input   = null;

    x       = null;
    y       = null;
    width   = null;
    height  = null;
    angle   = null;
    round   = null;
    corners = null;



    constructor(nodeId, active)
    {
        super(POLYGON, nodeId, active);
    }



    copy()
    {
        const poly = new GPolygon(this.nodeId, this.active);

        if (this.input) 
            poly.input = this.input.copy();

        if (this.x      ) poly.x       = this.x      .copy();
        if (this.y      ) poly.y       = this.y      .copy();
        if (this.width  ) poly.width   = this.width  .copy();
        if (this.height ) poly.height  = this.height .copy();
        if (this.angle  ) poly.angle   = this.angle  .copy();
        if (this.round  ) poly.round   = this.round  .copy();
        if (this.corners) poly.corners = this.corners.copy();

        poly.copyBase(this);

        return poly;
    }



    isValid()
    {
        return this.input
               ? this.input.isValid()
               : (   this.x      .isValid()
                  && this.y      .isValid()
                  && this.width  .isValid()
                  && this.height .isValid()
                  && this.angle  .isValid()
                  && this.round  .isValid()
                  && this.corners.isValid());
    }

    

    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new GPolygonValue();


            if (this.input)
            {
                this.result = this.input.eval(parse).copy();
                console.assert(this.result.type == POLYGON_VALUE);

                if (this.x      ) this.result.x       = this.x      .eval(parse).copy();
                if (this.y      ) this.result.y       = this.y      .eval(parse).copy();
                if (this.width  ) this.result.width   = this.width  .eval(parse).copy();
                if (this.height ) this.result.height  = this.height .eval(parse).copy();
                if (this.angle  ) this.result.angle   = this.angle  .eval(parse).copy();
                if (this.round  ) this.result.round   = this.round  .eval(parse).copy();
                if (this.corners) this.result.corners = this.corners.eval(parse).copy();
            }
            else
            {
                this.result.x       = this.x      .eval(parse).copy();
                this.result.y       = this.y      .eval(parse).copy();
                this.result.width   = this.width  .eval(parse).copy();
                this.result.height  = this.height .eval(parse).copy();
                this.result.angle   = this.angle  .eval(parse).copy();
                this.result.round   = this.round  .eval(parse).copy();
                this.result.corners = this.corners.eval(parse).copy();
            }


            this.result.valid = true;
            this.valid        = true;
           
            
            genPushUpdateValue(parse, this.nodeId, POLYGON_VALUE, this.result);


            if (this.active)
            {
                genPushUpdateObject(
                    parse,
                    this.nodeId,
                    { 
                        nodeId:  this.nodeId,          
                        type:    POLYGON,
                        id:      0,
                        x:       this.result.x     .value,
                        y:       this.result.y     .value,
                        width:   this.result.width .value,
                        height:  this.result.height.value,
                        angle:   this.result.angle .value,
                        round:   Math.max(0, this.result.round.value),
                        corners: this.result.corners.value
                    });
            }
        }


        return this.result;
    }
}