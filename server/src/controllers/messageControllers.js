import {Contact} from '../models/Contact'

//contact or mesages
const messages_get_all = (req, res)=>{
    const messages = Contact.find().then((result)=>{
        return res.status(200).json({data:result, messages:"contacts fetched!"})
    }).catch(error =>{
        console.log(error)
    })
    }
    
const message_create = async(req, res)=>{
    if(req.body.sender === '' || req.body.message === ''){
        return res.status(403).json({message:"sender and message are required"})
    }
    else{
        const message = new Contact({
            sender: req.body.sender,
            name:req.body.name,
            message: req.body.message,
    
        })
        await message.save()

        return res.status(201).json({data:message, message:"Message Sent successfully"})
    }
}

export {messages_get_all, message_create}    