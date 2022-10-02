/*Problem: Groot's pie finder

Task:
You must write a function or method that returns which pies Groot has to consume to get the right amount of sweetness.
 */



function findPies(arr,n){
    
    let val = 0,resultArray=[]
        for(let i =0 ; i<arr.length; i++){
            if((val + arr[i]) <= n){
                resultArray.push(i) ;
                val += arr[i];
            }
        }
   return resultArray
}

console.log("******result***1**********",findPies([1, 2, 3, 2, 1], 6))

console.log("******result***2**********",findPies([8, 4, 3, 2, 6, 5], 6))