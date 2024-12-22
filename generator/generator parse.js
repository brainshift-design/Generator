class Parse
{
    request;
    requestId;
    
    pos; 
    so;

    settings = {};

    save;


    log  = '';
    
    nTab = 0;

    get tab() { return this.inParam ? ' ' : (NL + HTAB.repeat(Math.max(0, this.nTab))); }

    
    inParam = false;


    evalAccumulate = true;
    evalFeedback   = true;

    
    updateNodeId;
    updateParamId;

    viewportZoom;

    currentProgress = 0;
    totalProgress   = 0;

    scope           = []; // current parse stack
    parsedNodes     = []; // must be evaluated to create the value updates
  
  
    repeats         = [];
    solvers         = [];
  
    stopGenerate    = false;
  
  
    paramNodeIds    = [];
  
    updateParams    = [];
    updateValues    = [];
    updateObjects   = [];
    updateStyles    = [];


    terminalIds     = [];

    

    get next() { return this.request[this.pos]; }

    get afterNext() 
    { 
        return this.pos+1 < this.request.length 
             ? this.request[this.pos+1]
             : null;
    }



    constructor(request, firstPos, requestId, updateNodeId, updateParamId, viewportZoom, settings, save)
    {
        this.request       = request;
        this.requestId     = requestId;
          
        this.pos           = firstPos; 
        this.so            = 0;
        
        this.updateNodeId  = updateNodeId; 
        this.updateParamId = updateParamId;
   
        this.viewportZoom  = viewportZoom;

        this.settings      = settings;

        this.save          = save;
    }



    move()
    {
        //return this.request[this.pos++];

        const token = this.request[this.pos++];
        //console.log('token =', token);
        return token;
    }



    isLastRepeat() 
    {
        return isEmpty(this.repeats)
            ||    this.repeats.length == 1
               && this.repeats[0].currentIteration == this.repeats[0].total-1;
    }

}



function genParse(parse, inParam = true)
{
    //console.log('parse.next', parse.next);

    if (!inParam)
        parse.inParam = false;


    let node;
    
    
    const GClass = GNode.types[parse.next];
    
    if (GClass) 
        node = GClass.parseRequest(parse);
    
    else
        consoleError('unknown parse token \'' + parse.next + '\' @ ' + parse.pos);


    parse.inParam = false;


    if (node)
        return node;
    else
    {
        parse.so++;
        return null;
    }
}



function genParseNodeStart(parse)
{
    const type     = parse.move();
    const nodeId   = parse.move();
    const nodeName = decodeURIComponent(parse.move());

    
    parse.scope.push(nodeId);


    if (parse.parsedNodes.find(n => n.nodeId == nodeId))
        return [type, nodeId, {nodeName: nodeName}, true];


    const options = genParseNodeOptions(parse);

    options.nodeName = nodeName;


    return [type, nodeId, options, false];
}



function genParseNodeEnd(parse, node = null)
{
    parse.scope.pop();

    if (node)
    {
        if (isEmpty(parse.scope))
            node.topLevel = true;

        pushUnique(parse.parsedNodes, node);
    }
}



function genParseNodeOptions(parse)
{
    const opt = parseInt(parse.move());

    const options = 
    {
        active:       ((opt >>  0) & 1) != 0,
        beforeActive: ((opt >>  1) & 1) != 0,
        beforeList:   ((opt >>  2) & 1) != 0,
        enabled:      ((opt >>  3) & 1) != 0,
        cached:       ((opt >>  4) & 1) != 0,
        unknown:      ((opt >>  5) & 1) != 0,
        notCondition: ((opt >>  6) & 1) != 0,
        hasInputs:    ((opt >> 20) & 1) != 0
    };

    return options;
}



function genParseParamCount(parse)
{
    const nParamIds = parseInt(parse.move());

    if (parse.settings.logRequests) 
        parse.log += parse.tab + nParamIds;

    return nParamIds;
}






function genParseParamId(parse)
{
    const paramId = parse.move();

    if (parse.settings.logRequests)
        parse.log += parse.tab + paramId;

    return paramId;
}