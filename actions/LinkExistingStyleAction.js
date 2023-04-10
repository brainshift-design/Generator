class LinkExistingStyleAction
extends Action
{
    nodeId;
    get node() { return graph.nodeFromId(this.nodeId) } 

    get  inputNode() { return this.node; } // dummy for ConnectAction_...
    get outputNode() { return this.node; } // dummy for ConnectAction_...

    get  input() { return this.node.paramValue. input; } // dummy for ConnectAction_...
    get output() { return this.node.paramValue.output; } // dummy for ConnectAction_...

    styleId;
    styleName;
    paints;

    prevStyleId;
    prevStyleName;
    prevPaints;

    outputValues = []; // in id,value pairs, to be restored on undo
    inputValues  = []; // in id,value pairs, to be restored on undo


    constructor(nodeId, styleId, styleName, paints)
    {
        super(
            LINK_STYLE_ACTION, 
            'LINK STYLE \'' + nodeId + ' ⟶ ' + styleName + ')');
        
        this.affectsConnections = false;

        this.nodeId    = nodeId;
        this.styleId   = styleId;
        this.styleName = styleName;

        this.paints    = [...paints];
    }



    do(updateNodes)
    {
        this.prevStyleId   = this.node.linkedStyleId;
        this.prevStyleName = this.node.linkedStyleName;
        this.prevPaints    = [this.node.paramValue.value.toRgba()];
        
        connectAction_saveOutputValues(this);
        connectAction_saveInputValues(this);

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
        connectAction_restoreInputValues(this);
        connectAction_restoreOutputValues(this);

        uiLinkNodeToExistingColorStyle(
            this.node,
            this.prevStyleId,
            this.prevStyleName,
            [...this.prevPaints]);

        this.node.updateNode();

        uiSaveNodes([this.nodeId]);

        if (this.node.paramValue.input.connected)
            uiTriggerUndo();
    }    
}