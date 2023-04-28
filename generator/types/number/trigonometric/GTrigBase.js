class GTrigBase
extends GNumberType
{
    input;



    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
    }
}
