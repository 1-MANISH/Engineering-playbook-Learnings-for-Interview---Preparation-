// assignment

function first_element(arr:number[]):number | null {
        if (arr.length > 0){
                return arr[0] ?? null;// number or can be undefined, so we use nullish coalescing operator to return null if arr[0] is undefined
        }
        else{
                return null;
        }
}

let arr1 = [1, 2, 3];
let element1:any= first_element(arr1);
console.log(element1); // Output: 1
