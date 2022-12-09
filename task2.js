/*Task 2: JavaScript

Given non-zero two integers N and M. The problem is to find the number closest to N and divisible by M. If there are more than one such number, then output the one having maximum absolute value.

Example 

Input:
N = 13 , M = 4

Output:
12
Explanation:
12 is the Closest Number to
13 which is divisible by 4.*/


function closestNumber(N,M){

return Math.round(N/M)*M

}
let N = 13 , M = 5
console.log(closestNumber(N,M))