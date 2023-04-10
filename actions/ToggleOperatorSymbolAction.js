class ToggleOperatorSymbolAction
extends Action
{
    nodeId;
    get node() { return graph.nodeFromId(this.nodeId) } 

    showOnlySymbol;



    constructor(nodeId, showOnlySymbol)
    {
        super(
            TOGGLE_SYMBOL_ACTION,
            'TOGGLE MATH SYMBOL ' + boolToString(showOnlySymbol));
        
        this.affectsConnections = false;

        this.nodeId         = nodeId;
        this.showOnlySymbol = showOnlySymbol;
    }



    do(updateNodes)
    {
        this.node._showOnlySymbol = this.showOnlySymbol;

        this.node.updateNode();

        uiSaveNodes(graph, [this.nodeId]);
    }



    undo(updateNodes)
    {
        this.node._showOnlySymbol = !this.showOnlySymbol;

        this.node.updateNode();

        uiSaveNodes(graph, [this.nodeId]);
    }    
}