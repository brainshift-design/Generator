class LinkExistingStyleAction
extends Action
{
    nodeId;
    get node() { return nodeFromId(this.nodeId) } 

    styleName;

    paints = [];



    constructor(nodeId, styleName, paints)
    {
        super('LINK STYLE \'' + nodeId + ' <-- ' + styleName + ')');
        
        this.affectsConnections = false;

        this.nodeId    = nodeId;
        this.styleName = styleName;
        this.paints    = [...paints];
    }



    do(updateNodes)
    {
        uiLinkNodeToExistingColorStyle(
            this.node, 
            this.styleName, 
            this.paints);

        pushUnique(updateNodes, this.node);

        uiSaveNodes([this.nodeId]);
    }



    undo(updateNodes)
    {

        this.node.updateNode();

        uiSaveNodes([this.nodeId]);
    }    
}