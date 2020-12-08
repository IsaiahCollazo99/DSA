// At Thumbtack, we automatically charge Pros for customer requests that match their availability, so we need to provide a system for pros to block off the times that they're busy. In order to do this, we allow Pros to maintain a calendar on Thumbtack where they can add Events denoting when they're busy.

// Design and implement a class that powers the Pro calendar availability system. It should support the following:
// 1. Add an Event (regardless of any potential conflicts)
// 2. Retrieve an Event's details based on some unique ID
// 3. Delete an Event based on ID
// 4. Compute isSlotFree: Given a customer request with a start date/time and end date/time, return whether the pro is free to take that request.

process.stdin.resume();
process.stdin.setEncoding('ascii');

class Event {
    constructor( startDate, endDate, id ) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.id = id;
    }
}

class ProCalendar {
    constructor() {
        this.events = {
            eventsAdded: 1
        };
    }
    
    addEvent( startDate, endDate ) {
        const { eventsAdded } = this.events
        const id = eventsAdded
        
        const newEvent = new Event(startDate, endDate, id);
        this.events[id] = newEvent;
        this.events.eventsAdded++;
    }
    
    retrieveEvent( id ) {
        return this.events[id] ? this.events[id] : null; 
    }
    
    deleteEvent( id ) {
        delete this.events[id]
        
        return this.events;
    }
    
    isSlotFree( startDate, endDate ) {
        let isFree = true;
        
        for(let id in this.events) {
            const event = this.events[id];
            const { startDate: eventStart, endDate: eventEnd } = event;
            
            if(eventStart.getTime() <= startDate.getTime() && eventEnd.getTime() >= startDate.getTime()) {
                isFree = false;
                break;
            }
            
            if(eventStart.getTime() <= endDate.getTime() && eventEnd.getTime() >= endDate.getTime()) {
                isFree = false;
                break;
            }
            
            if(eventStart.getTime() >= startDate.getTime() && eventEnd.getTime() <= endDate.getTime()) {
                isFree = false;
                break;
            }
        }
        
        return isFree;
    }
}

const newCalendar = new ProCalendar();
console.log(newCalendar.events);
newCalendar.addEvent(new Date("12/6/2020"), new Date("12/12/2020"));
newCalendar.addEvent(new Date(), new Date("12/15/2020")); // ID 1
// console.log(newCalendar.isSlotFree(new Date("12/2/2020"), new Date("12/3/2020"))); // should be true
// console.log(newCalendar.isSlotFree(new Date("12/5/2020"), new Date("12/14/2020"))); // should be false
// newCalendar.addEvent(new Date(), new Date("12/12/2020")); // ID 2
// newCalendar.deleteEvent(1);
// newCalendar.addEvent(new Date(), new Date("12/12/2020")); // ID 2