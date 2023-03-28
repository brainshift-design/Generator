class EmptyControl
extends Control
{
    constructor(div, param)
    {
        super(div, param, NULL, NULL);
    }



    canReact(e)
    {
        return false;
    }
}
