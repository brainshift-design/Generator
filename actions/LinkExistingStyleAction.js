class LinkExistingStyleAction
extends Action
{
    nodeId;
    get node() { return nodeFromId(this.nodeId) } 

    styleId;
    styleName;
    paints;

    prevStyleId;
    prevStyleName;
    prevPaints;



    constructor(nodeId, styleId, styleName, paints)
    {
        super('LINK STYLE \'' + nodeId + ' ⟶ ' + styleName + ')');
        
        this.affectsConnections = false;

        this.nodeId    = nodeId;
        this.styleId   = styleId;
        this.styleName = styleName;

        this.paints = [...paints];
    }



    do(updateNodes)
    {
        this.prevStyleId   = this.node.linkedStyleId;
        this.prevStyleName = this.node.linkedStyleName;
        this.prevPaints    = [this.node.paramValue.value.toRgb()];
        
        uiLinkNodeToExistingColorStyle(
            this.node,
            this.styleId,
            this.styleName,
            [...this.paints]);

        pushUnique(updateNodes, this.node);

        uiSaveNodes([this.nodeId]);
    }



    undo(updateNodes)
    {
        uiLinkNodeToExistingColorStyle(
            this.node,
            this.prevStyleId,
            this.prevStyleName,
            [...this.prevPaints]);

        this.node.updateNode();

        uiSaveNodes([this.nodeId]);
    }    
}