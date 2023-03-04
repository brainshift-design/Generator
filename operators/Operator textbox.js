Operator.prototype.initLabelTextbox = function()
{
    this.textbox = createTextbox('nodeLabelTextbox');

    this.textbox.spellcheck     = false;
    this.textbox.keyboardFinish = false;
    


    this.textbox.addEventListener('keydown', function(e)
    {
        e.stopPropagation();


        if (   e.code == 'KeyC'
            && getCtrlKey(e))
        {
            e.preventDefault();
            document.execCommand('copy');
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


    
    // this.textbox.addEventListener('input', function()
    // {
    //     this.setValue(parseFloat(this.textbox.value));
    // });



    this.textbox.addEventListener('pointerdown', e => e.stopPropagation());
    this.textbox.addEventListener('pointermove', e => this.textbox.style.cursor = 'default');



    this.textbox.addEventListener('pointerup', e =>
    {
        e.stopPropagation();

        if (e.button == 2)
        {
            initTextMenu(this.textbox);
            menuText.showAt(e.clientX, e.clientY, false);
        }
    });



    this.textbox.addEventListener('paste', function(e)
    {
        e.preventDefault();
        this.textbox.value = e.clipboardData.getData('text/plain');
    });

    
    
    this.textbox.addEventListener('focus', () => this.textbox.keyboardFinish = false);

    
    
    this.textbox.addEventListener('focusout', function()
    {
        if (    this.textbox.value != ''
            && !this.textbox.keyboardFinish)
            this.textbox.finish(true);

            this.label.style.display = 'block';

        this.header.removeChild(this.textbox);
        this.clicked = false;
    });
    


    this.textbox.finish = function(success)
    {
        const enteredValue = this.textbox.value;
        const   savedValue = this.textbox.savedValue;

        if (success) 
        {
            if (   enteredValue != ''
                && enteredValue != savedValue)
            {
                const newName = this.textbox.value;
                setTimeout(() => this.setName(newName));
                actionManager.do(new RenameNodeAction(this.graph, this.id, newName));
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

        setTimeout(() => 
        {
            this.updateHeaderLabel();
            
            if (this.inFocus)
                this.focus();
        });
    };    
 
    
    
    this.showLabelTextbox = function()
    {
        this.inFocus = 
                hasFocus(this)
            && !this.clicked;
    
        this.textbox.style.width           = this.header.offsetWidth  - 2;
        this.textbox.style.height          = this.header.offsetHeight - 4;
        this.textbox.style.position        = 'absolute';
        this.textbox.style.left            = '50%';
        this.textbox.style.top             = '50%';
        this.textbox.style.transform       = 'translateX(-50%) translateY(-50%)';
        this.textbox.style.textAlign       = 'center';
      //this.textbox.style.boxShadow       = '0 0 0 1px #a0a inset';

        this.textbox.style.backgroundColor = this.header.style.backgroundColor;
        this.textbox.style.color           = this.label.style.color;

        this.textbox.value                 = this.name;
        this.textbox.savedValue            = this.textbox.value;
        
        this.header.appendChild(this.textbox);

        this.label.style.display           = 'none';
        
        this.updateNode();
        
        this.textbox.focus();
        this.textbox.select();
    }
}