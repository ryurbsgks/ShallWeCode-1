const models = require('../../../models')
const { generateAccessToken, sendAccessToken, isAuthorized } = require('../../tokenFunctions')

module.exports = (req, res) => {
  console.log(req.file)
  const token = isAuthorized(req)
  if (!token) {
    return res.status(401).send({ message: '권한 없음' })
  }
  const { path } = req.file

  if (!path) {
    return res.status(400).send({ message: '사용하실 이미지를 첨부해주세요' })
  }

  models.picturePost(token.username, path, (err, result) => {
    if (err) {
      res.status(500).send({ message: '서버 에러' })
    }
    res.clearCookie('swcjwt')
    const accessToken = generateAccessToken(result[0])
    sendAccessToken(res, accessToken)
    res.status(200).send({ data: { file: path }, message: '프로필 사진 변경 성공' })
  })
}