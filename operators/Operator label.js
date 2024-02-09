Operator.prototype.createLabel = function()
{
    this.labelWrapper         = createDiv('nodeLabelWrapper');
    this.labelWrapper.node    = this;
  
    this.label                = createDiv('nodeLabel');
    this.label.node           = this;
    
    this.divIcon              = createDiv('nodeIcon');
    this.divIcon.innerHTML    = this.icon;
    
    this.labelText            = createDiv('nodeLabelText');
    this.labelText.node       = this;
    this.labelText.clickTimer = -1; 
    
    this.label       .appendChild(this.divIcon);
    this.label       .appendChild(this.labelText);

    this.labelWrapper.appendChild(this.label);
    this.header      .appendChild(this.labelWrapper);

    


    this.labelWrapper.addEventListener('pointerdown', e =>
    {
        //e.preventDefault();
    });

    
    this.labelWrapper.addEventListener('pointermove', e =>
    {
        if (!this.scrollName)
            return;

        const wrect      = boundingRect(this.labelWrapper);
        const margin     = 15;
        const viewMargin = margin * graph.currentPage.zoom;
        
        const x          = e.clientX - wrect.x;

             if (x <  viewMargin)               this.updateHeaderLabelOffsetX(0);
        else if (x >= wrect.width - viewMargin) this.updateHeaderLabelOffsetX(1);
        else if (x >= viewMargin
              && x <  wrect.width - viewMargin) this.updateHeaderLabelOffsetX((x - viewMargin) / (wrect.width - viewMargin*2));
        else                                    this.updateHeaderLabelOffsetX();
    });
};



Operator.prototype.updateHeaderLabel = function()
{
    // console.log('\'' + this.nodeId + '\'.updateHeaderLabel()');
    // console.trace();

    // if (   !this.measureData.labelOffset
    //     || !this.measureData.labelWrapperOffset)
    //     return;


    this.updateHeaderLabelText();

    
    this.label.style.top = 
          (  Math.floor(this.measureData.labelWrapperOffset.height/2 - this.measureData.labelOffset.height/2)
           + Math.min(Math.max(1, 1/graph.currentPage.zoom), 2)
           - (settings.showNodeId ? 1 : 0))
        + 'px';


    this.updateHeaderLabelOffsetX();


    const margin = 10;
    const wrect  = this.measureData.labelWrapperBounds;
    const wr     = wrect.width / graph.currentPage.zoom;

    const s0     = margin;
    const s1     = margin + 15;
    const s2     = wr - margin - 15 + 1;
    const s3     = wr - margin      + 1;

    const mask =
        'linear-gradient(90deg, '
        + '#0000 ' + s0 + 'px, '
        + '#000f ' + s1 + 'px, '
        + '#000f ' + s2 + 'px, '
        + '#0000 ' + s3 + 'px)';

    this.labelWrapper.style.width = '100%';

    this.labelWrapper.style.WebkitMaskImage = 
    this.labelWrapper.style.maskImage       = mask;

    const colors = this.getHeaderColors();

    
    let fontSize = 11;

    // compensate for bold active header names look THINNER when zoomed out
         if (graph.currentPage.zoom < 0.5 ) fontSize = 17;
    else if (graph.currentPage.zoom < 0.75) fontSize = 15;
    else if (graph.currentPage.zoom < 1   ) fontSize = 13;
    else if (graph.currentPage.zoom < 1.5 ) fontSize = 12;

    this.label.style.color      = rgba2style(colors.text);
    this.label.style.fontSize   = this.active ? fontSize : 11;
    this.label.style.height     = this.active ? fontSize * 15 / 11 : 15;
    this.label.style.fontWeight = graph.currentPage.zoom < 1.2 ? '600' : 'normal';


    this.updateIcon();
};



