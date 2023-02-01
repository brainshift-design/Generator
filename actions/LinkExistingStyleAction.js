class LinkExistingStyleAction
extends Action
{
    nodeId;
    get node() { return nodeFromId(this.nodeId) } 

    styleName;

    stylePaints = [];



    constructor(nodeId, styleName, stylePaints)
    {
        super('LINK STYLE \'' + nodeId + ' <-- ' + styleName + ')');
        
        this.affectsConnections = false;

        this.nodeId      = nodeId;
        this.styleName   = styleName;
        this.stylePaints = [...stylePaints];
    }



    do(updateNodes)
    {
        this.node.name = this.styleName;

        if (this.stylePaints.length > 0)
        {
            const c = this.stylePaints[0];

            this.node.paramValue.setValue(ColorValue.fromRgb([
                Math.round(c[0] * 0xff),
                Math.round(c[1] * 0xff),
                Math.round(c[2] * 0xff)]));
        }

        pushUnique(updateNodes, this.node);

        uiSaveNodes([this.nodeId]);
    }



    undo(updateNodes)
    {

        this.node.updateNode();

        uiSaveNodes([this.nodeId]);
    }    
}