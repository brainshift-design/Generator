function showVariableNullsDialog()
{
    variableNullsDialog.style.left      = '50%';
    variableNullsDialog.style.top       = '50%';
    variableNullsDialog.style.transform = 'translateX(-50%) translateY(-50%)';

    
    variableNullsTitle.buttonDown0      = false;
    
    variableNullsTitle.moveStart        = point_NaN;
    variableNullsTitle.pStart           = point_NaN;
    

     numberVarNullIcon.innerHTML = iconSmallVarNumber .replaceAll('white', 'var(--figma-color-text-secondary)');
    booleanVarNullIcon.innerHTML = iconSmallVarBoolean.replaceAll('white', 'var(--figma-color-text-secondary)');
     stringVarNullIcon.innerHTML = iconSmallVarText   .replaceAll('white', 'var(--figma-color-text-secondary)');
      colorVarNullIcon.innerHTML = iconSmallVarColor  .replaceAll('white', 'var(--figma-color-text-secondary)');

      numberVarNullInput.value   = numToString (settings.numberVarNullValue );
     booleanVarNullInput.value   = boolToString(settings.booleanVarNullValue);
      stringVarNullInput.value   = settings.stringVarNullValue;
       colorVarNullInput.value   = settings.colorVarNullValue;

    numberVarNullInput.parseFunc = str => parseFloat(str).toString();
    stringVarNullInput.parseFunc = str => str.trim();
     colorVarNullInput.parseFunc = str => rgb2hex(hex2rgb(str));


    initVarNullInput( numberVarNullInput, 'numberVarNullValue');
  //initVarNullInput(booleanVarNullInput, 'booleanVarNullValue');
    initVarNullInput( stringVarNullInput, 'stringVarNullValue');
    initVarNullInput(  colorVarNullInput, 'colorVarNullValue');

    showDialog(variableNullsDialog);
      
      
    //numberVarNullInput.select();
    //window.setTimeout(() => document.getElementById("numberVarNullInput").focus(), 0);
}



variableNullsClose.addEventListener('pointerdown', e => e.stopPropagation());



variableNullsTitle.addEventListener('pointerdown', e => 
{
    variableNullsTitle.setPointerCapture(e.pointerId);
    variableNullsTitle.buttonDown0 = true;

    variableNullsTitle.moveStart = point(variableNullsDialog.offsetLeft, variableNullsDialog.offsetTop);
    variableNullsTitle.pStart    = point(e.clientX, e.clientY);
});



variableNullsTitle.addEventListener('pointermove', e =>
{
    if (variableNullsTitle.buttonDown0)
    {
        variableNullsDialog.style.left = (variableNullsTitle.moveStart.x + (e.clientX - variableNullsTitle.pStart.x)) + 'px';
        variableNullsDialog.style.top  = (variableNullsTitle.moveStart.y + (e.clientY - variableNullsTitle.pStart.y)) + 'px';
    }
});



variableNullsTitle.addEventListener('pointerup', e =>
{
    variableNullsTitle.buttonDown0 = false;
    variableNullsTitle.releasePointerCapture(e.pointerId);
});



function initVarNullInput(input, setting)
{
    input.addEventListener('keydown', e => 
    {
        e.stopPropagation();

        switch (e.code)
        {
            case 'Enter':
            case 'NumpadEnter':
                input.blur();
                break;
        }
    });
    
    
    input.addEventListener('focusout', e => 
    {
        variableNullSave(input, setting);
    });
    
    
    input.addEventListener('pointerup', e =>
    {
        e.stopPropagation();
    
        if (e.button == 2)
        {
            initTextMenu(input);
            menuText.showAt(e.clientX, e.clientY, false, false);
        }
    });
}



function variableNullSave(input, setting)
{
    const inputValue = input.parseFunc(input.value);

    if (!isNaN(inputValue))
    {
        updateSetting(setting, inputValue);
        uiSetLocalData(setting, settings[setting]);
    }
}