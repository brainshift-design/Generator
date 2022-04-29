class DeleteNodesAction
extends Action
{
    nodeIds          = [];
    prevSelectedIds  = [];
    
    nodes            = [];
    nodePos          = [];

    connections      = []; // [{outputNodeId, outputIndex, inputNodeId, inputIndex}]

    newActiveNodeIds = [];
    oldActiveNodeIds = [];



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
                if (!this.oldActiveNodeIds.includes(activeId))
                    this.oldActiveNodeIds.push(activeId);
            }
        }
    }



    addConnection(conn)
    {
        if (!this.connections.find(c => 
                   c.outputNodeId == conn.output.node.id
                && c.outputIndex  == conn.output.index
                && c. inputNodeId == conn. input.node.id
                && c. inputIndex  == conn. input.index))
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

            for (const input of node.inputs.filter(i => i.connected))
                this.addConnection(input.connection);

            for (const output of node.outputs)
                for (const input of output.connectedInputs)
                    this.addConnection(input.connection);
        }


        for (const nodeId of this.nodeIds)
        {
            const node = nodeFromId(nodeId);


            const nodeInputs = [...node.inputs.filter(i => i.connected)];

            for (let i = nodeInputs.length-1; i >= 0; i--)
                this.disconnect(nodeInputs[i]);


            for (const output of node.outputs)
            {
                let connectedInputs = [...output.connectedInputs];

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
                    this.disconnect(input);
            }
        }


        uiDeleteNodes(this.nodeIds, this.id);
    }



    undo()
    {
        this.undeleteNodes();
        this.undeleteConnections();

        this.nodePos     = [];
        this.connections = [];

        graphView.selectByIds(this.prevSelectedIds);

        for (const id of this.newActiveNodeIds)
            uiMakeNodePassive(nodeFromId(id));
        
        this.newActiveNodeIds = [];

        
        let oldActiveNodeIds = [...this.oldActiveNodeIds];
        oldActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).follows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));
    }



    undeleteNodes()
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

        
        for (const activeId of this.oldActiveNodeIds)
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
            if (nodeFromId(connections[i].inputNodeId)._variableInputs)
            {
                varConnections.push(connections[i]);
                removeAt(connections, i);
            }
        }

        
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
        console.log('disconnect');
        const output = input.connectedOutput;
        
        uiDisconnect(input);


        const outputNode = output.node;
        const  inputNode =  input.node;


        if (getActiveNodesInTreeFrom(inputNode))
        {
            uiMakeNodeActive(inputNode);

            if (!this.newActiveNodeIds.includes(inputNode.id))
                this.newActiveNodeIds.push(inputNode.id);

            inputNode.pushUpdate();
            //graphView.updateNodeTransform(input.node);
        }


        if (!getActiveNodeInTreeFrom(outputNode))
        {
            uiMakeNodeActive(outputNode);

            if (!this.newActiveNodeIds.includes(outputNode.id))
                this.newActiveNodeIds.push(outputNode.id);

            outputNode.pushUpdate();
            //graphView.updateNodeTransform(output.node);
        }
    }
}