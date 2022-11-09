// Write a program to give the following output for the given input

// The number can be varies from 1 to 99.
// The letters can be varies from a to z (or) A to Z.

// Algorithms can be used:
// • Recursive Function Algorithms. (or)
// • Nested Looping Algorithms.
// On examining any value will be inputted and tested accordingly.
// Example 1:
// Input: C1e7h3P4k11
// Output: CeeeeeeehhhPPPPkkkkkkkkkkk
// Example 2:
// Input: b3c6M4d15
// Output: bbbccccccMMMMddddddddddddddd


function convertString(string){
    let i=0,j=1,str="",str2=""
    while(j<string.length){
        //string[i]
        str=""
            while(!isNaN(Number(string[j]))){
                str+=string[j]
                j++
            }
            if(Number(str)<=99&&Number(str)>=1)
            {for(let k=0;k<Number(str);k++){
                str2+=string[i]
            }
                
            }
            i=j
            j++
    }
    return str2
}

let input1="C1e7h3P4k11"
console.log("result1","==========>",convertString(input1))

let input2="b3c6M4d15"
console.log("result2","==========>",convertString(input2))