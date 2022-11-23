class GArithmetic
extends GNumberType
{
    input = null;

    operand;



    copyBase(base)
    {
        super.copyBase(base);

        if (base.operand) this.operand = base.operand.copy();
    }
}
