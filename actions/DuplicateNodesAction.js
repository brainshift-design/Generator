class DuplicateNodesAction
extends Action
{
    copiedJson;
    pastedNodeIds = [];


    constructor(copiedJson)
    {
        const data = JSON.parse(copiedJson);

        super('DUPLICATE ' + data.nodes.length + ' ' + countToString(data.nodes, 'node'));

        this.copiedJson = copiedJson;
    }



    do()
    {
        this.pastedNodeIds = uiPasteNodes(this.copiedJson).map(n => n.id);

        uiSaveNodes(nodes.map(n => n.id));
    }



    undo()
    {
        uiDeleteNodes(this.pastedNodeIds);
        
        pasteOffset[0] -= pasteOffsetDelta[0];
        pasteOffset[1] -= pasteOffsetDelta[1];

        uiRemoveSavedNodesAndConns(this.pastedNodeIds);
    }
}