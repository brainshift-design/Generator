class Graph
{
    view             = null;

    parentNodeGroup = null;


    nodes            = [];
    deferNodeIds     = [];
    

    connections      = [];



    clear()
    {
        this.deleteNodes(this.nodes.map(n => n.id));
        this.connections = [];
    }



    getNewNodeId(curId, id)
    {
        if (!this.nodes.find(n => n.id == id))
            return id;
        

        let numLength = this.getNumLength(id);

        if (numLength > 0)
        {
            const len = id.length - numLength;
            let   num = parseInt(id.substring(len));

            let newId = '';
            while (newId == '' || this.nodes.find(n => n.id == newId))
                newId = id.substring(0, len) + (++num);

            return newId;
        }

        else if (numLength == 0)
        {
            let num   = 2;
            let newId = id + num;

            while (this.nodes.find(n => 
                   n.id != curId 
                && n.id == newId))
                newId = id + (++num);

            return newId;
        }

        else
            return id;
    }
    
    
    
    getNumLength(name)
    {
        let numLength = 0;

        for (let i = name.length - 1; i >= 0; i--)
        {
            if (isDigit(name[i])) numLength++;
            else break;
        }

        return numLength;
    }
    
    

    addNodes(nodes, placeNode = true)
    {
        for (const node of nodes)
            this.addNode(node, placeNode);
    }



    addNode(node, placeNode = true, updateLabel = true)
    {
        node.graph = this;

        node.id = this.getNewNodeId(node.id, node.id);
        
        this.nodes.push(node);
        this.view.div.appendChild(node.div);
        
        if (placeNode)
            this.view.placeNewNode(node);

        node.div.style.zIndex = this.view.graph.nodes.length-1;
        this.view.putNodeOnTop(node);


        this.view.updateScrollWithBounds();
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
            this.view.div.removeChild(node.div);
        }


        this.view.updateScrollWithBounds();
    }



    connect(output, input, inputId = '', outputOrder = -1)
    {
        //console.log('this.view.graph.connect()');

        if (input.connectedOutput == output)
            return null;
            

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

        
        this.view.addConnWires(conn);

        this.connections.push(conn);

        
        output.updateControl();


        return conn;
    }



    disconnect(input)
    {
        const output = input.connectedOutput;
        if (!output) return false;


        this.view.removeConnWires(input.connection);

        removeFromArray(this.connections, input.connection);
        removeFromArray(output.connectedInputs, input);


        input.connectedOutput = null;
        input.connection      = null;


        if (input.param)
            input.param.resetControls();


        return true;
    }
}
