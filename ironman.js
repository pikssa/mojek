/*Problem: Ironman's legacy in trouble
Task:
The naive method involves taking an array of numbers filled with zeros and adding the number received for the range of indexes.
But with millions of planets sending numbers, this approach is not viable.
You should design a data structure to handle this range of indexes better.

*/

function findTheRange(n,arr){
let a
let array=new Array(n).fill(0)
for(let i=0;i<arr.length;i++){
    a=arr[i]
    for(let j=a[0];j<a[1];j++){
        array[j]= array[j]+a[2]
    }
}
let array1=new Array(arr[0].length).fill(0)
let max=-Infinity
for(let i=0;i<array.length;i++){
    if(array[i]>max){
        max=array[i]
        array1[2]=max
    }
    if(array[i]!=0&&array1[0]==0){
        array1[0]=i+1
    }
    if(array[i]==max){
        array1[1]=i+1
    }
}
return array1
}




console.log("******result**********",findTheRange(5,[[2, 4, 5], [1, 3, 6], [2, 4, 7]]))