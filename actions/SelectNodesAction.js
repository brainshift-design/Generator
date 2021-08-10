class SelectNodesAction
extends Action
{
    selected       = [];
    selectedBefore = [];



    constructor(nodes)
    {
        super();

        selected = [...nodes];
    }



    perform()
    {

    }



    undo()
    {

    }
}