// function multi(a,b){
//     return a*b;

// }
// var multi=function(a,b){
//     return a*b;
// }

// var multi=(a,b)=> {
//     return a*b;
// }
// var multi=(a,b)=>a*b;
// var a=5,b=6;
// var res=multi(a,b);
// console.log(res);

// // Callback function
// const callback = () => {
//     console.log("Adding successfully");
// };

// // Function that accepts a callback
// const add = (a, b, callback) => {
//     console.log(a + b);
//     callback(); // Invoke the callback
// };

// // Call the add function with numbers and a callback
// add(5, 3, callback);
// /// function calling in ither sy=tyle

// add(a,b,()=>{
//     console.log("callback using arrow function");
// })


//////////////////////modules
// const fs = require('fs'); // File system module
// const os = require('os'); // Operating system module
// const _=require('lodash');
// //  konow what function in module/lib print module i.e console.log('fs');

// // Get user information
// const user = os.userInfo();
// console.log(user);
// // console.log(user.username);

// // Content to write to the file
// const fileContent = `
// #include<iostream>
// using namespace std;

// int main() {
//     cout << "HELLO ";
//     return 0;
// }
// `;

// // Append or create the file
// // fs.appendFile('newfile.cpp', fileContent, (err) => {
// //     if (err) {
// //         console.error('Error writing to the file:', err);
// //     } else {
// //         console.log('File written successfully!');
// //     }
// // });
// var list=["anand","anand",1 ,2, 1, 'apple'];
// console.log(_.uniq(list));


// Route to send a C++ file
// app.get('/download-cpp', (req, res) => {
//     const filePath = path.join(__dirname, 'newfile.cpp'); // Replace with your C++ file path
//     res.download(filePath, 'newfile.cpp', (err) => { // 'example.cpp' is the name the client will see
//         if (err) {
//             console.error('Error sending file:', err);
//             res.status(500).send('Error occurred while sending the file.');
//         }
//     });
// });

// app.get('/',(req,res)=>{
//     res.send("hello from server side");
// })

// app.get('/anand/hi',(req,res)=>{
//     var obj={
//         "name":"anand",
//         "age":18,
//         "is_not":true

//     }
//     res.send(obj);
// })

// const express = require('express');
// const path = require('path');

// const app = express();
// const db=require('./db')

// const bodyParser=require('body-parser')
// app.use(bodyParser.json());//middleware (here this middleware stores data in req.body )

// const Person=require('./models/person');
// app.get('/',(req,res)=>{
//     app.send("hello from server side");
// })

// // this methods is not in use nowadays
// // app.post('/person',(req,res)=>{

// //     const data = req.body// rqquest body contains person data
    
// //     //create  a new person doc using the mongoose model
// //     const newPerson = new Person(data);// given below in expand verson
// //     // newPerson.name=data.name;
// //     // newPerson.age=data.age; //methods
// //     // newPerson.mobile=data.mobile;
// //     // newPerson.email=data.email;

// //     newPerson.save((error,savedPerson)=>{
// //        if(error){
// //         console.log('Error saving person: ',error);
// //         res.status(500).json({error:'Internal server error'})

// //        } 
// //        else{
// //         console.log('data saved succsesfulyly')
// //         res.status(200).json(savedPerson);
// //        }
// //     })
    
// // })

// app.post('/person',async(req,res)=>{
//     try{
//         const data = req.body
//         const newPerson = new Person(data); //create  a new person doc using the mongoose model

//         const response= await newPerson.save();
//         console.log('data saved')
//         res.status(200).json(response)

//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json({error:'Interal Server Error'})

//     }
    
    
    
//     // given below in expand verson
//     // newPerson.name=data.name;
//     // newPerson.age=data.age; //methods
//     // newPerson.mobile=data.mobile;
//     // newPerson.email=data.email;

   
    
// })

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is listening on http://localhost:${PORT}`);
// });



//final code 
const express = require('express');
const path = require('path');
const mongoose = require('./db'); // Ensure './db' is correctly implemented
const Person = require('./models/person');

const MenuItem=require('./models/menu');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("Hello from server side");
});


// send data to client from ur database 
// app.get('/person',async(req,res)=>{
//     try{
//         const data =await Person.find();
//         console.log('data fetched');
//         res.status(200).json(data);

//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal Server Error'});


//     }
// })

// send data of person from client side and save it to database

// app.post('/person', async (req, res) => {
//     try {
//         const data = req.body;
//         console.log('Received data:', data);
//         const newPerson = new Person(data);
//         const response = await newPerson.save();
//         console.log('Data saved successfully:', response);
//         res.status(200).json(response);
//     } catch (err) {
//         console.error('Error saving person:', err.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// send menu
// send data from client side and save it to database



//parametrized api
// app.get('/person/:workType',async(req,res)=>{
//     try{
//         const workType = req.params.workType; //  extract the work type from the url parameter
//         if(workType =='chef' || workType == 'manager' || workType =='waiter'){

//             const response = await Person.find({work : workType})
//             console.log('response fetched')
//             res.status(200).json(response);
//         }
//         else{
//             res.status(404).json({error:'Invalid Server Error '})
//         }
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error : 'Invalid Server Error'})
        
//     }
// })


// import  router

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');



// Use routes
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});

