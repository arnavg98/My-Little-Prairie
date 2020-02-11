import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Path;
import android.graphics.Region;
import android.util.AttributeSet;
import android.view.View;

public class HexDraw extends View {
    private Path hexagonPath; //the inner edge of our hexagon
    private Path hexagonBorderPath; //the outer edge
    private float radius;
    private float width, height;
    private int maskColor; // a color for now

    // creates the hexagon with something in mind like board size or something
    public HexDraw(Context context) {
        super(context);
        init();
    }

    // initializes the new paths and a default color
    private void init() {
        hexagonPath = new Path();
        hexagonBorderPath = new Path();
        maskColor = 0xFF01FF77;
    }

    // java setter for radius
    public void setRadius(float r) {
        this.radius = r;
        calculatePath();
    }

    // gives it a color (probably doesn't matter until got to images)
    public void setMaskColor(int color) {
        this.maskColor = color;
        invalidate();
    }

    // builds the main shape specified by radius, width, height
    private void calculatePath() {
        float triangleHeight = (float) (Math.sqrt(3) * radius / 2); // using triangular locator to help build paths in the correct locations
        float centerX = width/2; //center of the hex a gon so we can stagger them later
        float centerY = height/2; // may want to make center a characteristic of a hex later for ease
        hexagonPath.moveTo(centerX, centerY + radius);
        hexagonPath.lineTo(centerX - triangleHeight, centerY + radius/2);
        hexagonPath.lineTo(centerX - triangleHeight, centerY - radius/2);
        hexagonPath.lineTo(centerX, centerY - radius);
        hexagonPath.lineTo(centerX + triangleHeight, centerY - radius/2);
        hexagonPath.lineTo(centerX + triangleHeight, centerY + radius/2);
        hexagonPath.moveTo(centerX, centerY + radius);

        float radiusBorder = radius - 5;
        float triangleBorderHeight = (float) (Math.sqrt(3) * radiusBorder / 2);
        hexagonBorderPath.moveTo(centerX, centerY + radiusBorder);
        hexagonBorderPath.lineTo(centerX - triangleBorderHeight, centerY + radiusBorder/2);
        hexagonBorderPath.lineTo(centerX - triangleBorderHeight, centerY - radiusBorder/2);
        hexagonBorderPath.lineTo(centerX, centerY - radiusBorder);
        hexagonBorderPath.lineTo(centerX + triangleBorderHeight, centerY - radiusBorder/2);
        hexagonBorderPath.lineTo(centerX + triangleBorderHeight, centerY + radiusBorder/2);
        hexagonBorderPath.moveTo(centerX, centerY + radiusBorder);
        invalidate();
    }

    @Override
    // default settings of the hexagon
    public void onDraw(Canvas c){
        super.onDraw(c);
        c.clipPath(hexagonBorderPath, Region.Op.DIFFERENCE);
        c.drawColor(Color.WHITE);
        c.save();
        c.clipPath(hexagonPath, Region.Op.DIFFERENCE);
        c.drawColor(maskColor);
        c.save();
    }

    // getting the view size and default radius
    @Override
    public void onMeasure(int widthMeasureSpec, int heightMeasureSpec){
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        width = MeasureSpec.getSize(widthMeasureSpec);
        height =  MeasureSpec.getSize(heightMeasureSpec);
        radius = height / 2 - 10;
        calculatePath();
    }
}