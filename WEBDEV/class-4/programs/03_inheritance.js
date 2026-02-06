class Triangle{
        constructor(base,height){

                // console.log('MAIN CLASS');
                this.base = base;
                this.height = height;
        }

        area(){
                return 0.5 * this.base * this.height;
        }
}

class Isosceles extends Triangle{
        constructor(base,height){
                super(base,height);
        }
}

class Equilateral extends Triangle{
        constructor(side){
                super(side,side);
        }
}


class RightAngleTriangle extends Triangle{
        constructor(base,height,hypothenuse){
                super(base,height);
                // console.log('SUB CLASS');
                this.hypothenuse = hypothenuse;
        }

}


const rightAngleTriangle = new RightAngleTriangle(3,4,5);
console.log(rightAngleTriangle.area());