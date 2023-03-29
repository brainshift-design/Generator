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
        this.div.over            = true;
        this.graph.view.overNode = this;
        
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
        this.div.over            = false;
        this.graph.view.overNode = null;
        
        if (   (  !e.altKey
                || getCtrlKey(e)
                || e.shiftKey)
            && graphView._soloNode == this)
            graphView.unsoloNode();

        this.updateNode();
    });

    
    this.paramBack       = createDiv('nodeParamBack');
    this.hiddenParamBack = createDiv('nodeHiddenParamBack');


    this.createHeader();
    this.createInfo();


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
        if (this.graph.view.isPanning(e))
            return;


        window.focus();


        e.preventDefault();


        // I don't want to focus here, but I do want to take focus away from elsewhere
        document.activeElement.blur();


        const view = this.graph.view;


        view.lastSelectedNodes = [...view.selectedNodes];
        
        view.putNodeOnTop(this);


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
            && !view.overOutput
            && !view.overInput)
        {
            e.stopPropagation();

            view.selectFromClick(this, getCtrlKey(e), e.shiftKey, e.altKey);
                        
            this.sx = e.clientX;
            this.sy = e.clientY;

            for (const n of view.selectedNodes)
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

            view.selectFromClick(this, getCtrlKey(e), e.shiftKey, e.altKey);

            menuNode.showAt(e.clientX, e.clientY);
        }

        
        updateGraphNodes();
    });



    this.header.addEventListener('pointermove', e =>
    {
        if (this.graph.view.isPanning(e))
            return;


        const view = this.graph.view;


        const toTheRightOfInputs = e.clientX - boundingRect(this.header).x > 12 * graphView.zoom;

        const tempConn  = view. tempConn;
        let   savedConn = view.savedConn;


        if (this.div.dragging)
        {
            const x       = view.div.clientLeft;
            const w       = view.div.clientWidth;
            const h       = view.div.clientHeight;
            const bounds  = view.getAllNodeBounds();

            const yOffset = menuBarHeight;

            view.setNodePositions(
                view.selectedNodes,
                (e.clientX - this.sx) / view.zoom,
                (e.clientY - this.sy) / view.zoom);
            
            this.div.moved = true;

            view.updateScroll(x, w, h, bounds, yOffset);

            if (this.type == NODE_GROUP)
                this.updateProxyWires();
        }
        else if (   tempConn
                 && toTheRightOfInputs)
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
                          ((e.clientY - rect.y) / view.zoom - padding - (connectionSize + connectionGap)/2) 
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

                    
                    view.overInput   = savedConn.input;
                    view.headerInput = savedConn.input;

                    view.overInput.updateControl();

                    
                    const inputRect = boundingRect(savedConn.input.div);

                    tempConn.wire.inputPos = point(
                        inputRect.x + inputRect.w/2,
                        inputRect.y + inputRect.h/2 - menuBarHeight);
                }
                else
                {
                    const input = this.getAutoInput(tempConn.output);
                    if (!input) return;

                    view.overInput   = input;
                    view.headerInput = input;
                        
                    input.mouseOver = true;
                    input.updateControl();

                    const inputRect = boundingRect(input.div);
                    
                    tempConn.wire.inputPos = point(
                        inputRect.x + inputRect.w/2,
                        inputRect.y + inputRect.h/2 - menuBarHeight);
                }
            }
            else if ( tempConn.input
                  && !this.isOrFollows(tempConn.input.node))
            {
                const output = this.getAutoOutput(tempConn.input.types);
                if (!output) return;

                view.overOutput   = output;
                view.headerOutput = output;
                    
                output.mouseOver = true;
                output.updateControl();


                const rect = boundingRect(output.div);

                tempConn.wire.outputPos = point(
                    rect.x + rect.w/2,
                    rect.y + rect.h/2 - menuBarHeight);


                tempConn.input.updateControl();
            }
        }
    });



    this.header.addEventListener('pointerup', e =>
    {
        if (this.graph.view.isPanning(e))
            return;


        const view = this.graph.view;


        if (   e.button == 0
            && this.div.dragging)
        {
            if (this.div.moved)
            {
                actionManager.do(new SelectMoveNodesAction(
                    this.graph,
                    view.lastSelectedNodes.map(n => n.id), 
                    view.selectedNodes.map(n => n.id), 
                    point(this.slx, this.sly),
                    point(this.div.offsetLeft, this.div.offsetTop),
                    this.div.shiftOnPointerDown ));
            }
            else if (!arraysAreEqual(view.selectedNodes, view.lastSelectedNodes))
            {
                actionManager.do(new SelectNodesAction(
                    this.graph,
                    view.selectedNodes    .map(n => n.id), 
                    view.lastSelectedNodes.map(n => n.id)));
            }

            this.div.dragging = false;
            this.header.releasePointerCapture(e.pointerId);
        }

        
        else if (view.tempConn)
        {
            if (    view.tempConn.output
                && !view.tempConn.output.node.isOrFollows(this)
                &&  view.overInput)
            {
                view          .endConnection(e.pointerId, getCtrlKey(e));
                view.overInput.endConnection();
            }
            else if ( view.tempConn.input
                  && !this.isOrFollows(view.tempConn.input.node)
                  &&  view.overOutput)
            {
                view           .endConnection(e.pointerId, getCtrlKey(e));
                view.overOutput.endConnection();
            }
        }


        this.div.shiftOnPointerDown = false;
    });
    
    

    this.header.addEventListener('pointerleave', e => 
    { 
        const view = this.graph.view;


        if (view.tempConn)
        {
            if (   view.tempConn.output
                && view.tempConn.output.node != this)
            {
                const input = view.headerInput;
                
                view.overInput   = null;
                view.headerInput = null;
                
                if (input) // will be null if data types don't match or there's no auto input for someo other reason
                {
                    input.mouseOver = false;
                    input.updateControl();
                }
                
                view.tempConn.wire.inputPos = point_NaN;
            }
            else if (view.tempConn.input
                  && view.tempConn.input.node !=  this)
            {
                const output = view.headerOutput;
                
                view.overOutput   = null;
                view.headerOutput = null;

                if (output) // will be null if data types don't match or there's no auto output for someo other reason
                {
                    output.mouseOver = false;
                    output.updateControl();
                }

                view.tempConn.wire.outputPos = point_NaN;
                
                view.tempConn.input.updateControl();
           }
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
            actionManager.do(new MakeActiveNodesAction(this.graph, [this.id]));

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