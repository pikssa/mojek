/*Task 3: JavaScript

Extract Maximum number from string

Example

Input:
S = 200klh164abc465bg
Output: 465
Explanation: Maximum numeric value 
among 200, 164 and 465 is 465.
 */


function maximumNumberFromString(S){
    let arr=[],str=""
for(let i=0;i<=S.length;i++){
if(!isNaN(Number(S[i]))){
    str+=S[i]
}else{
if(str!=="")arr.push(Number(str))
str=""
}
}
return Math.max(...arr)
}
let S ="200klh164abc465bg"
console.log(maximumNumberFromString(S))