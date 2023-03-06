class Connection
{
    static nextId = 0;

    id;

    output;
    outputOrder; // in which connections FROM THIS OUTPUT were made
    
    parentGraph;

    input;

    wire;

    backInit = false; // if true, on connection the value is possibly copied from the input to the output



    constructor(output, input)
    {
        this.id          = Connection.nextId++;

        this.output      = output;
        this.outputOrder = -1;
                 
        this.input       = input;

        this.parentGraph = output ? output.node.parentGraph : input.node.parentGraph;
        
        this.wire        = new Wire(this);
    }



    toJson(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = TAB;

        return formatConnJson(
            pos, 
            tab,
            this.output.node.id,
            (this.output.param ? this.output.param.id : this.output.index),
            this.outputOrder,
            this.input.node.id,
            (this.input.param ? this.input.param.id : this.input.index),
            boolToString(this.output.supportsTypes(LIST_TYPES)));
    }



    toDataObject()
    {
        return {
            id:           this.id,
            outputNodeId: this.output.node.id,
            outputId:     this.output.id,
            outputOrder:  this.outputOrder,
            inputNodeId:  this.input.node.id,
            inputId:      this.input.id
        };
    }
}



function parseConnectionJsonAndConnect(graph, _conn, pasteConnected)
{
    const outputNode  = graph.nodeFromId(_conn.outputNodeId);
    const outputId    = _conn.outputId;
    const outputOrder = parseInt(_conn.outputOrder);

    const inputNode   = graph.nodeFromId(_conn.inputNodeId);
    const inputId     = _conn.inputId;


    if (   !outputNode 
        ||  isDigit(outputId[0]) && parseInt(outputId) >= outputNode.outputs.length
        || !isDigit(outputId[0]) && !outputNode.params.find(p => p.id == outputId && p.output)
        || !inputNode  
        ||  isDigit(inputId[0]) && parseInt(inputId) >= inputNode.inputs.length
        || !isDigit(inputId[0]) && !inputNode.params.find(p => p.id == inputId && p.input))
    {
        uiError('Cannot connect ' + connToString(_conn));
        return null;
    }
    else
    {
        const conn = uiVariableConnect(
            outputNode, isDigit(outputId[0]) ? parseInt(outputId) : outputNode.params.find(p => p.id == outputId).output.id,
             inputNode, isDigit( inputId[0]) ? parseInt( inputId) :  inputNode.params.find(p => p.id ==  inputId). input.id,
            pasteConnected ? -1 : outputOrder);

        _conn.outputOrder = conn.outputOrder;

        return conn;
    }
}



function connDataObject(output, input)
{
    return {
        connection:   input.connection,
        id:           -1,
        outputNodeId: output.node.id,
        outputId:     output.id,
        outputOrder:  input.connection.outputOrder,
        inputNodeId:  input.node.id,
        inputId:      input.id
    };
}



function formatConnJson(pos, tab, outputNodeId, outputId, outputOrder, inputNodeId, inputId, list)
{
    return pos
         + '{'
         +       NL + pos + tab + '"outputNodeId": "' + outputNodeId + '"'
         + ',' + NL + pos + tab + '"outputId": "'     + outputId     + '"'
         + ',' + NL + pos + tab + '"outputOrder": "'  + outputOrder  + '"'
         + ',' + NL + pos + tab + '"inputNodeId": "'  + inputNodeId  + '"'
         + ',' + NL + pos + tab + '"inputId": "'      + inputId      + '"'
         + ',' + NL + pos + tab + '"list": "'         + list         + '"'
         +       NL + pos
         + '}';
}