class GEllipse
extends GOperator
{
    input  = null;

    x      = null;
    y      = null;
    width  = null;
    height = null;
    angle  = null;



    constructor(nodeId, active)
    {
        super(ELLIPSE, nodeId, active);
    }



    copy()
    {
        const elps = new GEllipse(this.nodeId, this.active);

        if (this.input) 
            elps.input = this.input.copy();

        if (this.x     ) elps.x      = this.x     .copy();
        if (this.y     ) elps.y      = this.y     .copy();
        if (this.width ) elps.width  = this.width .copy();
        if (this.height) elps.height = this.height.copy();
        if (this.angle ) elps.angle  = this.angle .copy();

        elps.copyBase(this);
        
        return elps;
    }



    isValid()
    {
        return this.input
               ? this.input.isValid()
               : (   this.x     .isValid()
                  && this.y     .isValid()
                  && this.width .isValid()
                  && this.height.isValid()
                  && this.angle .isValid());
    }

    

    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new GEllipseValue();


            if (this.input)
            {
                this.result = this.input.eval(parse).copy();

                console.assert(
                    this.result.type == ELLIPSE_VALUE, 
                    'this.result.type must be ELLIPSE_VALUE');

                if (this.x     ) this.result.x      = this.x     .eval(parse).copy();
                if (this.y     ) this.result.y      = this.y     .eval(parse).copy();
                if (this.width ) this.result.width  = this.width .eval(parse).copy();
                if (this.height) this.result.height = this.height.eval(parse).copy();
                if (this.angle ) this.result.angle  = this.angle .eval(parse).copy();
            }
            else
            {
                this.result.x      = this.x     .eval(parse).copy();
                this.result.y      = this.y     .eval(parse).copy();
                this.result.width  = this.width .eval(parse).copy();
                this.result.height = this.height.eval(parse).copy();
                this.result.angle  = this.angle .eval(parse).copy();
            }


            this.result.valid = true;
            this.valid        = true;
           
            
            genPushUpdateValue(parse, this.nodeId, ELLIPSE_VALUE, this.result);


            if (this.active)
            {
                genPushUpdateObject(
                    parse,
                    this.nodeId,
                    { 
                        nodeId: this.nodeId,          
                        type:   ELLIPSE,
                        id:     0,
                        x:      this.result.x     .value,
                        y:      this.result.y     .value,
                        width:  this.result.width .value,
                        height: this.result.height.value,
                        angle:  this.result.angle .value
                    });
            }
        }


        return this.result;
    }
}