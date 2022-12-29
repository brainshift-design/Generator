class Graph
{
    nodes        = [];
    deferNodeIds = [];
    
    mutex        = false;

    connections  = [];



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
        graphView.appendChild(node.div);
        
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
            
            node.selected = false;
            node.graph    = null;

            removeFromArray(this.nodes, node);  
            graphView.removeChild(node.div);
        }

        graphView.updateScrollWithBounds();
    }



    connect(output, input, inputId = '', outputOrder = -1)
    {
        //console.log('graph.connect()');

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
            input = lastOf(input.node.headerInputs);
            
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
            ? outputOrder
            : output.connectedInputs.length > 0
            ? Math.max(...output.connectedInputs.map(i => i.connection.outputOrder)) + 1
            : 0;

        output.connection = conn;

        if (outputOrder > -1) output.connectedInputs.splice(outputOrder, 0, input);
        else            output.connectedInputs.push(input);
        
        input.connection      = conn;
        input.connectedOutput = output;

        
        graphView.addConnWires(conn);

        this.connections.push(conn);

        
        output.updateControl();


        return conn;
    }



    disconnect(input)
    {
        var output = input.connectedOutput;
        if (!output) return false;


        //const outputOrder = input.connection.outputOrder;


        graphView.removeConnWires(input.connection);

        removeFromArray(this.connections, input.connection);
        removeFromArray(output.connectedInputs, input);


        // const afterConns = output.connectedInputs
        //     .map   (i => i.connection)
        //     .filter(c => c.outputOrder > outputOrder);

        // afterConns.forEach(c => c.outputOrder--);
        // uiSaveConnections(afterConns);


        input .connectedOutput = null;
        input .connection      = null;
        output.connection      = null;


        if (input.param)
            input.param.valueText = '';


        return true;
    }
}



function nodesToJson(nodes, encloseBraces = true, connOutputMustBeInNodes = true)
{
    const tab = TAB;
    
    let json = 
          (encloseBraces ? '{\n' : '')
          + tab + '"nodes":\n'
          + tab + '[';

    let first = true;
    for (let i = 0; i < nodes.length; i++)
    {
        if (!first) json += ','; first = false;
        json += NL + nodes[i].toJson(4);
    }

    json += NL + tab + ']';
    json += connectionsToJson(nodes, connOutputMustBeInNodes);
    json += (encloseBraces ? '\n}' :'');

    return json;
}



function connectionsToJson(nodes, connOutputMustBeInNodes)
{
    const connections = [];


    for (let i = 0; i < nodes.length; i++)
    {
        let node = nodes[i];

        // if (node.variableInputs)
        //     continue;

        for (let j = 0; j < node.inputs.length; j++)
        {
            if (   !node.inputs[j].connected
                ||     connOutputMustBeInNodes
                   && !nodes.includes(node.inputs[j].connectedOutput.node))
                continue;

            connections.push(node.inputs[j].connection);
        }
    }
    

    if (isEmpty(connections))
        return '';


    const tab = TAB;

    let json = 
          ',\n'
        + tab + '"connections":\n'
        + tab + '[';
    
    for (let i = 0; i < connections.length; i++)
    {
        if (i > 0) json += ',';
        json += NL + connections[i].toJson(4);
    }

    json += NL + tab + ']';

    return json;
}



function createNode(nodeType, creatingButton = null, createdNodeId = -1, options = {})
{
    let node;
 
    switch (nodeType)
    {
        case LIST:                node = new OpList();             break;
        case ITEMS:               node = new OpItems();            break;
        case SELECT:              node = new OpSelect();           break;
        case START:               node = new OpStart();            break;
        case REPEAT:              node = new OpRepeat();           break;
        case CACHE:               node = new OpCache();            break;
 
        case NUMBER:              node = new OpNumber();           break;
        case NUMBER_ROUND:        node = new OpRound();            break;
        case NUMBER_LIMITS:       node = new OpLimits();           break;
        case NUMBER_RANDOM:       node = new OpRandom();           break;
        case NUMBER_SERIES:       node = new OpSeries();           break;
        case NUMBER_INTERPOLATE:  node = new OpInterpolate();      break;
        case NUMBER_BOOLEAN:      node = new OpBoolean();          break;
        case NUMBER_CONDITION:    node = new OpCondition();        break;
 
        case NUMBER_MATH:         node = new OpMath();             break;
        case NUMBER_ADD:          node = new OpAdd();              break;
        case NUMBER_SUBTRACT:     node = new OpSubtract();         break;
        case NUMBER_MULTIPLY:     node = new OpMultiply();         break;
        case NUMBER_DIVIDE:       node = new OpDivide();           break;
        case NUMBER_MODULO:       node = new OpModulo();           break;
        case NUMBER_EXPONENT:     node = new OpExponent();         break;
        
        case NUMBER_VAR_MATH:     node = new OpVarMath();          break;
        case NUMBER_VAR_ADD:      node = new OpVarAdd();           break;
        case NUMBER_VAR_SUBTRACT: node = new OpVarSubtract();      break;
        case NUMBER_VAR_MULTIPLY: node = new OpVarMultiply();      break;
        case NUMBER_VAR_DIVIDE:   node = new OpVarDivide();        break;
        case NUMBER_VAR_MODULO:   node = new OpVarModulo();        break;
        case NUMBER_VAR_EXPONENT: node = new OpVarExponent();      break;
        
        case COLOR:               node = new OpColor(options);     break;
        case COLOR_CORRECT:       node = new OpColorCorrect();     break;
        case COLOR_CONTRAST:      node = new OpColorContrast();    break;
        case COLORBLIND:          node = new OpColorBlind();       break;
        case COLOR_INTERPOLATE:   node = new OpColorInterpolate(); break;
        
        case COLOR_STOP:          node = new OpColorStop();        break;
        case GRADIENT:            node = new OpGradient();         break;
 
        case FILL:                node = new OpFill();             break;
        case STROKE:              node = new OpStroke();           break;
        case STYLE:               node = new OpStyle();            break;
 
        case RECTANGLE:           node = new OpRectangle();        break;
        case LINE:                node = new OpLine();             break;
        case ELLIPSE:             node = new OpEllipse();          break;
        case POLYGON:             node = new OpPolygon();          break;
        case STAR:                node = new OpStar();             break;
 
        case COMMENT:             node = new OpComment();          break;
 
        default:                  console.assert(false, 'Graph.js/createNode() cannot create type ' + nodeType);
    }
    
    node._creatingButton = creatingButton;

    return node;
}



function idFromNode(node)
{
    return node ? node.id : '';
}



function nodeFromId(id)
{
    return graph.nodes.find(n => n.id == id);
}



function nodesFromIds(ids)
{
    return ids.map(id => nodeFromId(id));
}