
class HomeController {
    constructor(){

    }
    async index(req,res) {
        return res.status(200).json({
            message: "route found"
        })
    }
}

export default new HomeController;