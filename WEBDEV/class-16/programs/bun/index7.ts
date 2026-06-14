abstract class Shape {

        abstract name:string;

        abstract area():number;

        describe():void {
                console.log(`This is a ${this.name} with an area of ${this.area()} units squared.`);
        }
}


class Rectangle extends Shape {
        name = "Rectangle";
        width:number;
        height:number;

        constructor(width:number, height:number) {
                super();
                this.width = width;
                this.height = height;
        }

        area():number {
                return this.width * this.height;
        }
}

class Circle extends Shape {
        name = 'Circle';
        radius:number;

        constructor(radius:number){
                super();
                this.radius = radius;
        }

        area():number{
                return (Math.PI * this.radius * this.radius).toFixed(2) as unknown as number;
        }
}

let rectangle1:Rectangle = new Rectangle(5, 10);
let circle1:Circle = new Circle(7);

rectangle1.describe();
circle1.describe();