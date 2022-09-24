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
        this.newActiveNodeIds = [];
        this.oldActiveNodeIds = [];

        for (const nodeId of this.nodeIds)
            pushUnique(this.oldActiveNodeIds, getActiveNodesInTreeFromNodeId(nodeId).map(n => n.id));
        

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


        const updateNodes = [];


        for (const nodeId of this.nodeIds)
        {
            const node = nodeFromId(nodeId);


            const nodeInputs = [...node.inputs.filter(i => i.connected)];

            for (let i = nodeInputs.length-1; i >= 0; i--)
                updateNodes.push(...this.disconnect(nodeInputs[i], this.nodeIds));

                
            for (const output of node.outputs)
            {
                const connectedInputs = [...output.connectedInputs];
                removeFromArrayWhere(connectedInputs, i => i.node == node);

                // connected inputs need to be sorted by input index
                connectedInputs.sort((i1, i2) => 
                {
                    const node1 = i1.node;
                    const node2 = i2.node;
                        
                    const index1 = node1.inputs.indexOf(i1);
                    const index2 = node2.inputs.indexOf(i2);
                    
                    if (node1.id != node2.id) return node1.id - node2.id;
                    if (index1   != index2)   return index1   - index2;
                    return 0;
                });
 

                for (const input of connectedInputs)
                    updateNodes.push(...this.disconnect(input, this.nodeIds));
            }
        }

        
        uiDeleteNodes(this.nodeIds);

        uiSaveNodes(this.newActiveNodeIds);
       
        pushUpdate(updateNodes.filter(n => graph.nodes.includes(n)));
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
        

        let oldActiveNodeIds = [...this.oldActiveNodeIds];
        oldActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).isOrFollows(nodeFromId(x)) ? -1 : 1);

        
        for (const id of oldActiveNodeIds)
            uiMakeNodesActive(oldActiveNodeIds.map(id => nodeFromId(id)));
    

        uiSaveNodes([
            ...this.newActiveNodeIds,
            ...this.oldActiveNodeIds]);
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



    disconnect(input, ignoreNodeIds = [])
    {
        //console.log('disconnect');

        const output      = input.connectedOutput;
        const updateNodes = [input.node];        


        uiDisconnect(input);


        const activeLeft     = getActiveNodeLeftInTreeFromNode(output.node);
        const activeLeftOnly = getActiveNodeLeftOnlyInTreeFromNode(output.node);
        const activeRight    = getActiveNodeRightInTreeFromNode(input.node);


        if (  !activeLeftOnly
            && activeLeft != activeRight)
        {
            if (!ignoreNodeIds.includes(output.node.id))
            {
                uiMakeNodeActive(output.node);
                pushUnique(this.newActiveNodeIds, output.node.id);
            }

            updateNodes.push(output.node);
        }


        if (   !activeRight
            && !ignoreNodeIds.includes(input.node.id))
        {
            uiMakeNodeActive(input.node);
            pushUnique(this.newActiveNodeIds, input.node.id);
        }
        

        return updateNodes;
    }
}