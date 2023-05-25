class Graph
{
    parentNodeGroup = null;


    pages           = [];

    pageIndex       = -1;
    overIndex       = -1;
    
    
    
    nodes           = [];
    deferNodeIds    = [];
    
    connections     = [];
    
    
    get currentPage() { return this.pages[this.pageIndex]; }
    get pageNodes  () { return this.nodes.filter(n => n.pageId == this.currentPage.id); }



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



    addNode(node, placeNode = true, updateLabel = true)
    {
        node.graph = this;

        node.id = getNewNumberId(
            this.nodes, 
            id => this.nodes.find(n => n.id == id), 
            node.id);

        this.nodes.push(node);
        graphView.div.appendChild(node.div);
        
        if (placeNode)
            graphView.placeNewNode(node);

        node.div.style.zIndex = graph.nodes.length-1;
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

            node.selected    = false;
            node.graph = null;

            node.div.style.display = 'none';

            removeFromArray(this.nodes, node);  
            graphView.div.removeChild(node.div);
        }


        graphView.updateScrollWithBounds();
    }



    connect(output, input, inputId = '', outputOrder = -1)
    {
        //console.log('graph.connect()');

        if (input.connectedOutput == output)
            return input.connection;//null;
            

        if (input.connectedOutput)
        {
            const output = input.connectedOutput;
            this.disconnect(input);
            output.updateControl();
        }


        if (    input.node.variableInputs
            && !input.param
            &&  inputId != '')
        {
            input = input.node.headerInputs.at(-1);
            
            const inputIndex = 
                   inputId != ''
                && isDigit(inputId[0])
                ? parseInt(inputId)
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
