/*Problem: Bat programmer in Arkham City needs to help BatMan capture asylum escapees
Task:
In your job as a Bat programmer, you need to write a function/method to find out how many steps 
it requires for Batman to tag every so Asylum staff can pick them up. 
Tagging involves reaching the patient and returning to the asylum to hand over the tag injector and pick up a new one. 
Assume Batman can run at infinite steps in the time requiring the patient one to take one step. 
In other words, he can tag all the patients in the same instance but must make it to each patient.

*/


function NumOfStepsRequired(p1,p2) {
    return p1*p2;
     }
     
console.log("******result**********",NumOfStepsRequired(3,10));
