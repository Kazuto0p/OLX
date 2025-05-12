import Posts from '../models/post.model.js'
export  async function addPost(req,res) {
    console.log(req.body);
    
    try {

        console.log("Inside addpost trycatch");
       
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "Blog image is required" });
        }
        
        const {price , subd , details , place } = req.body;
        console.log(req.body);
        
        if (!price || !details || !place){
            return res.status(400).json({message:" Something is missing "})
        }
            
        const data = await Posts.create ({
            price,
            image:file.path,
            subd,
            details,
            place,
        });

        res.status(201).json({ message : "Post Upload Sussfully ",data });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Internal Server Error ", error:error})
        
    }
};


export async function loadpost(req,res) {
    try {
        const data = await Posts.find()
        if (data) {
            console.log("Loading posts.........");
            console.log(data);
            
            
            return res.status(200).json({message:"Success",data})
        }
    } catch (error) {
        return res.status(500).json({message:"Server side error"})
        
    }
}