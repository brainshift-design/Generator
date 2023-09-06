class Connection
{
    static nextId = 0;

    id;

    output;
    outputOrder; // in which connections FROM THIS OUTPUT were made
    
    input;

    list     = false;

    wire;
    
    backInit = false; // if true, on connection the value is possibly copied from the input to the output

    // proxy          = null;

    
    stripIdForCopy = false;



    constructor(output, input)
    {
        this.id          = Connection.nextId++;

        this.output      = output;
        this.outputOrder = -1;
                 
        this.input       = input;

        this.wire        = new Wire(this);
    }



    toJson(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        const json = formatConnJson(
            pos, 
            tab,
            (this.stripIdForCopy ? this.output.node.nodeId : this.output.node.id),
            this.output.node.getOutputId(this.output), //(this.output.param ? this.output.param.id : this.output.index),
            this.outputOrder,
            (this.stripIdForCopy ? this.input.node.nodeId : this.input.node.id),
            this.input.node.getInputId(this.input), //(this.input.param ? this.input.param.id : this.input.index),
            boolToString(arraysIntersect(this.output.types, LIST_TYPES))); // not supportsTypes() here, because that allows LIST in case of ANY_VALUE

        this.stripIdForCopy = false;

        return json;
    }



    toDataObject()
    {
        return {
            id:           this.id,
            outputNodeId: this.output.node.id,
            outputId:     this.output.node.getOutputId(this.output),
            outputOrder:  this.outputOrder,
            inputNodeId:  this.input.node.id,
            inputId:      this.input.node.getInputId(this.input),
            list:         this.list
        };
    }
}



function parseConnectionJsonAndConnect(_conn, pasteConnected)
{
    const outputNode  = nodeFromId(pageIdFromPath(_conn.outputNodeId) == NULL ? makeNodePath(nodeFromId(_conn.outputNodeId)) : _conn.outputNodeId);
    const outputId    = _conn.outputId;
    const outputOrder = parseInt(_conn.outputOrder);

    const inputNode   = nodeFromId(pageIdFromPath(_conn.inputNodeId) == NULL ? makeNodePath(nodeFromId(_conn.inputNodeId)) : _conn.inputNodeId);
    const inputId     = _conn.inputId;


    if (   !outputNode 
        || !outputNode.outputFromId(outputId)
        || !inputNode  
        || !inputNode.inputFromId(inputId))
    {
        // console.log('outputNode  =', outputNode );
        // console.log('outputId    =', outputId   );
        // console.log('outputOrder =', outputOrder);
        // console.log('inputNode   =', inputNode  );
        // console.log('inputNode.inputs =', [...inputNode.inputs]);
        // console.log('inputId     =', inputId    );
        
        uiError(
           'Cannot connect ' + connToString(_conn),
            {
                buttonText:   'Remove connection',
                buttonAction: 'removeConnection,' + getStorageConnKey(_conn)
            });

        return null;
    }
    else
    {
        const conn = uiVariableConnect(
            outputNode, outputId, //isDigit(outputId[0]) ? parseInt(outputId) : outputNode.outputFromId(outputId).id,
             inputNode, inputId, //isDigit( inputId[0]) ? parseInt( inputId) :  inputNode. inputFromId( inputId).id,
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