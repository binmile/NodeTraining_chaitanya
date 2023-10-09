// const api ='https://jsonplaceholder.typicode.com/posts/1';
// fetch(api)
// .then(response =>  response.json())
// .then(item => {
//     console.log(item)
//     return item.userId})
//     .then(id=>{
//         fetch(api,{method:"Delete"})
//     })
//      .then(data=>{
//         console.log("deleted",data)
//     })

// const cart= ['laptop','earphones'];
 
// createOrder(cart)
// .then(function(orderId){
//     console.log(orderId);
//     return orderId
// })
// .catch(function(err){
//     console.log(err.message)
// })
// .then(function(orderId){
//     return proceedToPayment(orderId)
// })
// .then(function({message,amount}){
//     console.log(message,'of amount',amount)
//     return showOrderSummary(message, amount);
// })
// .then(function({message,amt}){
//     console.log('your wallet has been debited by amount', amt)
// })

// .then(function(){
//     console.log('no matter what happens i will be executed')
// })



// function createOrder(cart){
//     const pr = new Promise((resolve, reject) => {
//         if(!validateCart(cart)){
//             const err = newError('cart invalid');
//             reject(err)
//         }
//         const orderId = '12345'
//         if(orderId){
//             setTimeout(function(){
//                 resolve(orderId)
//             },5000)
//         }
//     });
//     return pr;
// }

// function proceedToPayment(orderId){
//     return new Promise(function(resolve,reject){
//         resolve({message:`payment sucess order id : ${orderId}`, amount:2500})
//     })
// }

// function showOrderSummary(paymentInfo, amt) {
//     return new Promise(function(resolve, reject) {
//       // console.log(amt);
//       if (amt >= 2000) {
//         resolve({ message: 'You have ordered items that cost ${amt} RS', amt });
//       } else {
//         reject(new Error('Please buy more for discount'));
//       }
//     })
//   }
  
//   function validateCart(cart) {
//     // code to validate cart.
//     return true;
//     // return false;
//   }
    


const http = require('http');

//create a server object:
http.createServer(function (req, res) {
    
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(3000,()=>{
    console.log('server is now running')
}); //the server object listens on port 8080

const fs = require("node:fs")
// const content = fs.readFileSync('./file.txt','utf-8')
// async
const content2 = fs.readFile('./file.txt','utf-8',(err,data)=>{
   console.log(data)
})
// console.log(content)

// flaga=> append

fs.writeFileSync('./greet.txt',' hello brother',{flag:'a'})
fs.writeFileSync('./file.txt','hello brather')

const fs2 = require('node:fs/promises')

// fs2.readFile('greet.txt','utf-8')
// .then(data => console.log(data))
// .catch(error => console.log(error))

async function readFile(){
  try{
    const data = await fs2.readFile('file.txt','utf-8')
    console.log(data)
  }
  catch(err){
    console.log(err)
  }
}

readFile();


// creating folder
// fs.mkdirSync('creatingfolder')

// creating file 
// fs.writeFileSync('creatingfolder/file.txt','Dummy data inside file');

// updating file
// fs.appendFileSync('creatingfolder/file.txt',' appended text at the end.')

// reading data 
const Data = fs.readFileSync('creatingfolder/myFile.txt','utf-8');
console.log(Data)

// rename file
// fs.renameSync('creatingfolder/file.txt','creatingfolder/myFile.txt')

// delete file
// fs.unlinkSync('file.txt');

// deleting folder
// fs.mkdirSync('Deletethis')
// fs.rmdirSync('Deletethis')