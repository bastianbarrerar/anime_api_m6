const server = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);


describe('/trying server res',()=>{
it('trying get on /', () =>{
     chai.request(server).get('/').end((err, res) =>{
        chai.assert.equal(res.text, 'oh, hi mark', 'res is not what expected')
     });
});
});