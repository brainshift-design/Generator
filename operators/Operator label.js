function createNodeLabel(node)
{
    node.labelWrapper   = createDiv('nodeLabelWrapper');
  
    node.label          = createDiv('nodeLabel');
    node.label.node     = node;
    
    node.labelText      = createDiv('nodeLabelText');
    node.labelText.node = node;
    
    node.label       .appendChild(node.labelText);
    node.labelWrapper.appendChild(node.label);
    node.header      .appendChild(node.labelWrapper);


    node.labelWrapper.addEventListener('pointerdown', e =>
    {
        e.preventDefault();
    });

    
    node.labelWrapper.addEventListener('pointermove', e =>
    {
        if (!node.scrollName)
            return;

        const wrect      = boundingRect(node.labelWrapper);
        const margin     = 14;
        const viewMargin = margin * graphView.zoom;
        
        const x          = e.clientX - wrect.x;

             if (x <  viewMargin)               updateHeaderLabelOffset(node, 0);
        else if (x >= wrect.width - viewMargin) updateHeaderLabelOffset(node, 1);
        else if (x >= viewMargin
              && x <  wrect.width - viewMargin) updateHeaderLabelOffset(node, (x - viewMargin) / (wrect.width - viewMargin*2));
        else                                    updateHeaderLabelOffset(node);
    });


    initLabelTextbox(node);
}



function updateHeaderLabelOffset(node, f = node.labelOffsetFactor)
{
    //console.log('updateHeaderLabelOffset('+f+')');

    node.labelOffsetFactor = Math.min(Math.max(0, f), 1);

    const margin     = 15;
    const viewMargin = margin * graphView.zoom;

    const wrect      = boundingRect(node.labelWrapper);
    const rect       = boundingRect(node.label);

    const rw         = wrect.width - viewMargin*2;
    const sf         = rw / nozero(rect.width);
    const df         = viewMargin / rect.width / 2;
        
    const s1         = node.labelOffsetFactor * (rect.width - rw) / rect.width;
    const s0         = s1 - df;
    const s2         = s1 + sf;
    const s3         = s2 + df;


    if (rect.width > rw)
    {
        node.label.style.left = margin - node.labelOffsetFactor * (rect.width - rw - 1) / graphView.zoom;
        node.label.style.transform = 'translateY(calc(-50% - 0.5px))';
    }
    else
    {
        node.label.style.left = '50%';
        node.label.style.transform = 
              'translateX(-50%) '
            + 'translateY(calc(-50% - 0.5px))';
    }


    const color = 
        node.label.style.color.trim() != ''
        ? node.label.style.color
        : 'black';

    node.label.style.background = 
          'linear-gradient(90deg, '
        + '#0000 ' + (s0 * 100) + '%, '
        + color + ' ' + (s1 * 100) + '%, '
        + color + ' ' + (s2 * 100) + '%, '
        + '#0000 ' + (s3 * 100) + '%)';

    node.label.style.WebkitBackgroundClip = 'text';
    node.label.style.WebkitTextFillColor  = 'transparent';
}