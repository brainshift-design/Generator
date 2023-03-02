class ToggleOperatorSymbolAction
extends Action
{
    nodeId;
    get node() { return nodeFromId(this.nodeId) } 

    showOnlySymbol;



    constructor(nodeId, showOnlySymbol)
    {
        super(
            TOGGLE_SYMBOL,
            'TOGGLE MATH SYMBOL ' + boolToString(showOnlySymbol));
        
        this.affectsConnections = false;

        this.nodeId         = nodeId;
        this.showOnlySymbol = showOnlySymbol;
    }



    do(updateNodes)
    {
        this.node._showOnlySymbol = this.showOnlySymbol;

        this.node.updateNode();

        uiSaveNodes([this.nodeId]);
    }



    undo(updateNodes)
    {
        this.node._showOnlySymbol = !this.showOnlySymbol;

        this.node.updateNode();

        uiSaveNodes([this.nodeId]);
    }    
}