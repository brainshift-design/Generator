class DeleteNodesAction
extends Action
{
    nodeIds          = [];
    prevSelectedIds  = [];
    
    nodes            = [];
    nodePos          = [];

    oldConnections   = []; // [{outputNodeId, outputIndex, inputNodeId, inputIndex}]

    newActiveNodeIds = [];
    oldActiveNodeIds = [];



    constructor(nodeIds)
    {
        super('DELETE ' + nodeIds.length + ' ' + countToString(nodeIds, 'node'));

        this.nodeIds         = [...nodeIds]; // clone the array
        this.nodes           = nodeIds.map(id => nodeFromId(id));
        this.prevSelectedIds = graphView.selectedNodes.map(n => n.id);
    }



    addConnection(conn)
    {
        if (!this.oldConnections.find(c => 
                   c.outputNodeId == conn.output.node.id
                && c.outputIndex  == conn.output.index
                && c. inputNodeId == conn. input.node.id
                && c. inputIndex  == conn. input.index))
            this.oldConnections.push(getConnectionForArrayWithIds(conn));
    }



    do()
    {
        this.oldActiveNodeIds = [];

        for (const nodeId of this.nodeIds)
        {
            getActiveNodesInTreeFromNodeId(nodeId)
                .forEach(node =>
                {
                    if (!this.oldActiveNodeIds.includes(node.id))
                        this.oldActiveNodeIds.push(node.id);
                });
        }
        

        for (const nodeId of this.nodeIds)
        {
            const node = nodeFromId(nodeId);

            this.nodePos.push(point(
                node.div.offsetLeft, 
                node.div.offsetTop));

            for (const input of node.inputs.filter(i => i.connected))
                this.addConnection(input.connection);

            for (const output of node.outputs)
                for (const input of output.connectedInputs)
                    this.addConnection(input.connection);
        }


        //const inputNodeIds = [];
        
        for (const nodeId of this.nodeIds)
        {
            const node = nodeFromId(nodeId);


            const nodeInputs = [...node.inputs.filter(i => i.connected)];

            for (let i = nodeInputs.length-1; i >= 0; i--)
                this.disconnect(nodeInputs[i]);


            for (const output of node.outputs)
            {
                const connectedInputs = [...output.connectedInputs];

                // connected inputs need to be sorted by input index
                connectedInputs.sort((i1, i2) => 
                {
                    const node1 = i1.node;
                    const node2 = i2.node;
                        
                    const index1 = node1.inputs.indexOf(i1);
                    const index2 = node2.inputs.indexOf(i2);
                    
                    if (node1.id != node2.id) return node1.id - node2.id;
                    if (index1 != index2) return index1 - index2;
                    return 0;
                });

                for (const input of connectedInputs)
                {
                    this.disconnect(input);

                    //if (input.node.variableInputs)
                    //    inputNodeIds.push(input.node.id);
                }
            }
        }

        uiDeleteNodes(this.nodeIds, this.id);
        //uiRemoveSavedNodesAndConns(inputNodeIds);
    }



    undo()
    {
        this.restoreNodes();
        this.restoreConns();

        this.nodePos     = [];
        this.oldConnections = [];

        graphView.selectByIds(this.prevSelectedIds);

        for (const id of this.newActiveNodeIds)
            uiMakeNodePassive(nodeFromId(id));
        
        this.newActiveNodeIds = [];

        
        let oldActiveNodeIds = [...this.oldActiveNodeIds];
        oldActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).follows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));
    

        uiSaveNodes(this.nodeIds);
    }



    restoreNodes()
    {
        //console.log('this.nodes', this.nodes);

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
    }



    restoreConns()
    {
        const connections    = this.oldConnections.filter(c => !nodeFromId(c.inputNodeId).variableInputs);
        const varConnections = this.oldConnections.filter(c =>  nodeFromId(c.inputNodeId).variableInputs);
        
        varConnections.sort((c1, c2) =>
        {
            if (c1.inputNodeId != c2.inputNodeId) return c1.inputNodeId - c2.inputNodeId;
            if (c1.inputIndex  != c2.inputIndex ) return c1.inputIndex  - c2.inputIndex;
            return 0;
        });
        
        this.connect(connections);
        this.connect(varConnections);
    }



    connect(connections)
    {
        for (const conn of connections)
        {
            const outputNode = nodeFromId(conn.outputNodeId);
            const  inputNode = nodeFromId(conn. inputNodeId);

            uiVariableConnect(outputNode, conn.outputIndex, inputNode, conn.inputIndex);
        }
    }



    disconnect(input)
    {
        //console.log('disconnect');
        const output = input.connectedOutput;
        

        uiDisconnect(input);


        if (getActiveNodesInTreeFromNode(input.node))
        {
            uiMakeNodeActive(input.node);

            if (!this.newActiveNodeIds.includes(input.node.id))
                this.newActiveNodeIds.push(input.node.id);

            pushUpdate([input.node]);
        }


        if (!getActiveNodeInTreeFromNode(output.node))
        {
            uiMakeNodeActive(output.node);

            if (!this.newActiveNodeIds.includes(output.node.id))
                this.newActiveNodeIds.push(output.node.id);

            pushUpdate([output.node]);
        }
    }
}