Operator.prototype.initLabelTextbox = function()
{
    this.textbox = createTextbox('nodeLabelTextbox');
    
    this.textbox.spellcheck     = false;
    this.textbox.keyboardFinish = false;
    


    this.textbox.addEventListener('keydown', e =>
    {
        e.stopPropagation();


        if (   e.code == 'KeyC'
            && getCtrlKey(e))
        {
            e.preventDefault();
            document.execCommand('copy');
        }

        // clear console
        else if (e.code == 'KeyC'
            && e.altKey)
        {
            console.clear();
        }    

        // insert separator into console
        else if (e.code == 'KeyV'
            && e.altKey)
        {
            logInsertSeparator();
        }    

        else if (e.code == 'KeyV'
              && getCtrlKey(e))
        {
            e.preventDefault();
            document.execCommand('paste');
        }
        
        else if (e.code == 'Enter'
              || e.code == 'NumpadEnter')
        {
            this.textbox.keyboardFinish = true;
            this.textbox.finish(true);
        }

        else if (e.code == 'Escape')
        {
            this.textbox.keyboardFinish = true;
            this.textbox.finish(false);
        }

        else if (e.code == 'Tab')
        {
            e.preventDefault();
            
            const tabs  = document.querySelectorAll('.node, .figmaSelect, .menuSelect #hexValue, button');
            const index = this.tabIndex;

            for (let i = 0; i < tabs.length; i++) 
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



    this.textbox.addEventListener('pointerdown', e => e.stopPropagation());
    this.textbox.addEventListener('pointermove', e => this.textbox.style.cursor = 'default');



    this.textbox.addEventListener('pointerup', e =>
    {
        e.stopPropagation();

        if (e.button == 2)
        {
            initTextMenu(this.textbox);
            menuText.showAt(e.clientX, e.clientY, false, false);
        }
    });



    this.textbox.addEventListener('dblclick', e =>
    {
        e.stopPropagation();


        // if (    this.type == PANEL
        //     || !this.canRename)
        //     return;


        if (getCtrlKey(e))
        {
            this.textbox.finish(true);

            makeSelectedNodesActive(e.shiftKey);

            if (this.deselectTimer > -1)
            {
                clearTimeout(this.deselectTimer);
                this.deselectTimer = -1;
            }
        }
    });
    


    // this.textbox.addEventListener('paste', e =>
    // {
    //     e.preventDefault();
    //     this.textbox.value = e.clipboardData.getData('text/plain');
    // });

    
    
    this.textbox.addEventListener('focus', () => this.textbox.keyboardFinish = false);

    
    
    this.textbox.addEventListener('focusout', () =>
    {
        if (    this.textbox.value != ''
            && !this.textbox.keyboardFinish)
            this.textbox.finish(true);

            this.label.style.display = 'block';

        this.labelWrapper.removeChild(this.textbox);
        this.clicked = false;
    });
    


    this.textbox.finish = success =>
    {
        const enteredValue = this.textbox.value     .trim();
        const   savedValue = this.textbox.savedValue.trim();

        if (success) 
        {
            if (   (   enteredValue != ''
                    || this.allowEmptyName) 
                && enteredValue != savedValue)
            {
                let newName = this.textbox.value;

                newName = newName
                    .split('/')
                    .map(part => part.trim())
                    .join('/');
                    
                this.labelText.innerHTML = newName;
                actionManager.do(new RenameNodeAction(this.id, newName));
            }
        }
        else
            this.textbox.value = this.textbox.savedValue;


        this.textbox.dispatchEvent(new CustomEvent('finishedit', { 'detail': {
            'success':  success,
            'value':    enteredValue,
            'oldValue': savedValue }}));
    

        this.textbox.blur();
        
        this.label.style.display = 'block';


        this.updateMeasureData();

        
        setTimeout(() => 
        {
            //this.updateHeaderLabel();
            
            if (this.inFocus)
                this.div.focus({preventScroll: true});
        });
    };    
};



Operator.prototype.showLabelTextbox = function()
{
    this.inFocus = 
            hasFocus(this.div)
        && !this.clicked;

    this.textbox.style.width           = this.header.offsetWidth  - 20;
    this.textbox.style.height          = this.header.offsetHeight - 4;
    this.textbox.style.position        = 'absolute';
    this.textbox.style.left            = '50%';
    this.textbox.style.top             = '50%';
    this.textbox.style.transform       = this.type == COMMENT ? 'translateX(-50%) translateY(-2px)' : 'translateX(-50%) translateY(-50%)';
    this.textbox.style.textAlign       = 'center';
    this.textbox.style.margin          = '0 10px 0 0px';
    this.textbox.style.borderRadius    = '2px 2px 0 0';
    this.textbox.style.boxShadow       = 'none';

    this.textbox.style.backgroundColor = 'transparent';
    this.textbox.style.color           = this.label.style.color;

    this.textbox.value                 = this.name;
    this.textbox.savedValue            = this.textbox.value;
    
    this.labelWrapper.appendChild(this.textbox);

    this.label.style.display           = 'none';
    
    this.updateNode();
    
    this.textbox.focus({preventScroll: true});
    this.textbox.select();
};
