/**
 * 텔레그램 라우팅 함수 정의
 */

var express = require('express');
var router = express.Router();

router.get('/',function(req, res) {
    console.log('/ 패스 요청됨.');
    res.render('index', {title:"텔레텔레~"});
});

router.get('/test',function(req, res) {
    console.log('/test 테스트 패스 요청됨.');
    res.render('index', {title:"텔레텔레~ test 페이지입니다."});
});

module.exports = router;
  
