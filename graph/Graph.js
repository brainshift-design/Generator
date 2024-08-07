class Graph
{
    parentNodeGroup = null;


    pages           = [];

    pageIndex       = -1;
    overIndex       = -1;
    
    
    
    nodes           = [];
    deferNodeIds    = [];
    
    connections     = [];
    
    
    get currentPage() { return this.pages.length > 0 ? this.pages[this.pageIndex] : null; }
    get pageNodes  () { return this.nodes.filter(n => n.pageId == this.currentPage.id);   }



    clear()
    {
        this.deleteNodes(this.nodes.map(n => n.id));
        this.connections = [];
    }



    addNodes(nodes, placeNode = true)
    {
        for (const node of nodes)
            this.addNode(node, placeNode);
    }



    addNode(node, placeNode = true, updateLabel = true, fromSearch = false)
    {
        node.graph = this;

        node.id = getNewNumberId(
            node.id,
            id => this.nodes.filter(n => n.id == id).length);

        this.nodes.push(node);
        graphView.div.appendChild(node.div);
        
        if (placeNode)
            graphView.placeNewNode(node, fromSearch);

        node.div.style.zIndex = 1000000 + graph.nodes.length-1; // this is so that 1000000 panels can be sorted underneath, that seems high enough :)
        graphView.putNodeOnTop(node);


        graphView.updateScrollWithBounds();
    }
    


    deleteNodes(nodeIds)
    {
        for (const id of nodeIds)
        {
            const node = this.nodes.find(n => n.id == id);

            for (let i = node.inputs.length-1; i >= 0; i--) // backwards for the sake of variable inputs
            {
                const input = node.inputs[i];
                if (!input.connected) continue;

                uiMakeNodeActive(input.connectedOutput.node);
                this.disconnect(input, true);
            }
            
            for (let i = node.outputs.length-1; i >= 0; i--)
            {
                const output = node.outputs[i];
                
                for (const connInput of output.connectedInputs)
                    this.disconnect(connInput, true);
            }
        }


        for (const id of nodeIds)
        {
            const node = this.nodes.find(n => n.id == id);
            if (!node) continue;

            node.selected = false;
            node.graph    = null;

            node.div.style.display = 'none';

            removeFromArray(this.nodes, node);  
            graphView.div.removeChild(node.div);
        }


        graphView.updateScrollWithBounds();
    }



    connect(output, input, inputId = '', outputOrder = -1, createTime = -1)
    {
        //console.log('graph.connect()');
        
        if (input.connectedOutput == output)
            return input.connection;
            

        if (input.connectedOutput)
            this.disconnect(input);


        if (    input.node.variableInputs
            && !input.param
            &&  inputId != '')
        {
            input = input.node.headerInputs.at(-1);
            
            const inputIndex =
                inputId[0] == 'h'
                ? parseInt(inputId.substring(1))
                : input.index;

            // move new input back to correct index
            moveInArray(
                input.node.inputs, 
                input.node.headerInputs.length-1, 
                inputIndex);

            input.node.inputControls.insertBefore(
                lastOf(input.node.inputControls.childNodes), 
                input.node.inputControls.childNodes[inputIndex]);
        }


        const conn = new Connection(output, input);

        if (createTime > -1)
            conn.createTime = createTime;


        conn.outputOrder = 
            outputOrder > -1
            ?  outputOrder
            : !isEmpty(output.connectedInputs)
            ? Math.max(...output.connectedInputs.map(i => i.connection.outputOrder)) + 1
            : 0;

        output.connection = conn;

        if (outputOrder > -1) output.connectedInputs.splice(outputOrder, 0, input);
        else                  output.connectedInputs.push(input);
        
        input.connection      = conn;
        input.connectedOutput = output;

        
        graphView.addConnWires(conn);

        this.connections.push(conn);

        
        output.updateControl();


        return conn;
    }



    disconnect(input)
    {
        // console.log('disconnect');
        // console.trace();

        const output = input.connectedOutput;
        if (!output) return false;


        graphView.removeConnWires(input.connection);

        removeFromArray(this.connections, input.connection);
        removeFromArray(output.connectedInputs, input);


        input.connectedOutput = null;
        input.connection      = null;


        if (input.param)
            input.param.resetControls();

        
        return true;
    }
}
