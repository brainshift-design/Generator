class MenuButton
{
    name;
    menu;

    icon     = '';
    tooltip  = null;

    callback;


    div;

    divIcon;
    divArrow;



    constructor(name, menu, callback = null)
    {
        this.name     = name;
        this.menu     = menu;

        this.callback = callback;


        this.div      = createDiv('menuButton');

        this.divIcon  = createDiv('menuButtonIcon');
        this.divArrow = createDiv('menuButtonArrow');


        if (this.menu) 
        {
            this.divArrow.addEventListener('click', () => 
            {
                if (currentMenu) currentMenu.hide();
                else             this.menu.show(this.div);
            });
        }
        else if (this.callback) 
            this.divArrow.addEventListener('click', this.callback);


        this.div.appendChild(this.divIcon);

        if (this.menu)
            this.div.appendChild(this.divArrow);

        menuBar.appendChild(this.div);
    }
}