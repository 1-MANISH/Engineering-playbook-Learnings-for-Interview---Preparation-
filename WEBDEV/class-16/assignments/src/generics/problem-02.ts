// Problem Statement:
// Write a function createPair that takes two arguments of any type and returns a tuple with those values.

export function createPair<T1,T2>(arg1:T1,arg2:T2):[T1,T2] {
        return [arg1,arg2]
}