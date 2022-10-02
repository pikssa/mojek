/*Problem: Superman and Bottle City of Kandor 

Task:
You must write a function or method to find the suitable planet around an appropriate red star. 
To do so, you need to find the energy output that a world receives from the home star/stars. 
In some solar systems, there can be more than one star. 
The energy a planet gets is computed by adding the output received from each star in the system.
The energy a world gets from one star is calculated by multiplying the star's energy output with the inverse of the distance.
*/



function findPlanet(arr,n){
let a,sum=0
let array=new Array(arr.length).fill(0)
for(let i=0;i<arr.length;i++){
    a=arr[i],sum=0
    for(let j=0;j<a.length;j++){
        sum+=(a[j][0]/a[j][1])
    }
    array[i]=sum
}

for(let i=0;i<array.length;i++){
    if(n[0]<=array[i]&&n[1]>=array[i]){
       return i
    }
}
return "there is no planet within the range"}




console.log("******result**********",findPlanet([[[0.433, 200]], [[0.89, 400], [0.6, 300]]],[0.003, 0.005]))