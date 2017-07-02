const Calculator = {
    
    AmountForPeople(things,people){
        let totalForSingle = 0;

        things.forEach((thing) => {
            let partecipantCount = thing.partecipants.length;
            if(thing.partecipants.includes(people.name)){
                totalForSingle += thing.price / partecipantCount;
            }
        });
        
        return totalForSingle;
    }
}

export default Calculator;