import {Contact} from '../models/Contact'

//contact or mesages
const messages_get_all = async (req, res)=>{
    try{
        const messages = await Contact.find();
        if (messages == null) return  res.status(404)
       
        return res.status(200).json({messages, message:"contacts fetched!"})
        } catch(error){
        return res.status(404).json({error:error.message})
    }
    
}
// get single message

const message_get_one = async (req, res)=>{
    try{
        const message = await Contact.findById(req.params.messageId);
        if (!message) return  res.status(404).json({message:"Contact not available"})
       
        return res.status(200).json({message})

        } catch(error){
        return res.status(404).json({error:error.message})
    }
    
}

// delete a message
const message_delete_one = async (req, res)=>{
    try{
        const message = await Contact.findById(req.params.messageId);
        if (!message) return  res.status(404).json({message:"Contact not available"})
        
        await message.remove()

        return res.status(200).json({message:"Message Deleted!"})

        } catch(error){
        return res.status(404).json({error:error.message})
    }
    
}

// sending a message
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

        return res.status(201).json({message:"Message Sent successfully"})
    }
}

export {messages_get_all, message_create, message_get_one, message_delete_one}    