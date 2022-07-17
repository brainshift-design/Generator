class GRectangle
extends GOperator
{
    input = null;

    x;
    y;
    width;
    height;
    angle;
    round;



    constructor(nodeId, active)
    {
        super(RECTANGLE, nodeId, active);
    }



    isValid()
    {
        return this.x     .isValid()
            && this.y     .isValid()
            && this.width .isValid()
            && this.height.isValid()
            && this.angle .isValid()
            && this.round .isValid();
    }

    

    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new GRectangle(this.nodeId, this.active);

            
            if (this.input)
            {
                this.result.input = this.input.eval(parse);

                this.result.x      = this.result.input.x     .result;
                this.result.y      = this.result.input.y     .result;
                this.result.width  = this.result.input.width .result;
                this.result.height = this.result.input.height.result;
                this.result.angle  = this.result.input.angle .result;
                this.result.round  = this.result.input.round .result;
            }
            
            
            this.result.x      = this.x     .eval(parse);
            this.result.y      = this.y     .eval(parse);
            this.result.width  = this.width .eval(parse);
            this.result.height = this.height.eval(parse);
            this.result.angle  = this.angle .eval(parse);
            this.result.round  = this.round .eval(parse);

           
            genPushUpdateParamValue(parse, this.nodeId, 'x',      this.result.x     );
            genPushUpdateParamValue(parse, this.nodeId, 'y',      this.result.y     );
            genPushUpdateParamValue(parse, this.nodeId, 'width',  this.result.width );
            genPushUpdateParamValue(parse, this.nodeId, 'height', this.result.height);
            genPushUpdateParamValue(parse, this.nodeId, 'angle',  this.result.angle );
            genPushUpdateParamValue(parse, this.nodeId, 'round',  this.result.round );


            if (   this.active
                && this.result.isValid())
            {
                genPushUpdateObject(
                    parse,
                    this.nodeId,
                    { 
                        nodeId: this.nodeId,          
                        type:   RECTANGLE,
                        id:     0,
                        x:      this.result.x     .value,
                        y:      this.result.y     .value,
                        width:  this.result.width .value,
                        height: this.result.height.value,
                        angle:  this.result.angle .value,
                        round:  Math.max(0, this.result.round.value)
                    });
            }


            this.valid        = true;
            this.result.valid = true;
        }


        return this.result;
    }
}