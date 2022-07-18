class GRectangle
extends GOperator
{
    input  = null;

    x      = null;
    y      = null;
    width  = null;
    height = null;
    angle  = null;
    round  = null;



    constructor(nodeId, active)
    {
        super(RECTANGLE, nodeId, active);
    }



    isValid()
    {
        return this.input
               ? this.input.isValid()
               : (   this.x     .isValid()
                  && this.y     .isValid()
                  && this.width .isValid()
                  && this.height.isValid()
                  && this.angle .isValid()
                  && this.round .isValid());
    }

    

    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new GRectangle(this.nodeId, this.active);


            let input = 
                this.input 
                ? this.input.eval(parse) 
                : null;

            this.result.x      = (!input || this.x      ? this.x      : input.x     ).eval(parse);
            this.result.y      = (!input || this.y      ? this.y      : input.y     ).eval(parse);
            this.result.width  = (!input || this.width  ? this.width  : input.width ).eval(parse);
            this.result.height = (!input || this.height ? this.height : input.height).eval(parse);
            this.result.angle  = (!input || this.angle  ? this.angle  : input.angle ).eval(parse);
            this.result.round  = (!input || this.round  ? this.round  : input.round ).eval(parse);


            this.valid        = true;
            this.result.valid = true;
           
            
            genPushUpdateParamValue(parse, this.nodeId, 'x',      this.result.x     );
            genPushUpdateParamValue(parse, this.nodeId, 'y',      this.result.y     );
            genPushUpdateParamValue(parse, this.nodeId, 'width',  this.result.width );
            genPushUpdateParamValue(parse, this.nodeId, 'height', this.result.height);
            genPushUpdateParamValue(parse, this.nodeId, 'angle',  this.result.angle );
            genPushUpdateParamValue(parse, this.nodeId, 'round',  this.result.round );


            if (this.active)
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
        }


        return this.result;
    }
}