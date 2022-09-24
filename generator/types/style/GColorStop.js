class GColorStop
extends GOperator
{
    input    = null;

    fill     = null;
    position = null;



    constructor(nodeId, options)
    {
        super(COLOR_STOP, nodeId, options);
    }


    
    copy()
    {
        const stop = new GColorStop(this.nodeId, this.options);

        if (this.input) 
            stop.input = this.input.copy();

        if (this.fill    ) stop.fill     = this.fill    .copy();
        if (this.position) stop.position = this.position.copy();

        return stop;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new ColorStopValue();


            if (this.input)
            {
                this.result = this.input.eval(parse).copy();

                console.assert(
                    this.result.type == COLOR_STOP_VALUE, 
                    'this.result.type must be COLOR_STOP_VALUE');

                if (this.result.isValid())
                {
                    if (this.fill    ) this.result.fill     = this.fill    .eval(parse).copy();
                    if (this.position) this.result.position = this.position.eval(parse).copy();
                }
            }
            else
            {
                this.result.fill     = this.fill    .eval(parse).copy();
                this.result.position = this.position.eval(parse).copy();
            }


            this.result.valid = true;
            this.valid        = true;


            genPushUpdateValue(parse, this.nodeId, 'value', this.result);
        }


        return this.result;
    }
}