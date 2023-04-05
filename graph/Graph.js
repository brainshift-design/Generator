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



function nodesToJson(nodes, encloseBraces = true, connOutputMustBeInNodes = true)
{
    const tab = HTAB;
    
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


    const tab = HTAB;

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
        case LIST:                    node = new OpList();              break;
        case ITEMS:                   node = new OpItems();             break;
        case SELECT:                  node = new OpSelect();            break;
        case IF_ELSE:                 node = new OpIfElse();            break;
        case START:                   node = new OpStart();             break;
        case REPEAT:                  node = new OpRepeat();            break;
        case CACHE:                   node = new OpCache();             break;
        case COPY:                    node = new OpCopy();              break;
      
        case NUMBER:                  node = new OpNumber();            break;
        case NUMBER_ABSOLUTE:         node = new OpAbsolute();          break;
        case NUMBER_ROUND:            node = new OpRound();             break;
        case NUMBER_LIMITS:           node = new OpLimits();            break;
        case NUMBER_RANDOM:           node = new OpRandom();            break;
        case NUMBER_SERIES:           node = new OpSeries();            break;
        case NUMBER_INTERPOLATE:      node = new OpInterpolate();       break;
        case NUMBER_TO_TEXT:          node = new OpNumberToText();      break;
             
        case NUMBER_MATH:             node = new OpMath();              break;
        case NUMBER_ADD:              node = new OpAdd();               break;
        case NUMBER_SUBTRACT:         node = new OpSubtract();          break;
        case NUMBER_MULTIPLY:         node = new OpMultiply();          break;
        case NUMBER_DIVIDE:           node = new OpDivide();            break;
        case NUMBER_MODULO:           node = new OpModulo();            break;
        case NUMBER_EXPONENT:         node = new OpExponent();          break;
             
        case NUMBER_BOOLEAN:          node = new OpBoolean();           break;
        case NUMBER_NOT:              node = new OpNot();               break;
        case NUMBER_AND:              node = new OpAnd();               break;
        case NUMBER_OR:               node = new OpOr();                break;
        case NUMBER_XOR:              node = new OpXor();               break;
         
        case NUMBER_CONDITION:        node = new OpCondition();         break;
        case NUMBER_EQUAL:            node = new OpEqual();             break;
        case NUMBER_NOT_EQUAL:        node = new OpNotEqual();          break;
        case NUMBER_LESS:             node = new OpLess();              break;
        case NUMBER_LESS_OR_EQUAL:    node = new OpLessOrEqual();       break;
        case NUMBER_GREATER:          node = new OpGreater();           break;
        case NUMBER_GREATER_OR_EQUAL: node = new OpGreaterOrEqual();    break;
         
        case TEXT:                    node = new OpText();              break;
        case TEXT_SUBSTRING:          node = new OpTextSubstring();     break;
        case TEXT_CHAR:               node = new OpTextCharacter();     break;
        case TEXT_REPLACE:            node = new OpTextReplace();       break;
        case TEXT_JOIN:               node = new OpTextJoin();          break;
        case TEXT_CSV:                node = new OpTextCSV();           break;
        case TEXT_FETCH:              node = new OpTextFetch();         break;
        
        case COLOR:                   node = new OpColor(options);      break;
        case VALID_COLOR:             node = new OpValidColor();        break;
        case CORRECT_COLOR:           node = new OpCorrectColor();      break;
        case COLOR_CONTRAST:          node = new OpColorContrast();     break;
        case COLORBLIND:              node = new OpColorBlind();        break;
        case COLOR_INTERPOLATE:       node = new OpColorInterpolate();  break;
        case COLOR_BLEND:             node = new OpColorBlend();        break;
             
        case COLOR_STOP:              node = new OpColorStop();         break;
        case GRADIENT:                node = new OpGradient();          break;
      
        case FILL:                    node = new OpFill();              break;
        case STROKE:                  node = new OpStroke();            break;

        case COLOR_STYLE:             node = new OpColorStyle(options); break;
     
        case RECTANGLE:               node = new OpRectangle();         break;
        case LINE:                    node = new OpLine();              break;
        case ELLIPSE:                 node = new OpEllipse();           break;
        case POLYGON:                 node = new OpPolygon();           break;
        case STAR:                    node = new OpStar();              break;
      
        case NODE_GROUP:              node = new OpNodeGroup();         break;
        case NODE_INPUTS:             node = new OpNodeInputs();        break;
        case NODE_OUTPUTS:            node = new OpNodeOutputs();       break;

        case COMMENT:                 node = new OpComment();           break;
     
        default:                      console.assert(false, 'Graph.js/createNode() cannot create type ' + nodeType);
    }
    
    node._creatingButton = creatingButton;

    return node;
}



function idFromNode(node)
{
    return node ? node.id : '';
}