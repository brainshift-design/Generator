class GraphPage
{
    id;
    name;


    parent;

    get path() 
    {
        let path = '';
        let page = this;
        
        while (page)
        {
            path = page.id + '/' + path;
            page = page.parent;
        }

        return path;
    }


    button;

    btnIcon;
    btnName;
    btnClose;


    groups = [];



    get nodes() { return graph.nodes.filter(n => n.pageId == this.id); }



    _pan = point(0, 0);
        
    get pan() { return this._pan; }
    set pan(pan)
    {
        if (this._pan == pan) return;

        this._pan = pan;
        
        graphView.updatePanAndZoom(true);
    }
    

    _zoom = 1;
    
    get zoom() { return this._zoom; }
    set zoom(zoom)
    {
        if (this._zoom == zoom) return;

        let pos = point(
            window.innerWidth /2,
            window.innerHeight/2);

        pos.y -= getTopHeight();

        const _pan = subv(this.pan, mulvs(subv(pos, this.pan), zoom / this.zoom - 1));

        this.setPanAndZoom(_pan, zoom);
    }


    setPanAndZoom(pan, zoom)
    {
        if (  (   pan  != this._pan
               || zoom != this._zoom)
            && zoom >= 0.02
            && zoom <= 50)
        {
            graphView.oldZoom = this.zoom;
    
            this._zoom = zoom;
            this._pan  = pan;
    
            
            graphView.panZoomTimer = setTimeout(() => 
            {
                graphView.updatePanAndZoom(this.zoom != graphView.oldZoom);
                graphView.panZoomTimer = null;
            });
        }
    };
    
    
    
    constructor(id, name)
    {
        this.id       = id;
        this.name     = name;
    

        this.button   = createDiv('page');

        this.btnIcon  = createDiv('pageIcon');
        this.btnName  = createDiv('pageName');
        this.btnClose = createDiv('pageClose');


        this.button.appendChild(this.btnIcon);
        this.button.appendChild(this.btnName);
        this.button.appendChild(this.btnClose);



        this.button.addEventListener('pointerenter', e => 
        { 
            graph.overIndex = graph.pages.indexOf(this); 
            graph.updatePages(); 
        });
        
        
        this.button.addEventListener('pointerleave', e => 
        { 
            graph.overIndex = -1;
            graph.updatePages(); 
        });
        
        
        this.button.addEventListener('pointerdown' , e => 
        { 
            if (e.button == 0)
            {
                graph.pageIndex = graph.pages.indexOf(this); 
                graph.updatePages(); 
                
                graph.updateSavedPages();
            }
        });



        this.btnClose.addEventListener('pointerenter', e => 
        { 
            this.btnClose.style.opacity = 1;    
        });
        
        
        this.btnClose.addEventListener('pointerleave', e => 
        { 
            this.btnClose.style.opacity = 0.65; 
        });
        
        
        this.btnClose.addEventListener('pointerdown', e =>
        {
            e.stopPropagation();
        });


        this.btnClose.addEventListener('pointerup', e => 
        { 
            if (e.button == 0)
                actionManager.do(new DeletePageAction(this.id));
        });
    }



    update()
    {
        const index = graph.pages.indexOf(this);

        const isCurrent = 
               index == graph.pageIndex
            || index == graph.overIndex;

        this.btnIcon .innerHTML        = iconPage;
        this.btnName .innerHTML        = settings.showNodeId ? this.id : this.name;
        this.btnClose.innerHTML        = iconPageClose;
        
        this.button  .style.background = isCurrent ? '#2c2c2c' : (document.hasFocus() ? '#202020' : '#383838');
        
        this.btnIcon .style.display    = this.button.offsetWidth >= 75 ? 'inline-block' : 'none';
        this.btnIcon .style.opacity    = isCurrent ? 1 : 0.35;
        
        this.btnName .style.color      = isCurrent ? '#fffffff0' : '#fff6';
    }



    toJson(_tab = '')
    {
        const tab = '\n' + _tab;// + HTAB;


        let json =
              tab + '{'
            + tab + HTAB + '"id": "'   + this.id    + '",'
            + tab + HTAB + '"name": "' + this.name  + '",'
            + tab + HTAB + '"zoom": "' + this.zoom  + '",'
            + tab + HTAB + '"panx": "' + this.pan.x + '",'
            + tab + HTAB + '"pany": "' + this.pan.y + '",'
            + tab + HTAB + '"groups":'
            + tab + HTAB + '[';

        for (let i = 0; i < this.groups.length; i++)
        {
            const group = this.groups[i];

            json += group.toJson(_tab + HTAB + HTAB);

            if (i < this.groups.length-1)
                json += ',';
        }

        json += 
              tab + HTAB + ']'
            + tab + '}';


        return json;
    }


    
    load(json)
    {
        this._pan  = point(0, 0);
        this._zoom = 1;
    
        
        if (json)
        {
            const data = JSON.parse(json);

            this.id   = data.id;
            this.name = data.name;


            this._pan = point( 
                parseFloat(data.panx), 
                parseFloat(data.pany));
    
            if (isNaN(this.pan.x)) this._pan.x = 0;
            if (isNaN(this.pan.y)) this._pan.y = 0;
    
            
            this._zoom = parseFloat(data.zoom);
            if (isNaN(this.zoom)) this._zoom = 1;


            if (isValid(data.groups))
            {
                for (const _group of data.groups)
                {
                    const group = new GraphPage(_group.id, _group.name);
                    group._pan  = point(_group.panx, _group.pany);
                    group._zoom = _group.zoom;

                    this.groups.push(group);
                }
            }
        }
    }
}