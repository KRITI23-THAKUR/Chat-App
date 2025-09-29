export const register=async(req,res)=>{
    try {
            const {fullname,email,password}=req.body;
            console.log(fullname,email,password);

        
        
        
    } catch (error) {
        console.log(error)
        
    }
}

export const login=async(req,res)=>{
    try {
        const{email,password}=req.body;
        console.log(email,password)
    } catch (error) {
        
        
    }
}

