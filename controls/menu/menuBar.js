var menuMain;
var menuMath;
var menuText;
var menuColor;
var menuGeometry;



const iconRectangle = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="15" height="15" stroke="white"/></svg>';
const iconLine      = '<svg width="17" height="17" viewBox="0 1 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="0.772299" y1="15.9778" x2="15.6598" y2="1.09027" stroke="white" stroke-width="1.3"/></svg>';
const iconEllipse   = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7.5" stroke="white"/></svg>';
const iconPolygon   = '<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.82238 15.4885L10.0496 1.23853L18.2769 15.4885H1.82238Z" stroke="white"/></svg>';
const iconStar      = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.8156 2.24924L10.4021 7.13198L10.5144 7.47747H10.8776H16.0116L11.8581 10.4952L11.5642 10.7087L11.6765 11.0542L13.263 15.9369L9.10949 12.9192L8.8156 12.7057L8.5217 12.9192L4.3682 15.9369L5.9547 11.0542L6.06695 10.7087L5.77306 10.4952L1.61955 7.47747H6.75357H7.11684L7.2291 7.13198L8.8156 2.24924Z" stroke="white"/></svg>';



function initMenuBar()
{
    menuMain = new Menu('Main menu');
    menuMain.addItems([
        new MenuItem('File'),
        new MenuItem('Debug'),
        new MenuItem('Help and activation')]);
    
    
    menuMath = new Menu('Math nodes', true);
    menuMath.addItems([
        new MenuItem('Number'),
        new MenuItem('Limits'),
        new MenuItem('Add'),
        new MenuItem('Subtract'),
        new MenuItem('Multiply'),
        new MenuItem('Divide'),
        new MenuItem('Modulo'),
        new MenuItem('Exponent'),
        new MenuItem('Interpolate')]);
    
    
    menuText = new Menu('Text nodes', true);
    menuText.addItems([
        new MenuItem('Text'),
        new MenuItem('Add'),
        new MenuItem('Substring'),
        new MenuItem('Replace')]);
    
    
    menuColor = new Menu('Color nodes', true);
    menuColor.addItems([
        new MenuItem('Color'),
        new MenuItem('Validate'),
        new MenuItem('Interpolate'),
        new MenuItem('Contrast'),
        new MenuItem('Colorblind')]);
    
    
    menuGeometry = new Menu('Geometry nodes', true);
    menuGeometry.addItems([
        new MenuItem('Rectangle', iconRectangle),
        new MenuItem('Line',      iconLine     ),
        new MenuItem('Ellipse',   iconEllipse  ),
        new MenuItem('Polygon',   iconPolygon  ),
        new MenuItem('Star',      iconStar     )]);


    const btnMain     = new MenuButton('',            menuMain);
    const btnMath     = new MenuButton('',            menuMath);
    const btnText     = new MenuButton('',            menuText);
    const btnColor    = new MenuButton('',            menuColor);
    const btnGeometry = new MenuButton('',            menuGeometry);
    const btnComment  = new MenuButton('Add comment', null); // TODO add callback here
}