const EventEmitter = require('events')
const emitter = new EventEmitter()
emitter.on('order-pijja',(size,topping)=>{console.log(`order received baking a ${size} ${topping} pijja`);
});



emitter.on('order-pijja',(size)=> {if (size==='large'){
    console.log('serving complimentary drink')
}})
emitter.emit('order-pijja','small    ','chicken');

