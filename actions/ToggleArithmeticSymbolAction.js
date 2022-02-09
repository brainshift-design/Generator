class ToggleArithmeticSymbolAction
extends Action
{
    nodeId;
    get node() { return graph.nodes.find(n => n.id == this.nodeId) } 

    showOnlySymbol;



    constructor(nodeId, showOnlySymbol)
    {
        super('show only symbol = ' + (showOnlySymbol ? 'true' : 'false'));

        this.nodeId         = nodeId;
        this.showOnlySymbol = showOnlySymbol;
    }



    do()
    {
        this.node._showOnlySymbol = this.showOnlySymbol;
        this.node.updateNode();
    }



    undo()
    {
        this.node._showOnlySymbol = !this.showOnlySymbol;
        this.node.updateNode();
    }    
}