const windowBorderWidth = 8;
const sizeBorderWidth   = 4;



class   ResizableBase
extends OperatorBase
{
    sizerL;
    sizerR;
    sizerT;
    sizerB;

    sizerTL;
    sizerTR;
    sizerBL;
    sizerBR;



    constructor(type, id, name, icon, defWidth = defNodeWidth, progressBar = false)
    {
        super(type, id, name, icon, defWidth, progressBar);

        this.initSizers();
    }



    initSizers()
    {
        this.sizerL  = createDiv('sizerEdge sizerH sizerL');
        this.sizerR  = createDiv('sizerEdge sizerH sizerR');
        this.sizerT  = createDiv('sizerEdge sizerV sizerT');
        this.sizerB  = createDiv('sizerEdge sizerV sizerB');

        this.sizerTL = createDiv('sizerCorner sizerTL');
        this.sizerTR = createDiv('sizerCorner sizerTR');
        this.sizerBL = createDiv('sizerCorner sizerBL');
        this.sizerBR = createDiv('sizerCorner sizerBR');


        this.div.appendChild(this.sizerL);
        this.div.appendChild(this.sizerR);
        //this.div.appendChild(this.sizerT);
        this.div.appendChild(this.sizerB);

        //this.div.appendChild(this.sizerTL);
        //this.div.appendChild(this.sizerTR);
        this.div.appendChild(this.sizerBL);
        this.div.appendChild(this.sizerBR);


        this.initSizerEvents(this.sizerL,  this.setRectL );
        this.initSizerEvents(this.sizerR,  this.setRectR );
        //this.initSizerEvents(this.sizerT,  this.setRectT );
        this.initSizerEvents(this.sizerB,  this.setRectB );

        //this.initSizerEvents(this.sizerTL, this.setRectTL);
        //this.initSizerEvents(this.sizerTR, this.setRectTR);
        this.initSizerEvents(this.sizerBL, this.setRectBL);
        this.initSizerEvents(this.sizerBR, this.setRectBR);
   }



    initSizerEvents(sizer, setRect)
    {
        sizer.resizing = false;


        sizer.addEventListener('pointerdown', e =>
        {
            if (e.button == 0)
            {
                if (document.activeElement)
                    document.activeElement.blur();

                hideAllMenus();
                
                    
                e.stopImmediatePropagation();


                if (graph.currentPage.zoom < settings.minZoomForParams)
                {
                    forwardEvent(e, this.header);
                    return;
                }

                   
                e.preventDefault();


                sizer.startRect = offsetRect(this.div);
                sizer.resizing  = true;

                
                sizer.setPointerCapture(e.pointerId);

                sizer.sx = e.clientX;
                sizer.sy = e.clientY;
            }        
        });



        sizer.addEventListener('pointermove', e =>
        {
            if (!sizer.resizing)
                return;


            const dx = (e.clientX - sizer.sx) / graph.currentPage.zoom;
            const dy = (e.clientY - sizer.sy) / graph.currentPage.zoom;
        
            setRect(sizer, dx, dy);
                

            e.preventDefault();
            e.stopImmediatePropagation();

            this.updateMeasureData();
        });
        

        
        sizer.addEventListener('pointerup', e =>
        {
            if (e.button == 0)
            {
                if (sizer.resizing)
                {
                    actionManager.do(new SetNodeRectAction(
                        this.id, 
                        sizer.startRect, 
                        offsetRect(this.div)));

                    sizer.resizing = false;
                }


                if (sizer.hasPointerCapture(e.pointerId))
                    sizer.releasePointerCapture(e.pointerId);
            }
        });
    }



    setRectL = (sizer, dx, dy) => // these have to be lambdas for 'this'
    {
        this.setRect(
            sizer.startRect.x + dx,
            sizer.startRect.y, 
            sizer.startRect.w - dx, 
            sizer.startRect.h);
    };



    setRectR = (sizer, dx, dy) =>
    {
        this.setRect(
            sizer.startRect.x, 
            sizer.startRect.y, 
            sizer.startRect.w + dx, 
            sizer.startRect.h);
    }



    setRectT = (sizer, dx, dy) =>
    {
        this.setRect(
            sizer.startRect.x, 
            sizer.startRect.y + dy, 
            sizer.startRect.w, 
            sizer.startRect.h - dy);
    };



    setRectB = (sizer, dx, dy) =>
    {
        this.setRect(
            sizer.startRect.x, 
            sizer.startRect.y, 
            sizer.startRect.w, 
            sizer.startRect.h + dy);
    }



    setRectTL = (sizer, dx, dy) => // these have to be lambdas for 'this'
    {
        this.setRect(
            sizer.startRect.x + dx,
            sizer.startRect.y + dy, 
            sizer.startRect.w - dx, 
            sizer.startRect.h - dy);
    };



    setRectTR = (sizer, dx, dy) =>
    {
        this.setRect(
            sizer.startRect.x, 
            sizer.startRect.y + dy, 
            sizer.startRect.w + dx, 
            sizer.startRect.h - dy);
    }



    setRectBL = (sizer, dx, dy) =>
    {
        this.setRect(
            sizer.startRect.x + dx, 
            sizer.startRect.y, 
            sizer.startRect.w - dx, 
            sizer.startRect.h + dy);
    };



    setRectBR = (sizer, dx, dy) =>
    {
        this.setRect(
            sizer.startRect.x, 
            sizer.startRect.y, 
            sizer.startRect.w + dx, 
            sizer.startRect.h + dy);
    }


    // setSize(w, h, updateTransform = true)
    // {
    //     let headerHeight = getStyleValue(this.header, 'offset-height');
    //     if (typeof headerHeight == 'string') headerHeight = defHeaderHeight;

    //     const paramHeight = 
    //            this instanceof ResizableOperatorWithValue
    //         && settings.showOperationResults
    //         ? defParamHeight 
    //         : 0;


    //     const _w = Math.max(60, w);
    //     const _h = Math.max(parseFloat(headerHeight) + paramHeight, h);

    //     super.setSize(_w, _h, updateTransform);

    //     this.updateSizers();

    //     this.inner.style.height = _h;
    // }



    setRect(x, y, w, h, updateTransform = true)
    {
        const headerHeight = getStyleValue(this.header, 'height');

        const paramHeight = 
               this instanceof ResizableOperatorWithValue
            && settings.showOperationResults 
            ? defParamHeight 
            : 0;

        const _w = Math.max(60, w);
        const _h = Math.max(parseFloat(headerHeight) + paramHeight, h);

        super.setRect(x, y, _w, _h, updateTransform);
        
        this.updateSizers();
    
        this.inner.style.height = _h;
    }



    updateSizers()
    {
        const edge   = Math.ceil(sizeBorderWidth / graph.currentPage.zoom);
        const corner = Math.max(sizeBorderWidth, edge);

        this.sizerL .style.width  = edge; 
        this.sizerR .style.width  = edge; 

        this.sizerT .style.height = edge; 
        this.sizerB .style.height = edge; 

        this.sizerTL.style.width  = corner; 
        this.sizerTL.style.height = corner; 

        this.sizerTR.style.width  = corner; 
        this.sizerTR.style.height = corner; 

        this.sizerBL.style.width  = corner; 
        this.sizerBL.style.height = corner; 

        this.sizerBR.style.width  = corner; 
        this.sizerBR.style.height = corner; 


        const canReact = graph.currentPage.zoom >= settings.minZoomForParams;

        this.sizerL.style.cursor  = canReact ? 'ew-resize'   : 'default';
        this.sizerR.style.cursor  = canReact ? 'ew-resize'   : 'default';
        this.sizerT.style.cursor  = canReact ? 'ns-resize'   : 'default';
        this.sizerB.style.cursor  = canReact ? 'ns-resize'   : 'default';
        
        this.sizerTL.style.cursor = canReact ? 'nwse-resize' : 'default';
        this.sizerTR.style.cursor = canReact ? 'nesw-resize' : 'default';
        this.sizerBL.style.cursor = canReact ? 'nesw-resize' : 'default';
        this.sizerBR.style.cursor = canReact ? 'nwse-resize' : 'default';
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        let json = super.toJsonBase(nTab);

        json += 
              ',\n' + pos + tab + '"width": "'  + this.div.offsetWidth  + '"'
            + ',\n' + pos + tab + '"height": "' + this.div.offsetHeight + '"';

        return json;
    }



    loadParams(_node, pasting)
    {
        super.loadParams(_node, pasting);


        if (   _node.width
            && _node.height)
        {
            this.setRect(
                parseFloat(_node.x     ), 
                parseFloat(_node.y     ), 
                parseFloat(_node.width ), 
                parseFloat(_node.height),
                false);
            // this.setSize(
            //     parseFloat(_node.width), 
            //     parseFloat(_node.height),
            //     false);
        }
    }
}
