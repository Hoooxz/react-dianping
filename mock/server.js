var app = require('koa')();
var router = require('koa-router')();

router.get('/', function *(next) {
    this.body = 'hello koa !'
});

router.get('/api', function *(next) {
    this.body = 'test data'
});
router.get('/api/1', function *(next) {
    this.body = 'test data 1'
});
router.get('/api/2', function *(next) {
    this.body = 'test data 2'
});

var homeadData = require('./home/ad')
router.get('/api/homead', function *(next) {
    this.body = homeadData
})

var homeListData = require('./home/list')
router.get('/api/homelist/:city/:page', function *(next) {
    // 参数
    const params = this.params,
          paramsCity = params.city,
          paramsPage = params.page;
    
    this.body = homeListData
})

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000);
