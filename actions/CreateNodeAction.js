class CreateNodeAction
extends Action
{
    opType;
    createdNode = null;    


    constructor(opType)
    {
        super();
        this.opType = opType;
    }



    perform()
    {
        this.createdNode = uiCreateNode(this.opType);
    }



    undo()
    {
        uiDeleteNodes([this.createdNode]);
        this.createdNode = null;
        UOperator.nextId--;
    }
}