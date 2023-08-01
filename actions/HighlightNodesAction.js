class HighlightNodesAction
extends Action
{
    nodeIds          = [];

    prevColorIndices = [];
    newColorIndex;



    constructor(nodeIds, colorIndex)
    {
        super(
            HIGHLIGHT_NODES_ACTION,
              'HIGHLIGHT ' + nodeIds.length 
            + ' ' + countString(nodeIds.length, 'node')
            + ' as \'' + colorIndex + '\'');

        this.affectsConnections = false;
        this.selfUpdate         = true;

        this.nodeIds            = [...nodeIds];
        this.newColorIndex      = colorIndex;
    }



    do(updateNodes)
    {
        const nodes = this.nodeIds.map(id => nodeFromId(id));

        this.prevColorIndices = [];

        for (const node of nodes)
        {
            this.prevColorIndices.push(node.highlight);
            node.highlight = this.newColorIndex;
            node.updateBorder();
        }

        uiSaveNodes(this.nodeIds);
    }



    undo(updateNodes)
    {
        const nodes = this.nodeIds.map(id => nodeFromId(id));

        for (let i = 0; i < nodes.length; i++)
        {
            nodes[i].highlight = this.prevColorIndices[i];
            nodes[i].updateBorder();
        }

        uiSaveNodes(this.nodeIds);
    }
}