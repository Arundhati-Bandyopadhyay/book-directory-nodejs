export const searchbooks=async(req,res)=>{
    try{
        const books=await bookmodel.find({
            $or: [
                { title: { $regex: "." + req.query.srch + ".", $options: "i" } },
                { isbn: { $regex: "." + req.query.srch + ".", $options: "i" } },
                { author: { $regex: "." + req.query.srch + ".", $options: "i" } },

              ],

        });
        return res.json(books)
    }catch(e){
        console.log(e);
        return res.sendStatus(500)
    }
}