const expect=require('expect')
const request=require('supertest')

const {app}=require('./../server')
const {ToDoModel}=require('./../models/todo')

beforeEach((done)=>{
  ToDoModel.remove({}).then(()=>{
    done()
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
        ToDoModel.find().then((docs)=>{
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
         expect(docs.length).toBe(0)
         done()
       }).catch((e)=>{
         return done(e)
       })
     })
  })


})
