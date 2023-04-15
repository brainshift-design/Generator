TextControl.prototype.initEvents = function()
{
    this.div.addEventListener('pointerenter', e =>
    {
        if (!currentTooltip)
            initTextTooltip(this.value);
    });



    this.div.addEventListener('pointermove', e =>
    {
        if (panMode)
        {
            setCursor(panCursor);
            return;
        }

        if (!this.pointerEvents)
            return;
        

        let rect = boundingRect(this.div);
        
        this.mouseOver = 
               e.clientX >= rect.left
            && e.clientX <  rect.right
            && e.clientY >= rect.top                                     
            && e.clientY <  rect.bottom;


        this.clientX = e.clientX;

        
        if (    this.buttonDown0
            && !this.readOnly)
        {
            //forwardEvent(e, this.textbox);
            // ...
        }
        else if (graphView.tempConn
              && this.param)
        {
            let savedInput = 
                graphView.savedConn
                ? graphView.savedConn.input
                : null;


            //console.log('graphView.tempConn =', graphView.tempConn);
            
            if (    graphView.tempConn.output
                &&  this.param.input
                &&  this.param.input.canConnectFrom(graphView.tempConn.output)
                && !graphView.tempConn.output.node.isOrFollows(this.param.node)
                && (  !this.param.input.connected // not already connected to this input
                    || this.param.input.connectedOutput != graphView.tempConn.output
                    || this.param.input == savedInput))
            {
                graphView.overInput = this.param.input;
                    
                this.param.input.mouseOver = true;
                this.param.input.updateControl();

                const rect = boundingRect(this.param.input.div);

                graphView.tempConn.wire .inputPos = point(
                    rect.x + rect.w/2,
                    rect.y + rect.h/2 - getTopHeight());
            }
            else if ( graphView.tempConn.input
                  &&  this.param.output
                  &&  graphView.tempConn.input.canConnectTo(this.param.output)
                  && !this.param.node.isOrFollows(graphView.tempConn.input.node))
            {
                graphView.overOutput = this.param.output;
                    
                this.param.output.mouseOver = true;
                this.param.output.updateControl();


                const rect = boundingRect(this.param.output.div);

                graphView.tempConn.wire .outputPos = point(
                    rect.x + rect.w/2,
                    rect.y + rect.h/2 - getTopHeight());


                graphView.tempConn.input.updateControl();
            }
        }
        // else if (this.readOnly)
        // {
        //     this.moved = true;
        // }
    });



    this.div.addEventListener('wheel', e =>
    {
        if (  !this.pointerEvents
            || panMode
            || graphView.wheelTimer)
            return;


        const touchpad = isTouchpad(e);

        if (touchpad)
        {
            e.preventDefault();
            return;
        }


        if (   !getCtrlKey(e)
            && !this.buttonDown1)
            e.stopPropagation();
    });
};