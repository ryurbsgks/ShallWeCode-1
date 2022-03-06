const models = require('../../models')

module.exports = (req, res) => {

    const { userid, password } = req.body

    models.signoutDelete(userid, password, (err, result) => {
        if (err) {
            res.status(500).send('서버 에러')
        }
        res.clearCookie('swcjwt')
        res.status(200).send('회원탈퇴')
    })
}