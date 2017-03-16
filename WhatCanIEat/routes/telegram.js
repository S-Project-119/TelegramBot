/**
 * 텔레그램 라우팅 함수 정의
 *
 */
  
module.exports = function(router) {
      // 홈 테스트
	console.log("telegram router 등록");
    router.route('/').get(function(req, res) {
        console.log('/ 패스 요청됨.');
        res.render('index', {title:"텔레텔레~"});
    });
    
    router.route('/test').get(function(req, res) {
        console.log('/test 패스 요청됨.');
        res.render('index', {title:"텔레텔레~ test"});
    });

};