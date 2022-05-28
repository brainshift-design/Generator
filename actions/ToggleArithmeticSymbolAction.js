class ToggleArithmeticSymbolAction
extends Action
{
    nodeId;
    get node() { return nodeFromId(this.nodeId) } 

    showOnlySymbol;



    constructor(nodeId, showOnlySymbol)
    {
        super('TOGGLE MATH SYMBOL ' + boolString(showOnlySymbol));

        this.nodeId         = nodeId;
        this.showOnlySymbol = showOnlySymbol;
    }



    do()
    {
        this.node._showOnlySymbol = this.showOnlySymbol;
        this.node.updateNode();

        uiSaveNodes([this.nodeId]);
    }



    undo()
    {
        this.node._showOnlySymbol = !this.showOnlySymbol;
        this.node.updateNode();

        uiSaveNodes([this.nodeId]);
    }    
}