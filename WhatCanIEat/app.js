// Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');
var path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var static = require('serve-static');
var errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용(혹시 몰라서 넣음)
var expressErrorHandler = require('express-error-handler');

// 모듈로 분리한 설정 파일 불러오기(현재 port만 있음.)
var config = require('./config');

// 익스프레스 객체 생성
var app = express();

// 서버 변수 설정  
console.log('config.server_port : %d', config.server_port);
app.set('port', process.env.PORT || 3000);

//view engine setup (hogan.js 를 사용한다.)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// body-parser를 이용해 application/x-www-form-urlencoded 파싱 (당장 필요없음)
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 이용해 application/json 파싱 (혹시 몰라서 넣음)
app.use(bodyParser.json());

// public 폴더를 static으로 오픈 (public폴더 아래 자원은 외부에서 직접 접근 가능함 .http://localhost:3000/public/stylesheets/style.css)
app.use('/public', static(path.join(__dirname, 'public')));
 
// cookie-parser 설정
app.use(cookieParser());

var router = express.Router();
//라우터 객체 등록
app.use('/', router);

// 텔레그램 라우팅 설정(텔레그램용 라우터 정보, 추후 다른 종류의 라우팅이 필요하면 routes에 파일생성해서 넣자)
var telegram = require('./routes/telegram');
telegram(router);
console.log("텔레그램 라우팅 설정");


//===== 404 에러 페이지 처리 =====//
var errorHandler = expressErrorHandler({
 static: {
   '404': './public/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


//===== 서버 시작 =====//

//확인되지 않은 예외 처리 - 서버 프로세스 종료하지 않고 유지함
process.on('uncaughtException', function (err) {
	console.log('uncaughtException 발생함 : ' + err);
	console.log('서버 프로세스 종료하지 않고 유지함.');
	
	console.log(err.stack);
});

// 프로세스 종료 시에 데이터베이스 연결 해제(나중에 DB추가되면 하자)
process.on('SIGTERM', function () {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function () {
	console.log("Express 서버 객체가 종료됩니다.");	
});

// 시작된 서버 객체를 리턴받도록 합니다. 
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));
});
