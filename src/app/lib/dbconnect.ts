import mongoose from "mongoose"


//so basic ts ka use krenge spse pehle ek type bnayenge ki kya db connect hua hai so upko woh optional wala syntax use krna pdega jo pdha tha

type ConnectionObject = {
    isConnected?:number;
}


const connection : ConnectionObject = {} 
//ab yeh kya hai , yeh bol rha hai ki connection object hai woh hmesha jo upar humne bnaya hai na connectionObject usko follow krega aur humne isse as an empty object assign kiya hai jo hum kr skte hai kyonki upar optional type ka use kiya hai

//now db ka connection ek async function hai so likhte hai ab

async function dbConnect(): Promise<void>{
    //dbconnect ek function hai jo ki ek promise return krega jiska type void hoga
    //agar db se already connected hai toh kya kru ??

    if(connection.isConnected){
        console.log("Already Connected To The Database");
        return 
    }

    try {
       //wahi purana wala syntax
       const db = await mongoose.connect(process.env.MONGODB_URI||'',{});
       
       connection.isConnected = db.connections[0].readyState;
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);


    }

}    

export default dbConnect ;