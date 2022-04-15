class DeleteNodesAction
extends Action
{
    nodeIds          = [];
    prevSelectedIds  = [];
    
    nodes            = [];
    nodePos          = [];

    connections      = []; // [{outputOpId, outputIndex, inputOpId, inputIndex}]

    newActiveOpIds   = [];
    oldActiveOpIds   = [];



    constructor(nodeIds)
    {
        super('delete ' + nodeIds.length + ' node' + (nodeIds.length == 1 ? '' : 's'));

        this.nodeIds         = [...nodeIds]; // clone the array
        this.nodes           = nodeIds.map(id => nodeFromId(id));
        this.prevSelectedIds = graphView.selectedNodes.map(n => n.id);

        for (const nodeId of nodeIds)
        {
            const activeIds = getActiveNodesInTreeFrom(nodeFromId(nodeId)).map(n => n.id);

            for (const activeId of activeIds)
            {
                if (!this.oldActiveOpIds.includes(activeId))
                    this.oldActiveOpIds.push(activeId);
            }
        }
    }



    addConnection(conn)
    {
        const outputIndex = conn.output.op.outputs.indexOf(conn.output);
        const  inputIndex = conn.input .op. inputs.indexOf(conn. input);

        if (!this.connections.find(c => 
                   c.outputOpId  == conn.output.op.id
                && c.outputIndex == outputIndex
                && c.inputOpId   == conn.input.op.id
                && c.inputIndex  == inputIndex))
            this.connections.push(getConnectionForArrayWithIds(conn));
    }



    do()
    {
        for (const nodeId of this.nodeIds)
        {
            const node = nodeFromId(nodeId);

            this.nodePos.push(point(
                node.div.offsetLeft, 
                node.div.offsetTop));

            for (const input of node.inputs.filter(i => i.isConnected))
                this.addConnection(input.connection);

            for (const output of node.outputs)
                for (const input of output.connectedInputs)
                    this.addConnection(input.connection);
        }


        for (const nodeId of this.nodeIds)
        {
            const node = nodeFromId(nodeId);


            const nodeInputs = [...node.inputs.filter(i => i.isConnected)];

            for (let i = nodeInputs.length-1; i >= 0; i--)
                this.disconnect(nodeInputs[i]);


            for (const output of node.outputs)
            {
                let connectedInputs = [...output.connectedInputs];

                // connected inputs need to be sorted by input index
                connectedInputs.sort((i1, i2) => 
                {
                    const op1 = i1.op;
                    const op2 = i2.op;
                        
                    const index1 = op1.inputs.indexOf(i1);
                    const index2 = op2.inputs.indexOf(i2);
                    
                    if (op1.id != op2.id) return op1.id - op2.id;
                    if (index1 != index2) return index1 - index2;
                    return 0;
                });

                for (const input of connectedInputs)
                    this.disconnect(input);
            }
        }


        console.log(this.newActiveOpIds);

        uiDeleteNodes(this.nodeIds, this.id);

        for (const nodeId of this.nodeIds)
            uiClearPageData(activeTag + ' ' + nodeId)
    }



    undo()
    {
        this.undeleteNodes();
        this.undeleteConnections();

        this.nodePos     = [];
        this.connections = [];

        graphView.selectByIds(this.prevSelectedIds);

        for (const id of this.newActiveOpIds)
            uiMakeNodePassive(nodeFromId(id));
        
        this.newActiveOpIds = [];

        
        let oldActiveOpIds = [...this.oldActiveOpIds];
        oldActiveOpIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).follows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldActiveOpIds)
            uiMakeNodeActive(nodeFromId(id));
    }



    undeleteNodes()
    {
        //log('this.nodes', this.nodes);

        graph.addNodes(this.nodes);
        graphView.selected = this.nodes;
        graphView.putNodeOnTop(lastOf(this.nodes));
    
        for (let i = 0; i < this.nodes.length; i++)
        {
            setNodePosition(
                this.nodes[i], 
                this.nodePos[i].x, 
                this.nodePos[i].y);
        }

        for (let i = 0; i < this.nodes.length; i++)
            this.nodes[i].id = this.nodeIds[i];

        
        for (const activeId of this.oldActiveOpIds)
            uiMakeNodeActive(nodeFromId(activeId));


        uiSaveNodes(this.nodeIds);
    }



    undeleteConnections()
    {
        const connections    = [...this.connections];
        const varConnections = [];
       
        
        // connections going into variable inputs must be treated separately
        for (let i = connections.length-1; i >= 0; i--)
        {
            if (nodeFromId(connections[i].inputOpId)._variableInputs)
            {
                varConnections.push(connections[i]);
                removeAt(connections, i);
            }
        }

        
        varConnections.sort((c1, c2) =>
        {
            if (c1.inputOpId  != c2.inputOpId ) return c1.inputOpId  - c2.inputOpId;
            if (c1.inputIndex != c2.inputIndex) return c1.inputIndex - c2.inputIndex;
            return 0;
        });
        
        
        this.connect(connections);
        this.connect(varConnections);
    }



    connect(connections)
    {
        for (const conn of connections)
        {
            const outputOp = nodeFromId(conn.outputOpId);
            const inputOp  = nodeFromId(conn. inputOpId);

            uiVariableConnect(outputOp, conn.outputIndex, inputOp, conn.inputIndex);
        }
    }



    disconnect(input)
    {
        const output = input.connectedOutput;
        
        uiDisconnect(input);


        const outputOp = output.op;
        const  inputOp =  input.op;


        if (getActiveNodesInTreeFrom(inputOp))
        {
            uiMakeNodeActive(inputOp);

            if (!this.newActiveOpIds.includes(inputOp.id))
                this.newActiveOpIds.push(inputOp.id);

            inputOp.pushUpdate();
            //graphView.updateNodeTransform(input.op);
        }


        if (!getActiveNodeInTreeFrom(outputOp))
        {
            uiMakeNodeActive(outputOp);

            if (!this.newActiveOpIds.includes(outputOp.id))
                this.newActiveOpIds.push(outputOp.id);

            outputOp.pushUpdate();
            //graphView.updateNodeTransform(output.op);
        }
    }
}