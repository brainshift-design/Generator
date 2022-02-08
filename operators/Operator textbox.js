function initLabelTextbox(node)
{
    node.textbox = createTextbox('nodeLabelTextbox');
    node.textbox.spellcheck = false;
    


    node.textbox.addEventListener('keydown', function(e)
    {
        e.stopPropagation();


        if (   e.code == 'KeyC'
            && getCtrlKey(e))
        {
            e.preventDefault();
            document.execCommand("copy");
        }

        else if (e.code == 'KeyV'
              && getCtrlKey(e))
        {
            e.preventDefault();
            document.execCommand("paste");
        }
        
        else if (e.code == 'Enter'
              || e.code == 'NumpadEnter')
        {
            if (!graph.nodes.find(n => n.id == node.textbox.value))
                node.textbox.finish(true);
        }

        else if (e.code == 'Escape')
            node.textbox.finish(false);

        else if (e.code == 'Tab')
        {
            e.preventDefault();
            
            var tabs  = document.querySelectorAll('.node, .figmaSelect, .menuSelect #hexValue, button');
            var index = node.tabIndex;

            for (var i = 0; i < tabs.length; i++) 
            {
                if (   e.shiftKey && tabs[i].tabIndex == index - 1
                    ||               tabs[i].tabIndex == index + 1) 
                {
                    if (tabs[i].className == 'node')
                        tabs[i].showTextbox();
                    else 
                    {
                        document.activeElement.blur();
                        tabs[i].focus();
                    }

                    break;
                }
            }
        }

        else if (e.key == 'Alt')
            e.preventDefault();
    });


    
    // node.textbox.addEventListener('input', function()
    // {
    //     node.setValue(Number(node.textbox.value));
    // });



    node.textbox.addEventListener('pointerdown', e => e.stopPropagation());
    node.textbox.addEventListener('pointermove', e => node.textbox.style.cursor = 'default');



    node.textbox.addEventListener('paste', function(e)
    {
        e.preventDefault();

        var val = parseFloat(e.clipboardData.getData('text/plain'));
        val = Math.min(Math.max(node.min, val), node.max);

        node.textbox.value = isNaN(val) ? '' : val;
    });

    
    
    node.textbox.addEventListener('focusout', function()
    {
        if (node.textbox.value != '')
            node.setName(node.textbox.value); // this is good UX

        node.label.style.display = 'block';

        node.header.removeChild(node.textbox);
        node.clicked = false;
    });
    


    node.textbox.finish = function(success)
    {
        if (success) 
        {
            if (node.textbox.value != '')
            {
                const newName = graph.getNewNodeName(node.name, node.textbox.value);
                setTimeout(() => node.setName(newName));
                actionManager.do(new RenameNodeAction(node.id, newName));
            }
        }
        else
            node.textbox.value = node.textbox.savedValue;

        node.textbox.blur();
        
        node.label.style.display = 'block';

        if (node.inFocus)
            node.focus();

        setTimeout(() => updateNodeLabel(node));
    };    
 
    
    
    node.showLabelTextbox = function()
    {
        node.inFocus = 
                node == document.activeElement
            && !node.clicked;
    
        node.textbox.style.width           = node.header.offsetWidth  - 2;
        node.textbox.style.height          = node.header.offsetHeight - 4;
        node.textbox.style.position        = 'absolute';
        node.textbox.style.left            = '50%';
        node.textbox.style.top             = '50%';
        node.textbox.style.transform       = 'translateX(-50%) translateY(-50%)';
        node.textbox.style.textAlign       = 'center';

        node.textbox.style.backgroundColor = node.header.style.backgroundColor;
        node.textbox.style.color           = node.label.style.color;

        node.textbox.value                 = node.name;
        node.textbox.savedValue            = node.textbox.value;
        
        node.header.appendChild(node.textbox);

        node.label.style.display           = 'none';
        
        node.textbox.focus();
        node.textbox.select();
    }
}