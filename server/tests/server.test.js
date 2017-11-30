const expect=require('expect')
const request=require('supertest')

const {app}=require('./../server')
const {ToDoModel}=require('./../models/todo')

const {ObjectID}=require('mongodb')

const todos=[{_id:new ObjectID(),text:'This is first example',completed:false,completedat:333},{_id:new ObjectID(),text:'This is second example',completed:false,completedat:333}]

beforeEach((done)=>{
  ToDoModel.remove({}).then(()=>{
    ToDoModel.insertMany(todos).then(()=>{done()})
    })
})

describe('POST /ToDo',()=>{
  it('Should work as expected',(done)=>{
    var text='This is a text from testing'
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text)
      })
      .end((err,res)=>{
        if(err)
        {
          return done(err)
        }
        ToDoModel.find({text}).then((docs)=>{
          expect(docs.length).toBe(1)
          expect(docs[0].text).toBe(text)
          done()
        }).catch((e)=>{done(e)})
      })
  })


  it('Should not work as expected',(done)=>{
  request(app)
    .post('/todos')
    .send({})
    .expect(400)
     .end((err,res)=>{
       if(err)
       {
         return done(err)
       }

       ToDoModel.find().then((docs)=>{
         expect(docs.length).toBe(2)
         done()
       }).catch((e)=>{
         return done(e)
       })
     })
  })


})

describe('Get /todos',()=>{
  it('Should get todos',(done)=>{
    request(app)

      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.docs.length).toBe(2)
        })
        .end(done)
  })
})

describe('Get /todos/id',()=>{
  it('Should return todos',(done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(todos[0].text)
    })
    .end(done)
  })

  it('Should return a 404 if todo is not found',(done)=>{
    request(app)
    .get(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done)
  })

  it('Should return a 404 if not a valid object ID',(done)=>{
    request(app)
    .get('/todos/56hsgkhghkdghsg99')
    .expect(404)
    .end(done)
  })

})


describe('Delete /todos/id',()=>{
  it('Should delete todos',(done)=>{
    request(app)
    .delete(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(todos[0].text)
    })
    .end(done)
  })

  it('Should return a 404 if todo is not found',(done)=>{
    request(app)
    .delete(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done)
  })

  it('Should return a 404 if not a valid object ID',(done)=>{
    request(app)
    .delete('/todos/56hsgkhghkdghsg99')
    .expect(404)
    .end(done)
  })

})

describe('PATCH /todos/id',()=>{
  it('Object ID is Invalid',(done)=>{
    request(app)
    .patch(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done)
  })
  it('Should update the todo',(done)=>{
    var text='This is first update from Patch';
    request(app)
    .patch(`/todos/${todos[0]._id.toHexString()}`)
    .send({text,completed:true})
    .expect(200)
    .expect((res)=>{
      expect(res.body.doc.text).toBe(text)
      expect(res.body.doc.completed).toBe(true)
      expect(res.body.doc.completedat).toBeA('number')
    })
    .end(done)
  })

  it('Should clear completedat when todo is not completed',(done)=>{
    var text="This is second update from Patch"
    var completed=false
    request(app)
    .patch(`/todos/${todos[1]._id.toHexString()}`)
    .send({text,completed})
    .expect(200)
    .expect((res)=>{
      expect(res.body.doc.text).toBe(text)
      expect(res.body.doc.completed).toBe(false)
      expect(res.body.doc.completedat).toNotExist()
    })
    .end(done)
  })

})
