let EventList = [];

function $on(EventName,callback){
    if(!EventList[EventName]){
        EventList[EventName] = [];
    }
    EventList[EventName].push(callback);
}

function $emit(EventName,params){
    if(EventList[EventName]){
        var arr = EventList[EventName];
        arr.map((cb)=>{
            cb(params);
        })
    }
}

function $off(EventName,callback){
    if(EventList[EventName]){
        if(callback){
            let index = EventList[eventName].indexOf(callback);
            EventList[eventName].splice(index,1);
        }else{
            EventList[eventName].length = 0;
        }
    }
}

export default {
    $on,
    $emit,
    $off
}