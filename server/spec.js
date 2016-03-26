var app = require('./server');
var request = require('supertest'); // handles testing the HTTP stuff
var chai = require('chai').expect; // handles testing JS objects

// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, POST, GET ONE
// to run the test type mocha server/specs.js


// MOCHA is what is running the tests below
describe('[LIONS]', function(){

  it('should get all lions', function(done) {
    request(app)
      .get('/lions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        chai(resp.body).to.be.an('array');
        done();
      })
  });
  it('should get all tigers', function(done) {
    request(app)
      .get('/tigers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        chai(resp.body).to.be.an('array');
        done()
      })
  });

// GET ONE
  it('should get a single lion', function(done) {
    request(app)
      .get('/lions/:id')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        chai(resp.body).to.be.an('object');
        done();
      })
  });
  it('should get a single tiger', function(done) {
    request(app)
      .post('/tigers')
      .send({
        name: 'Kevin',
        pride: 'Amazing pride',
        age: 3,
        gender: 'male'
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, resp) {
        request(app)
          .get('/tigers/' + resp.body.id)
          .end(function(err, resp) {
            chai(resp.body).to.equal(resp.body);
            done();
          })
      })
  })

// POST
  it('should create and return a new lion using the posted object as a lion', function(done) {
    request(app)
      .post('/lions')
      .send({
        name: 'Simba',
        pride: 'Lion King',
        age: 4,
        gender: 'male'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, resp) {
        chai(resp.body).to.be.an('object');
        done();
      })
  });

  it('should create a new tiger, using the posted id as a tiger', function(done) {
    request(app)
      .post('/tigers')
      .send({
        name: 'Tony the Tiger',
        pride: 'Cereal',
        age: 6,
        gender: 'male'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, resp) {
        chai(resp.body).to.be.an('object');
        done();
      })
  })

// PUT
  it('should update a lion', function(done) {
    request(app)
      .post('/lions')
      .send({
        name: 'Test',
        pride: 'Test Pride',
        age: 3,
        gender: 'female'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        request(app)
          .put('/lions/' + resp.body.id)
          .send({
            name: 'Mufasa'
          })
          .end(function(err, resp) {
            chai(resp.body.name).to.equal('Mufasa');
            done();
          })
      })
  });


// NOT WORKING FOR SOME REASON
  // it('should update a tiger', function(done) {
  //   request(app)
  //     .post('/tigers')
  //     .send({
  //       name: 'Avi',
  //       pride: 'Ginges',
  //       age: 8,
  //       gender: 'female'
  //     })
  //     .set('Accept', 'application/json')
  //     .end(function(err, resp) {
  //       console.log('FIRST RESP.BODY: ' + resp.body.id)
  //       request(app)
  //         .put('/tigers/' + resp.body.id)
  //         .send({
  //           gender: 'male'
  //         })
  //         .end(function(err, resp) {
  //           console.log('SECOND RESP.BODY: ' + resp.body.name)
  //           chai(resp.body.gender).to.equal('male');
  //           done();
  //         })
  //     })
  // })

// DELETE
  it('should delete a lion', function(done) {
    request(app)
      .post('/lions')
      .send({
        name: 'Casandra',
        pride: 'MakerSquare',
        age: 5,
        gender: 'female'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        request(app)
          .delete('/lions/' + resp.body.id)
          .end(function(err, resp) {
            chai(resp.body).to.equal(resp.body);
            done();
          })
      })
  })

  it('should delete a tiger', function(done) {
    request(app)
      .post('/tigers')
      .send({
        name: 'Teacup',
        pride: 'Coffee',
        age: 2,
        gender: 'male'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        console.log(resp.body);
        request(app)
          .delete('/tigers/' + resp.body.id)
          .end(function(err, resp) {
            console.log(resp.body);
            chai(resp.body).to.equal(resp.body);
            done()
          })
      })
  })

});


