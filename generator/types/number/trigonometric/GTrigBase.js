class GTrigBase
extends GNumberType
{
    input;



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
    }
}
