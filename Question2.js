// Write a program to calculate the Commission of any given input.

// Table for Range Data

// Final Working should be:

// Algorithms:
// • Put the data as array object or array-of-arrays .

// - From To Commission
// 0 $1 $400 5%
// 1 $401 $800 4%
// 2 $801 $1200 3%
// 3 $1201 $9000 2%
// 4 $9001 $15000 1%

function calculateCommission(string){
    string=string.split("$")
    let Commission,getAmount,remaining
    if(Number(string[1])>=1&&Number(string[1])<=400){
        Commission=5
    }
    if(Number(string[1])>=401&&Number(string[1])<=800){
        Commission=4
    }
    if(Number(string[1])>=801&&Number(string[1])<=1200){
        Commission=3
    }
    if(Number(string[1])>=1201&&Number(string[1])<=9000){
        Commission=2
    }
    if(Number(string[1])>=9001&&Number(string[1])<=12000){
        Commission=1
    }
    getAmount=(Commission*Number(string[1]))/100
    remaining=Number(string[1])-getAmount

    return `Your commission rate is ${Commission}% you will get $${getAmount} and remaining amount is $${remaining}`

    
}
let input1="$589"
console.log("result1","======>",calculateCommission(input1))

let input2="$12452"
console.log("result2","======>",calculateCommission(input2))