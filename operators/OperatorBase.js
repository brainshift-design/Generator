class OperatorBase
extends Operator
{
    updateHeader()
    {
        //log(this.id + '.OperatorBase.updateHeader()');

        this.header.style.backgroundColor = colorStyleRgb_a(dataType2rgb(this._dataType, false), 0.95);

        super.updateHeader();
    }
}