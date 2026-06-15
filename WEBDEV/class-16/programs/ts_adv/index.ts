
// WAY-1
type KeyInput = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';


// WAY-2
// enum Direction {
//         UP,// 0
//         DOWN,//1
//         LEFT,//2
//         RIGHT//3
// }

// enum Direction {
//         UP=1,
//         DOWN,//2
//         LEFT,//3
//         RIGHT//4
// }

enum Direction {
        UP = 'UP',
        DOWN = 'DOWN',
        LEFT = 'LEFT',
        RIGHT = 'RIGHT'
}
function keyPressed(direction:Direction){
        console.log(direction);

        if(direction === Direction.UP){
                console.log('Moving up');
        }else if(direction === Direction.DOWN){
                console.log('Moving down');
        }else if(direction === Direction.LEFT){
                console.log('Moving left');
        }else if(direction === Direction.RIGHT){
                console.log('Moving right');
        }
}

keyPressed(Direction.UP);
keyPressed(Direction.DOWN);
keyPressed(Direction.LEFT);
keyPressed(Direction.RIGHT);

enum ResponseStatus{
        SUCCESS = 200,
        NOT_FOUND = 404,
        SERVER_ERROR = 500
}

function handleResponse(status:ResponseStatus){
        if(status === ResponseStatus.SUCCESS){
                console.log('Request was successful');
        }else if(status === ResponseStatus.NOT_FOUND){
                console.log('Resource not found');
        }else if(status === ResponseStatus.SERVER_ERROR){
                console.log('Server error occurred');
        }
}

handleResponse(ResponseStatus.SUCCESS);