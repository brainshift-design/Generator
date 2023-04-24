var  newReorderIndex = Number.NaN;
var prevReorderIndex = Number.NaN;
var  oldReorderIndex = Number.NaN;



Operator.prototype.createNode = function()
{
    this.div                    = createDiv('node');
    this.div.node               = this;
       
    this.div.style.width        = this.defaultWidth + 'px';
           
    this.div.over               = false;
    this.div.dragging           = false;
    this.div.shiftOnPointerDown = false;
    this.div.moved              = false;
    
    this.enterTimer             = null;


    this.inner = createDiv('nodeInner');
    this.div.appendChild(this.inner);


    this.div.addEventListener('pointerenter', e =>
    {
        this.div.over      = true;
        graphView.overNode = this;
        
        if (    e.altKey
            && !getCtrlKey(e)
            && !e.shiftKey
            &&  graphView._soloNode != this
            && !altPressedInMenu) 
            graphView.soloNode(this);
        
        this.updateNode();
    });

    
    this.div.addEventListener('pointerleave', e =>
    {
        this.div.over      = false;
        graphView.overNode = null;
        
        if (   (  !e.altKey
                || getCtrlKey(e)
                || e.shiftKey)
            && graphView._soloNode == this)
            graphView.unsoloNode();

        this.updateNode();
    });

    
    this.paramHolder = createDiv('nodeParamBack');


    this.createHeader();
    this.createInfo();


    this.inner.appendChild(this.paramHolder);


    this.subscribeCover = createDiv('subscribeCover');

    this.subscribeCover.addEventListener('pointerenter', e => { e.preventDefault(); e.stopImmediatePropagation(); });
    this.subscribeCover.addEventListener('pointermove',  e => { e.preventDefault(); e.stopImmediatePropagation(); });
    this.subscribeCover.addEventListener('pointermove',  e => { e.preventDefault(); e.stopImmediatePropagation(); });

    this.subscribeLabel = createDiv('subscribeLabel');
    this.subscribeLabel.innerHTML = 'SUBSCRIBE';

    this.div.appendChild(this.subscribeCover);
    this.div.appendChild(this.subscribeLabel);
}     



