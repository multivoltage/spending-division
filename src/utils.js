const Calculator = {
    
    AmountForPeople(things,people){

        if(this.price === ''){
            return 0;
        }
        let totalForSingle = 0;

        things.forEach((thing) => {
            let partecipantCount = thing.partecipants.length;
            let quantity = thing.quantity;
            if(thing.partecipants.includes(people.name)){
                totalForSingle += (thing.price * thing.quantity) / partecipantCount;
            }
        });
        
        return Math.round(totalForSingle* 100) / 100;
    }
}

export default Calculator;