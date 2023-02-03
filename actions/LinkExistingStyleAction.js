class LinkExistingStyleAction
extends Action
{
    nodeId;
    get node() { return nodeFromId(this.nodeId) } 

    styleName;
    paints;

    prevStyleName;
    prevPaints;



    constructor(nodeId, styleName, paints)
    {
        super('LINK STYLE \'' + nodeId + ' ⟶ ' + styleName + ')');
        
        this.affectsConnections = false;

        this.nodeId    = nodeId;
        this.styleName = styleName;
        this.paints    = [...paints];
    }



    do(updateNodes)
    {
        this.prevStyleName = this.node.linkedStyle;
        this.prevPaints    = [this.node.paramValue.value.toRgb()];
        
        uiLinkNodeToExistingColorStyle(
            this.node, 
            this.styleName, 
            [...this.paints]);

        pushUnique(updateNodes, this.node);

        uiSaveNodes([this.nodeId]);
    }



    undo(updateNodes)
    {
        uiLinkNodeToExistingColorStyle(
            this.node, 
            this.prevStyleName, 
            [...this.prevPaints]);

        this.node.updateNode();

        uiSaveNodes([this.nodeId]);
    }    
}