Operator.prototype.createHeader = function()
{
    this.header = createDiv('nodeHeader');
    
    this.header.connectionPadding = 8;
    this.header.ignoreDoubleClick = false; // used by child objects that need to be double clicked


    this.createLabel();
    this.initLabelTextbox();

    
    this. inputControls = createDiv('inputControls' );
    this.outputControls = createDiv('outputControls');
    this.reorderArrows  = createDiv('reorderArrows' );

    this.header.appendChild(this. inputControls);
    this.header.appendChild(this.outputControls);
    this.header.appendChild(this. reorderArrows);

    
    this.inner.appendChild(this.header);



    this.header.addEventListener('pointerdown', e =>
    {
        if (graphView.isPanning(e))
            return;


        window.focus();


        e.preventDefault();


        // I don't want to focus here, but I do want to take focus away from elsewhere
        document.activeElement.blur();


        graphView.lastSelectedNodes = [...graphView.selectedNodes];
        
        graphView.putNodeOnTop(this);


        for (const param of this.params)
        {
            if (param.textboxHasFocus())
                param.controls[0].textbox.finish(true);
        }


        if (e.button == 0)
            hideAllMenus();


        if (   e.button == 0
            || e.button == 2)
        {
            this.div.shiftOnPointerDown = 
                    e.shiftKey
                && !getCtrlKey(e)
                && !e.altKey;
        }


        if (    e.button == 0
            && !graphView.overOutput
            && !graphView.overInput)
        {
            e.stopPropagation();

            graphView.selectFromClick(this, getCtrlKey(e), e.shiftKey, e.altKey);
                        
            this.sx = e.clientX;
            this.sy = e.clientY;

            for (const n of graphView.selectedNodes)
            {
                n.slx = n.div.offsetLeft;
                n.sly = n.div.offsetTop;
            }

            this.div.dragging = true;
            this.header.setPointerCapture(e.pointerId);
        }

        else if (e.button == 2)
        {
            e.stopPropagation();

            graphView.selectFromClick(this, getCtrlKey(e), e.shiftKey, e.altKey);

            menuNode.showAt(e.clientX, e.clientY, false);
        }

        
        updateGraphNodes();
    });



    this.header.addEventListener('pointermove', e =>
    {
        if (graphView.isPanning(e))
            return;


        const headerRect = boundingRect(this.header);

        const rightOfInputs = e.clientX - headerRect.x > 12 * graph.currentPage.zoom;
        const leftOfOutputs = e.clientX - headerRect.x < headerRect.width - 12 * graph.currentPage.zoom;

        const tempConn  = graphView. tempConn;
        let   savedConn = graphView.savedConn;


        if (this.div.dragging)
        {
            const x       = graphView.div.clientLeft;
            const w       = graphView.div.clientWidth;
            const h       = graphView.div.clientHeight;
            const bounds  = graphView.getAllNodeBounds();

            const yOffset = getTopHeight();

            graphView.setNodePositions(
                graphView.selectedNodes,
                (e.clientX - this.sx) / graph.currentPage.zoom,
                (e.clientY - this.sy) / graph.currentPage.zoom);
            
            this.div.moved = true;

            graphView.updateScroll(x, w, h, bounds, yOffset);
        }
        else if (   tempConn
                 && rightOfInputs
                 && leftOfOutputs)
        {
            if (    tempConn.output
                && !tempConn.output.node.isOrFollows(this))
            {
                if (   this.variableInputs
                    && savedConn
                    && this == savedConn.input.node)
                {
                    const rect    = boundingRect(this.div);
                    const padding = this.header.connectionPadding;


                    const index = Math.min(Math.max(0, Math.round(
                          ((e.clientY - rect.y) / graph.currentPage.zoom - padding - (connectionSize + connectionGap)/2) 
                        / (connectionSize + connectionGap))),
                        this.headerInputs.length-(this.headerInputs.length > 1 ? 2 : 1));

                    if (index != prevReorderIndex)
                    {
                        newReorderIndex = index;

                        moveInArray(
                            this.inputs, 
                            this.inputs.indexOf(savedConn.input),
                            newReorderIndex);

                        this.updateNode();
                         
                        prevReorderIndex = newReorderIndex;
                    }

                    
                    graphView.overInput   = savedConn.input;
                    graphView.headerInput = savedConn.input;

                    graphView.overInput.updateControl();

                    
                    const inputRect = boundingRect(savedConn.input.div);

                    tempConn.wire.inputPos = point(
                        inputRect.x + inputRect.w/2,
                        inputRect.y + inputRect.h/2 - getTopHeight());
                }
                else
                {
                    const input = this.getAutoInput(tempConn.output);
                    if (!input) return;

                    graphView.overInput   = input;
                    graphView.headerInput = input;
                    //console.log('headerInput = ', graphView.headerInput);
                        
                    input.mouseOver = true;
                    input.updateControl();

                    const inputRect = boundingRect(input.div);
                    
                    tempConn.wire.inputPos = point(
                        inputRect.x + inputRect.w/2,
                        inputRect.y + inputRect.h/2 - getTopHeight());
                }
            }
            else if ( tempConn.input
                  && !this.isOrFollows(tempConn.input.node))
            {
                const output = this.getAutoOutput(tempConn.input.types);
                if (!output) return;

                graphView.overOutput   = output;
                graphView.headerOutput = output;
                //console.log('headerOutput = ', graphView.headerOutput);
                    
                output.mouseOver = true;
                output.updateControl();


                const rect = boundingRect(output.div);

                tempConn.wire.outputPos = point(
                    rect.x + rect.w/2,
                    rect.y + rect.h/2 - getTopHeight());


                tempConn.input.updateControl();
            }
        }
    });



    this.header.addEventListener('pointerup', e =>
    {
        if (graphView.isPanning(e))
            return;


        if (   e.button == 0
            && this.div.dragging)
        {
            if (this.div.moved)
            {
                actionManager.do(new SelectMoveNodesAction(
                    graphView.lastSelectedNodes.map(n => n.id), 
                    graphView.selectedNodes.map(n => n.id), 
                    point(this.slx, this.sly),
                    point(this.div.offsetLeft, this.div.offsetTop),
                    this.div.shiftOnPointerDown));
            }
            else if (!arraysAreEqual(graphView.selectedNodes, graphView.lastSelectedNodes))
            {
                actionManager.do(new SelectNodesAction(
                    graphView.selectedNodes    .map(n => n.id), 
                    graphView.lastSelectedNodes.map(n => n.id)));
            }

            this.div.dragging = false;
            this.header.releasePointerCapture(e.pointerId);
        }

        else if (graphView.tempConn)
        {
            if (    graphView.tempConn.output
                && !graphView.tempConn.output.node.isOrFollows(this)
                &&  graphView.overInput)
            {
                const overInput = graphView.overInput;

                graphView          .endConnection(e.pointerId, getCtrlKey(e));
                graphView.overInput.endConnection();

                if (!graphView.headerInput)
                    graphView.overInput = overInput; // to be able to use the input again immediately
            }
            else if ( graphView.tempConn.input
                  && !this.isOrFollows(graphView.tempConn.input.node)
                  &&  graphView.overOutput)
            {
                const overOutput = graphView.overOutput;

                graphView           .endConnection(e.pointerId, getCtrlKey(e));
                graphView.overOutput.endConnection();

                if (!graphView.headerOutput)
                    graphView.overOutput = overOutput; // to be able to use the output again immediately
            }
        }


        this.div.shiftOnPointerDown = false;
    });
    
    

    this.header.addEventListener('pointerleave', e => 
    { 
        if (graphView.tempConn)
        {
            if (   graphView.tempConn.output
                && graphView.tempConn.output.node != this)
            {
                const input = graphView.headerInput;
                
                graphView.overInput   = null;
                
                if (input) // will be null if data types don't match or there's no auto input for someo other reason
                {
                    input.mouseOver = false;
                    input.updateControl();
                }
                
                graphView.tempConn.wire.inputPos = point_NaN;
                graphView.tempConn.output.updateControl();
            }
            else if (graphView.tempConn.input
                  && graphView.tempConn.input.node !=  this)
            {
                const output = graphView.headerOutput;
                
                graphView.overOutput   = null;

                if (output) // will be null if data types don't match or there's no auto output for someo other reason
                {
                    output.mouseOver = false;
                    output.updateControl();
                }

                graphView.tempConn.wire.outputPos = point_NaN;
                graphView.tempConn.input.updateControl();
           }

           graphView.headerInput  = null;
           graphView.headerOutput = null;
        }
    });



    this.header.addEventListener('dblclick', e =>
    {
        e.preventDefault();

        
        const bounds = boundingRect(this.label);

        if (  !getCtrlKey(e)
            && e.clientX >= bounds.left && e.clientX < bounds.right
            && e.clientY >= bounds.top  && e.clientY < bounds.bottom)
            this.showLabelTextbox();
        else if (!this.header.ignoreDoubleClick)
            actionManager.do(new MakeActiveNodesAction([this.id]));

        this.header.ignoreDoubleClick = false;
    });
};



