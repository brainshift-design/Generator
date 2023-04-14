class ToggleParamHeaderAction
extends Action
{
    nodeId;
    get node() { return nodeFromId(this.nodeId) } 

    prevParamType;
    paramType;



    constructor(nodeId, paramType)
    {
        super(
            TOGGLE_PARAM_HEADER_ACTION,
            'TOGGLE PARAM HEADER ' + boolToString(paramType));
        
        this.affectsConnections = false;

        this.nodeId    = nodeId;
        this.paramType = paramType;
    }



    do(updateNodes)
    {
        this.prevParamType  = this.paramType;
        this.node.paramType = this.paramType;

        this.node.updateNode();

        uiSaveNodes([this.nodeId]);
    }



    undo(updateNodes)
    {
        this.node.paramType = this.prevParamType;

        this.node.updateNode();

        uiSaveNodes([this.nodeId]);
    }    
}