/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      test('Test POST /api/threads/:board',  function(done){
        chai.request(server)
        .post(`/api/threads/testForum`)
        .send({board: testForum, text: 'test suite test posting a thread', delete_password: 'delete'})
        .end(function(err, res){
          assert.equal(res.status, 302);
          done();
        })
      });
      
    });
    
    suite('GET', function() {
      test('Test GET /api/threads/:board',  function(done){
        chai.request(server)
        .get(`/api/threads/testForum`)
        .end(function(err, res){
          assert.equal(res.status, 200 || 304);
          done();
        })
      });
      
    });
    
    suite('DELETE', function() {
      
    });
    
    suite('PUT', function() {
      
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      
    });
    
    suite('GET', function() {
      
    });
    
    suite('PUT', function() {
      
    });
    
    suite('DELETE', function() {
      
    });
    
  });

});