Operator.prototype.createInfo = function()
{
    this.divDisabled = createDiv();
    this.div.appendChild(this.divDisabled);

    this.divDisabled.style.display       = 'none';
    this.divDisabled.style.position      = 'absolute';
    this.divDisabled.style.width         =  5;
    this.divDisabled.style.height        =  100;
    this.divDisabled.style.background    = '#e88b';
    this.divDisabled.style.pointerEvents = 'none';
    //this.divDisabled.style.zIndex        = 100;
};



Operator.prototype.createProgressBar = function()
{
    this.hasProgressBar  = true;

    this.progressWrapper = createDiv('progressWrapper');
    this.progressBar     = createDiv('progressBar');

    this.progressWrapper.appendChild(this.progressBar);
    this.header         .appendChild(this.progressWrapper);
};



Operator.prototype.initProgress = function()
{
    this.progressWrapper.style.display = 'block';

    this.progressBar    .style.left    = '0%';
    this.progressBar    .style.width   = '100%';
};



Operator.prototype.updateProgress = function(progress)
{
    this.progressBar.style.left  = (   progress  * 100) + '%';
    this.progressBar.style.width = ((1-progress) * 100) + '%';
};



Operator.prototype.endNodeProgress = function()
{
    this.progressWrapper.style.display = 'none';
};