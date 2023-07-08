class   OpTextJoin
extends ResizableOperatorWithValue
{
    paramWith;



    constructor()
    {
        super(TEXT_JOIN, 'join', 'join', iconTextJoin);

        this.variableInputs   = true;
        this.alwaysLoadParams = true;

        this.addNewInput();
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
        this.addParam(this.paramWith = new TextParam('with', 'with', false, true, true));

        this.paramWith.controls[0].textbox.defPlaceholder = 'with';


        setControlFont(this.paramValue.controls[0].textbox, 'Roboto Mono', 10, 'center');
        setControlFont(this.paramWith .controls[0].textbox, 'Roboto Mono', 10, 'center');
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input([TEXT_VALUE, TEXT_LIST_VALUE, LIST_VALUE]);
        newInput.isNew = true;

        newInput.addEventListener('connect',    e => { onVariableConnectInput(e.detail.input); e.detail.input.isNew = false; });
        newInput.addEventListener('disconnect', e => onVariableDisconnectInput(e.detail.input));

        this.addInput(newInput);

        return newInput;
    }



    // setSize(w, h, updateTransform = true)
    // {
    //     const headerHeight = boundingRect(this.header).height / graph.currentPage.zoom;

    //     const height =
    //         settings.showOperationResults
    //         ? Math.max(headerHeight + 2 * defParamHeight, h)
    //         : headerHeight + defParamHeight;

    //     super.setSize(
    //         w, 
    //         height,
    //         updateTransform);

    //     this.updateValueParam();
    // }



    setRect(x, y, w, h, updateTransform = true)
    {
        const headerHeight = boundingRect(this.header).height / graph.currentPage.zoom;

        const height =
            settings.showOperationResults
            ? Math.max(headerHeight + 2 * defParamHeight, h)
            : headerHeight + 2 * defParamHeight;

        super.setRect(
            x, 
            y, 
            w, 
            height, 
            updateTransform);

        this.updateValueParam();
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const connectedInputs = this.node.inputs.filter(i => i.connected && !i.param);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        for (const input of connectedInputs)
            request.push(...pushInputOrParam(input, gen));

            
        request.push(...this.node.paramWith.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramValue.enableControlText(false);
        this.updateValueParam();

        this.updateParamControls();
    }



    updateValueParam()
    {
        const headerHeight = boundingRect(this.header).height / graph.currentPage.zoom;

        const totalParamHeight = 
              this.div.offsetHeight 
            - Math.max(defHeaderHeight, headerHeight);

        const hWith  = defParamHeight;
        const hValue = Math.max(defParamHeight, totalParamHeight - hWith);

        this.paramValue.div.style.width  = this.div.offsetWidth;
        this.paramValue.div.style.height = hValue;    

        this.paramWith.div.style.width  = this.div.offsetWidth;
        this.paramWith.div.style.height = hWith;    
    }
}
