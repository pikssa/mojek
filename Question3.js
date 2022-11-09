//input :“virat sachin dhoni virat rahul virat rahul sachin ”
//Output:
// virat : 3
// sachin : 2
// dhoni : 1
// rahul : 2


function frquencyOfWord(string){
string=string.split(" ")
let map=new Map()
for(let i=0;i<string.length;i++){
    map.set(string[i].trim(),(map.get(string[i].trim())||0)+1)
}
let str=""
for(let el of map){
str+=el[0]+":"+el[1]
str+="\n"
}
return str
}
let input="virat sachin dhoni virat rahul virat rahul sachin"
console.log(frquencyOfWord(input))