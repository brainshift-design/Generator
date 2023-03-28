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



    constructor(type, shortName)
    {
        super(type, shortName);

        this.initSizer();
    }



    initSizer()
    {
        this.sizerL   = createDiv('sizerEdge sizerH sizerL');
        this.sizerR   = createDiv('sizerEdge sizerH sizerR');
        this.sizerT   = createDiv('sizerEdge sizerV sizerT');
        this.sizerB   = createDiv('sizerEdge sizerV sizerB');

        this.sizerTL  = createDiv('sizerCorner sizerTL');
        this.sizerTR  = createDiv('sizerCorner sizerTR');
        this.sizerBL  = createDiv('sizerCorner sizerBL');
        this.sizerBR  = createDiv('sizerCorner sizerBR');


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
                sizer.startRect = offsetRect(this.div);
                sizer.resizing  = true;

                e.preventDefault();
                e.stopImmediatePropagation();

                sizer.setPointerCapture(e.pointerId);

                sizer.sx = e.clientX;
                sizer.sy = e.clientY;
            }        
        });



        sizer.addEventListener('pointermove', e =>
        {
            if (!sizer.resizing)
                return;


            const dx = (e.clientX - sizer.sx) / mainGraph.view.zoom;
            const dy = (e.clientY - sizer.sy) / mainGraph.view.zoom;
        
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
                        this.graph, 
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



    setSize(w, h, updateTransform = true)
    {
        super.setSize(
            Math.max(60, w), 
            Math.max(this.header.offsetHeight + 20, h), 
            updateTransform);

        this.inner.style.height = this.div.offsetHeight;
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        super.setRect(
            x, 
            y, 
            Math.max(100, w), 
            Math.max(this.header.offsetHeight + 20, h), updateTransform);

        this.inner.style.height = this.div.offsetHeight;
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = TAB;

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
            this.setSize(
                parseFloat(_node.width), 
                parseFloat(_node.height),
                false);
        }
    }
}
