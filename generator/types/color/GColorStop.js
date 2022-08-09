class GColorStop
extends GOperator
{
    input    = null;

    color    = null;
    opacity  = null;
    position = null;



    constructor(nodeId, active)
    {
        super(COLOR_STOP, nodeId, active);
    }


    
    copy()
    {
        const stop = new GColorStop(this.nodeId, this.active);

        if (this.input) 
            stop.input = this.input.copy();

        if (this.color   ) stop.color    = this.color   .copy();
        if (this.opacity ) stop.opacity  = this.opacity .copy();
        if (this.position) stop.position = this.position.copy();

        return stop;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new GColorStopValue();


            if (this.input)
            {
                this.result = this.input.eval(parse).copy();
                console.assert(this.result.type == COLOR_STOP_VALUE);

                if (this.result.isValid())
                {
                    if (this.color   ) this.result.color    = this.color   .eval(parse).copy();
                    if (this.opacity ) this.result.opacity  = this.opacity .eval(parse).copy();
                    if (this.position) this.result.position = this.position.eval(parse).copy();
                }
            }
            else
            {
                this.result.color    = this.color   .eval(parse).copy();
                this.result.opacity  = this.opacity .eval(parse).copy();
                this.result.position = this.position.eval(parse).copy();
            }


            this.result.valid = true;
            this.valid        = true;


            genPushUpdateValue(parse, this.nodeId, 'value', this.result);
        }


        return this.result;
    }



    get mustNotEval()
    {
        return this.color   .mustNotEval
            && this.opacity .mustNotEval
            && this.position.mustNotEval;
    }
}