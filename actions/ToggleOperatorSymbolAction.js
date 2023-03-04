class ToggleOperatorSymbolAction
extends Action
{
    nodeId;
    get node() { return this.graph.nodeFromId(this.nodeId) } 

    showOnlySymbol;



    constructor(graph, nodeId, showOnlySymbol)
    {
        super(
            graph,
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

        uiSaveNodes(this.graph, [this.nodeId]);
    }



    undo(updateNodes)
    {
        this.node._showOnlySymbol = !this.showOnlySymbol;

        this.node.updateNode();

        uiSaveNodes(this.graph, [this.nodeId]);
    }    
}