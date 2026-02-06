class Rectangle{
        constructor(width,height,x,y,isTop){
                this.width=width;
                this.height=height;
                this.x=x;
                this.y=y;
                this.isTop=isTop;
        }

        area(){
                return this.width * this.height;
        }
        perimeter(){
                return 2 * (this.width + this.height);
        }

        moveLeft(){
                this.x = this.x - 1;
        }

        printAreaPerimeter(){
                console.log(`Area  = ${this.area()}`);
                console.log(`Perimeter = ${this.perimeter()}`);
        }

        static kingdom(){ // static method -  only can be called using class name
                return "Shapes";
        }
}

const rect1 = new Rectangle(10,20,30,40,true);
console.log(rect1);
rect1.moveLeft();
console.log(rect1);

rect1.printAreaPerimeter();

console.log(Rectangle.kingdom());

// rect1.kingdom();