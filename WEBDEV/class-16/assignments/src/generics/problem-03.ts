// Problem Statement:
// Write a function mergeObjects that merges two objects and returns a new object with all properties.

export function mergeObjects<T1,T2>(obj1:T1,obj2:T2) : T1 & T2 {
        return {...obj1,...obj2}
}