const checkAuth = async(req, res) => {
    try {
        const user = req.user
        res.status(200).json({message: 'User is authenticated', user})
    } catch (error) {
        res.status(401).json({message: 'User is not authenticated'})
    }
}

module.exports = checkAuth