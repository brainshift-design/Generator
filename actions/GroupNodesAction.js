class GroupNodesAction
extends Action
{
    group;
    groupNode = null;

    nodes;



    constructor(nodes)
    {
        super(GROUP_NODES_ACTION, 'GROUP NODES');

        this.nodes = [...nodes];
    }



    do(updateNodes)
    {
        // get node bounds
        let bounds = graphView.getNodeArrayBounds(this.nodes);


        // create group page
        this.group = new GraphPage('group', 'group');
        graph.currentPage.groups.push(this.group);
        
        
        // delete old nodes and connections
        uiRemoveSavedNodesAndConns(this.nodes.map(n => n.id));

        
        // move selected nodes to group page
        this.nodes.forEach(n => n.group = this.group);
        this.nodes.forEach(n => n.id = makeNodePath(n));


        // create group node
        this.groupNode = createNode(GROUP_NODE);

        graph.addNode(this.groupNode);
        

        // in group page create param nodes for all in and out connections
        GroupNodesAction_createInputNodes(this);
        GroupNodesAction_createOutputNodes(this);


        // move group node to center of bounds
        this.groupNode.setPosition(
            bounds.x + bounds.width /2 - defNodeWidth,
            bounds.y + bounds.height/2 - 100); // TODO: change this 100 to the group node's actual height


        // save new nodes and connections
        uiSaveNodes([this.groupNode.id]);
        uiSaveNodes(this.nodes.map(n => n.id));
        uiSaveConnections(getConnsFromNodes(this.nodes));


        this.group.nodes.forEach(n => n.div.style.display = 'none');
        this.groupNode.div.style.display = 'block';

        
        uiMakeNodeActive(this.groupNode);
        pushUnique(updateNodes, this.groupNode);
    }



    undo(updateNodes)
    {

    }
}



function GroupNodesAction_createInputNodes(action)
{
    // get all outside inputs

    const inConns = [];

    for (const node of action.nodes)
        for (const input of node.connectedInputs)
            if (!action.nodes.includes(input.connectedOutput.node))
                pushUnique(inConns, input.connection);


    // insert param node into connection

    for (const conn of inConns)
    {
        const output = conn.output;
        const input  = conn.input;

        
        // unsave connection
        uiDeleteSavedConn(conn);

        // disconnect
        uiDisconnect(input);


        // create param node 
        // set it to the left of the input node
        const paramNode = createNode(GROUP_PARAM);
        paramNode.group = action.group;
        graph.addNode(paramNode);

        paramNode.setPosition(
            input.node.div.offsetX - defNodeWidth - 100,
            input.node.div.offsetY);


        // reconnect through param nodes
        const connOut = uiConnect(output, paramNode.inputs[0]);
        const connIn  = uiConnect(paramNode.outputs[0], input);

        // save new connections
        uiSaveConn(connOut);
        uiSaveConn(connIn);
    }
}



function GroupNodesAction_createOutputNodes(action)
{
    // get all outside outputs

    const outConns = [];

    for (const node of action.nodes)
        for (const output of node.connectedOutputs)
            for (const input of output.connectedInputs)
                if (!action.nodes.includes(input.node))
                    pushUnique(outConns, input.connection);


    // insert param node into connection

    for (const conn of outConns)
    {
        const output = conn.output;
        const input  = conn.input;

        
        // unsave connection
        uiDeleteSavedConn(conn);

        // disconnect
        uiDisconnect(input);


        // create param node 
        // set it to the left of the input node
        const paramNode = createNode(GROUP_PARAM);
        paramNode.group = action.group;
        graph.addNode(paramNode);

        paramNode.setPosition(
            input.node.div.offsetX + defNodeWidth + 100,
            input.node.div.offsetY);


        // reconnect through param nodes
        const connIn  = uiConnect(output, paramNode.inputs[0]);
        const connOut = uiConnect(paramNode.outputs[0], input);

        // save new connections
        uiSaveConn(connOut);
        uiSaveConn(connIn);
    }
}