TextControl.prototype.initEvents = function()
{
    this.div.addEventListener('pointerenter', e =>
    {
        if (panMode)
        {
            setCursor(panCursor);
            return;
        }


        //if (   !graphView.spaceDown
        //    &&  this.pointerEvents)
        //{
        //    // if (graphView.tempConn)
        //    //     this.div.style.cursor = 'default';
//
        //        
        //    // this.textbox.style.visibility = 'visible';
        //    // this.textbox.style.opacity    = '100%';
    //
        //    this.update();
        //}
        //else 
        if (!currentTooltip)
            initTextTooltip(this.value);
    });



    this.div.addEventListener('pointermove', e =>
    {
        e.stopPropagation();


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
                  &&  graphView.tempConn.input.canConnectFrom(this.param.output)
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



    this.div.addEventListener('pointerleave', e =>
    {
        if (panMode)
            return;


        // this.div.style.cursor       = 'default';
        
        // this.textbox.style.visibility = 'hidden';
        // this.textbox.style.opacity    = 0;

        this.update();


        if (graphView.tempConn)
        {
            if (   graphView.tempConn.output
                && graphView.tempConn.output.node != this.param.node)
            {
                const input = graphView.overInput;
                
                graphView.overInput   = null;
                
                if (input) // will be null if data types don't match or there's no auto input for someo other reason
                {
                    input.mouseOver = false;
                    input.updateControl();
                }
                
                graphView.tempConn.wire .inputPos = point_NaN;
            }
            else if (graphView.tempConn.input
                  && graphView.tempConn.input.node != this.param.node)
            {
                const output = graphView.overOutput;
                
                graphView.overOutput = null;

                if (output) // will be null if data types don't match or there's no auto output for someo other reason
                {
                    output.mouseOver = false;
                    output.updateControl();
                }

                graphView.tempConn.wire .outputPos = point_NaN;

                graphView.tempConn.input.updateControl();
           }
        }
    });



    this.div.addEventListener('dblclick', e =>
    {
        e.stopPropagation();
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