Operator.prototype.updateHeaderLabelText = function()
{
    //console.log('\'' + this.nodeId + '\'.updateHeaderLabelText()');

    const prefix = '';
        // this.type == REPEAT 
        // ? '...' 
        // : '';
    
    let suffix;

    const sep      = settings.showNodeId ? ' '   : '  ';
    const ellipsis = settings.showNodeId ? '...' : ' . . .';

    //     if (this.type == COMBINE     ) suffix = sep + '[ ' + this.length        + ' ]';
    //else 
         if (this.type == EXTRACT     ) suffix =            sep + '[ ' + (this.isUnknown() ? '?' : this.length       ) + ' ]';
    else if (this.type == SUBLIST     ) suffix =            sep + '[ ' + (this.isUnknown() ? '?' : this.length       ) + ' ]';
    else if (this.type == COLUMN      ) suffix =            sep + '[ ' + (this.isUnknown() ? '?' : this.columnLength ) + ' ]';
    else if (this.type == REVERSE_LIST) suffix =            sep + '[ ' + (this.isUnknown() ? '?' : this.length       ) + ' ]';
    //else if (this.type == SORT      ) suffix =            sep + '[ ' + (this.isUnknown() ? '?' : this.length       ) + ' ]';
    else if (this.type == FILTER      ) suffix =            sep + '[ ' + (this.isUnknown() ? '?' : this.length       ) + ' ]';
    else if (this.type == UNIQUE      ) suffix =            sep + '[ ' + (this.isUnknown() ? '?' : this.length       ) + ' ]';
    else if (this.type == TEXT_SPLIT  ) suffix =            sep + '[ ' + (this.isUnknown() ? '?' : this.length       ) + ' ]';
    else if (this.type == LIST        ) suffix = ellipsis + sep + '[ ' + (this.isUnknown() ? '?' : this.params.length) + ' ]';
    else if (this.type == CACHE       ) suffix = ellipsis;
    else
        suffix = 
               this.cached 
            || this.type == START 
            ? '' 
            : ellipsis;


    suffix += this.suffix;


    let html = 
        settings.showNodeId 
        ? this.id + suffix 
        : prefix + this.getLabelText() + suffix;

    html += 
           this.active 
        && this.showActiveArrow 
        ? (settings.showNodeId ? ' ' : '  ') + '‣' 
        : '';
    

    html = html.replaceAll('</', '%%@@%%!!)77');
    html = html.replaceAll('/', ' / ');
    html = html.replaceAll('%%@@%%!!)77', '</');

    this.labelText.innerHTML = html;


    this.labelText.style.fontFamily = 
        settings.showNodeId 
        ? 'Roboto Mono' 
        : 'Inter';
};



Operator.prototype.updateHeaderLabelOffsetX = function(f = this.labelOffsetFactor)
{
    //console.log('\'' + this.nodeId + '\'.updateHeaderLabelOffsetX()');
    // console.trace();


    this.labelOffsetFactor = Math.min(Math.max(0, f), 1);


    const margin     = 15;
    const viewMargin = margin * graph.currentPage.zoom;

    const wrect      = this.measureData.labelWrapperBounds;
    const rect       = this.measureData.labelBounds;

    //const lw         = viewMargin;
    const rw         = wrect.width - viewMargin*2;
    //const sf         = rw / nozero(rect.width);
    //const df         = viewMargin / rect.width / 2;
        
    //const s1         = (this.labelOffsetFactor * (rect.width - rw)) / rect.width;
    //const s0         = s1 - df;
    //const s2         = s1 + sf;
    //const s3         = s2 + df;


    const activeOffset = this.getActiveOffset();
    const defOffset    = this.getDefaultOffset();


    if (   rect.width > rw)
        //&& this.type != PANEL)
    {
        this.label.style.left = 
              margin 
            - this.labelOffsetFactor * (rect.width - rw - 1) / graph.currentPage.zoom
            + (this.active ? activeOffset : 0);
            
        this.label.style.transform = 'none';
    }
    else
    {
        this.label.style.left = 
              'calc(50%' 
            + (this.active && this.showActiveArrow ? (' + ' + activeOffset + 'px') : (' + ' + defOffset + 'px')) 
            + ')';

        this.label.style.transform = 'translateX(-50%)';
    }


    // if (this.type != PANEL)
    // {
    //     const color = 
    //         this.label.style.color.trim() != ''
    //         ?  this.label.style.color
    //         : 'black';

    //     this.label.style.background = 
    //         'linear-gradient(90deg, '
    //         + '#0000 '     + (s0 * 100) + '%, '
    //         +  color + ' ' + (s1 * 100) + '%, '
    //         +  color + ' ' + (s2 * 100) + '%, '
    //         + '#0000 '     + (s3 * 100) + '%)';

    //     this.label.style.WebkitBackgroundClip = 'text';
    //     this.label.style.WebkitTextFillColor  = 'transparent';
    // }
};