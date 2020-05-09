
class UserController {
    async index(){
        return res.status(200).json({
            message: "route found"
        })
    }
}

export default new UserController;