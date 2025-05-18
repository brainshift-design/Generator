class SetMultipleValuesAction
extends Action
{
    nodeIds;
    paramIds;

    setValues;



    oldValues;
    newValues;



    constructor(params, values, setValues = false)
    {
        super(
            SET_MULTIPLE_VALUES_ACTION,
            'SET MULTIPLE VALUES');

        this.nodeIds    = params.map(p => p.node.nodeId);
        this.paramIds   = params.map(p => p.id);

        this.oldValues  = params.map(p => p.oldValue);
        this.newValues  = values;

        this.selfUpdate = true;
        this.setValues  = setValues;
    }



    do(updateNodes)
    {
        if (this.setValues)
        {
            for (let i = 0; i < this.nodeIds.length; i++)
            {
                const node = nodeFromId(this.nodeIds[i]);
                
                nodeFromId(this.nodeIds[i])
                    .paramFromId(this.paramIds[i])
                    .setValue(this.newValues[i], false, true);
            }
        }

        pushUpdate(this, this.nodeIds.map(id => nodeFromId(id)));
    }



    undo(updateNodes)
    {
        for (let i = 0; i < this.nodeIds.length; i++)
        {
            nodeFromId(this.nodeIds[i])
                .paramFromId(this.paramIds[i])
                .setValue(this.oldValues[i], false, true);
        }
        
        pushUpdate(this, this.nodeIds.map(id => nodeFromId(id)));
    }



    redo(updateNodes)
    {
        for (let i = 0; i < this.nodeIds.length; i++)
        {
              nodeFromId(this.nodeIds[i])
            .paramFromId(this.paramIds[i])
                .setValue(this.newValues[i], false, true);
        }

        pushUpdate(this, this.nodeIds.map(id => nodeFromId(id)));
    }
}