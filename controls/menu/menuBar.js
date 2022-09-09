var menuMain;
var menuMath;
var menuText;
var menuColor;
var menuGeometry;


function initMenuBar()
{
    menuMain = new Menu('Main menu');
    menuMain.addItems([
        new MenuItem('File'),
        new MenuItem('Debug'),
        new MenuItem('Help and activation')]);
    
    
    menuMath = new Menu('Math nodes');
    menuMath.addItems([
        new MenuItem('Limits'),
        new MenuItem('Add'),
        new MenuItem('Subtract'),
        new MenuItem('Multiply'),
        new MenuItem('Divide'),
        new MenuItem('Modulo'),
        new MenuItem('Exponent'),
        new MenuItem('Interpolate')]);
    
    
    menuText = new Menu('Text nodes');
    menuText.addItems([
        new MenuItem('Text'),
        new MenuItem('Add'),
        new MenuItem('Substring'),
        new MenuItem('Replace')]);
    
    
    menuColor = new Menu('Color nodes');
    menuColor.addItems([
        new MenuItem('Color'),
        new MenuItem('Validate'),
        new MenuItem('Interpolate'),
        new MenuItem('Contrast'),
        new MenuItem('Colorblind')]);
    
    
    menuGeometry = new Menu('Geometry nodes');
    menuGeometry.addItems([
        new MenuItem('Rectangle'),
        new MenuItem('Line'),
        new MenuItem('Ellipse'),
        new MenuItem('Polygon'),
        new MenuItem('Star')]);


    const btnMain     = new MenuButton('',            menuMain);
    const btnMath     = new MenuButton('',            menuMath);
    const btnText     = new MenuButton('',            menuText);
    const btnColor    = new MenuButton('',            menuColor);
    const btnGeometry = new MenuButton('',            menuGeometry);
    const btnComment  = new MenuButton('Add comment', null); // TODO add callback here
}