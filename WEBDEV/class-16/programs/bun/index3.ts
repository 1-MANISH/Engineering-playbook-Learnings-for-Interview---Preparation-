

function lateCall (fn :() => void,delay:number){
        setTimeout(fn,delay)
}

function callMe():void{
        console.log("Called after 2 seconds")
}

lateCall(callMe,2000)
