import mongoose , {Schema,Document} from 'mongoose';

//why using this ndocument now we haven't used it anywhere the answer is because we are dealing with type safety here
//if it would be simple js we would not have to write document here

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

//core typescript jaisa notes mai sab likha tha

const MessageSchema : Schema<Message> = new Schema({
    content:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required:true,
        default:Date.now
    }

})


//yeh hua hmara msg ka schema ab likhenge user ka schema


export interface User extends Document {
   username:string;
   email:string;
   password:string;
   verifyCode:string;
   verifyCodeExpiry:Date;
   isVerified:boolean;
   isAcceptingMessage:boolean;
   messages:Message[] //messages ko array ke format mai denge
}


//user interface bnn gya ab bnega hmara user ka schema


const UserSchema : Schema<User> = new Schema({
    username:{
        type: String,
        required: [true,"Username Is Required"],
        trim:true,
        unique:true
    },
    email:{
        type: String,
        required:[true, "Email Is Required"],
        unique: true,
        match:[/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,'Please use a  valid email address']
    },
    password:{
        type:String,
        required:[true,"Password is Required"]
    },
    verifyCode:{
        type:String,
        required:[true,"Verify Code Is Required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verify Code Expiry Is Required"],
        
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAcceptingMessage:{
         type:Boolean,
         default:true,
    },

    messages:[MessageSchema]


})


const UserModel = (mongoose.models.User as mongoose.Model<User>|| mongoose.model<User>("User",UserSchema))
//basic typescript used here nothing to explain
export default UserModel;


