class GLine
extends GOperator
{
    input  = null;

    x      = null;
    y      = null;
    width  = null;
    angle  = null;



    constructor(nodeId, active)
    {
        super(LINE, nodeId, active);
    }



    copy()
    {
        const line = new GLine(this.nodeId, this.active);

        if (this.input) 
            line.input = this.input.copy();

        if (this.x     ) line.x      = this.x     .copy();
        if (this.y     ) line.y      = this.y     .copy();
        if (this.width ) line.width  = this.width .copy();
        if (this.angle ) line.angle  = this.angle .copy();

        line.copyBase(this);

        return line;
    }



    isValid()
    {
        return this.input
               ? this.input.isValid()
               : (   this.x     .isValid()
                  && this.y     .isValid()
                  && this.width .isValid()
                  && this.angle .isValid());
    }

    

    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new GLineValue();


            if (this.input)
            {
                this.result = this.input.eval(parse).copy();

                console.assert(
                    this.result.type == LINE_VALUE, 
                    'this.result.type must be LINE_VALUE');

                if (this.x     ) this.result.x      = this.x     .eval(parse).copy();
                if (this.y     ) this.result.y      = this.y     .eval(parse).copy();
                if (this.width ) this.result.width  = this.width .eval(parse).copy();
                if (this.angle ) this.result.angle  = this.angle .eval(parse).copy();
            }
            else
            {
                this.result.x      = this.x     .eval(parse).copy();
                this.result.y      = this.y     .eval(parse).copy();
                this.result.width  = this.width .eval(parse).copy();
                this.result.angle  = this.angle .eval(parse).copy();
            }


            this.result.valid = true;
            this.valid        = true;
           
            
            genPushUpdateValue(parse, this.nodeId, LINE_VALUE, this.result);


            if (this.active)
            {
                genPushUpdateObject(
                    parse,
                    this.nodeId,
                    { 
                        nodeId: this.nodeId,          
                        type:   LINE,
                        id:     0,
                        x:      this.result.x     .value,
                        y:      this.result.y     .value,
                        width:  this.result.width .value,
                        angle:  this.result.angle .value
                    });
            }
        }


        return this.result;
    }
}