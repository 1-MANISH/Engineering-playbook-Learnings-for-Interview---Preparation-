class MyPromise{

        constructor(executor){

                this.executor = executor
                this.state = "pending"
                this.value = null
                this.successCallback = null
                this.errorCallback = null
                this.finallyCallback = null

                if(!(executor instanceof Function)){
                        throw new Error("Executor should be a function")
                }

                const resolveFunction = (data) =>{
                        if(this.state !== "pending"){
                                return
                        }
                        this.state = "fulfilled"
                        this.value = data

                        if(this.successCallback){
                                this.successCallback(this.value)
                        }

                        if(this.finallyCallback){
                                this.finallyCallback()
                        }
                }
                const rejectFunction = (err) =>{

                        if(this.state !== "pending"){
                                return
                        }
                        this.state = "fulfilled"
                        this.value = err

                        if(this.errorCallback){
                                this.errorCallback(this.value)
                        }

                        if(this.finallyCallback){
                                this.finallyCallback()
                        }
                }

                executor(resolveFunction,rejectFunction)
        }


        myThen(someThing){

                if(someThing instanceof Function){
                        this.successCallback = someThing;

                        if(this.state === "fulfilled"){
                                this.successCallback(this.value)
                        }
                }

                return this

        }
        myCatch(someThing){

                if(someThing instanceof Function){
                        this.errorCallback = someThing;

                        if(this.state === "rejected"){
                                this.errorCallback(this.value)
                        }
                }
                return this
        }
        myFinally(someThing){

                if(someThing instanceof Function){
                        this.finallyCallback = someThing;

                        if(this.state !== "pending"){
                                this.finallyCallback()
                        }
                }
        }
}

const myPromise = new MyPromise((resolve,reject)=>{
        reject("Error in promise");
});

myPromise.myThen((data)=>{
        console.log(data)
}).myCatch((err)=>{
        console.log(err)
}).myFinally(()=>{
        console.log("Finally called")
})