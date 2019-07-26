exports.success = (data)=>{
    return{
        success: true,
        data: data
    }
};
exports.fail = (err)=>{
    return{
        success:false,
        error: err.message
    }
}