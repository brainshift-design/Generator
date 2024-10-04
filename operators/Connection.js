class Connection
{
    createTime;
    updateTime;

    static nextId = 0;

    id;

    _output;
    outputOrder; // in which connections FROM THIS OUTPUT were made
    
    _input;

    _setOutFirst = null;


    get output() { return this._output; }
    get  input() { return this._input;  }

    set output(output) { this._output = output; if (this._setOutFirst === null && output) this._setOutFirst = true;  }
    set  input(input ) { this. _input = input;  if (this._setOutFirst === null &&  input) this._setOutFirst = false; }

    list     = false;

    wire;
    
    backInit = false; // if true, on connection the value is possibly copied from the input to the output

    // proxy          = null;

    
    stripIdForCopy = false;



    constructor(output, input)
    {
        this.createTime  = Date.now();

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
            this.createTime,
            (this.stripIdForCopy ? this.output.node.nodeId : this.output.node.id),
            this.output.node.getOutputId(this.output), //(this.output.param ? this.output.param.id : this.output.index),
            this.outputOrder,
            (this.stripIdForCopy ? this.input.node.nodeId : this.input.node.id),
            this.input.node.getInputId(this.input), //(this.input.param ? this.input.param.id : this.input.index),
            boolToString(arraysIntersect(this.output.types, LIST_TYPES))); // not supportsTypes() here, because that allows ITEMS in case of ANY_VALUE

        this.stripIdForCopy = false;

        return json;
    }



    toDataObject()
    {
        return {
            id:           this.id,
            created:      this.createTime,
            outputNodeId: this.output.node.id,
            outputId:     this.output.node.getOutputId(this.output),
            outputOrder:  this.outputOrder,
            inputNodeId:  this.input.node.id,
            inputId:      this.input.node.getInputId(this.input),
            list:         this.list
        };
    }
}



function parseConnectionJsonAndConnect(_conn, pasteConnected, _createTime = -1)
{
    const createTime  = _conn.created ? parseInt(_conn.created) : _createTime;

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
            outputNode, outputId,
             inputNode,  inputId,
            pasteConnected ? -1 : outputOrder,
            createTime);

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



function formatConnJson(pos, tab, createTime, outputNodeId, outputId, outputOrder, inputNodeId, inputId, list)
{
    return pos
         + '{'
         +       NL + pos + tab + '"created": "'      + createTime   + '"'
         + ',' + NL + pos + tab + '"outputNodeId": "' + outputNodeId + '"'
         + ',' + NL + pos + tab + '"outputId": "'     + outputId     + '"'
         + ',' + NL + pos + tab + '"outputOrder": "'  + outputOrder  + '"'
         + ',' + NL + pos + tab + '"inputNodeId": "'  + inputNodeId  + '"'
         + ',' + NL + pos + tab + '"inputId": "'      + inputId      + '"'
         + ',' + NL + pos + tab + '"list": "'         + list         + '"'
         +       NL + pos
         + '}';
}



function connDataObjectsEqual(connData1, connData2)
{
    return connData1.id           == connData2.id
        && connData1.outputNodeId == connData2.output.node.id
        && connData1.outputId     == connData2.output.node.getOutputId(this.output)
        && connData1.outputOrder  == connData2.outputOrder
        && connData1.inputNodeId  == connData2.input.node.id
        && connData1.inputId      == connData2.input.node.getInputId(this.input)
        && connData1.list         == connData2.list;
}