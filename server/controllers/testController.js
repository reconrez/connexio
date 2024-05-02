var { createDiscussion, getDiscussionById, getDiscussions, getDiscussionById } = require("./discussionController")
var { createResponse } = require("./discussionResponseController")

const testConsole = async (req, res) => {
  console.log("=================================");
    
  console.log("=================================");
    
}

const createDiscussionTest = async (req, res) => {
    console.log("================Entered=================");
    // const dummyJson = {
        // body: [{
        //     "discussion_id": "62f54a8554a045eb854a954a054a854a",
        //     "user_id": "4a954a85-54a0-45eb-854a-954a054a854a",
        //     "topic": "Inventore laudantium quia ut.",
        //     "content": "Et dolorem quos aliquid eum aperiam accusamus. Quia aut voluptas quia eos. Est aperiam qui eos et.",
        //     "created_at": "2024-02-01T04:49:00.000Z",
        //     "updated_at": "2024-02-01T04:49:00.000Z",
        //     "open": true,
        //     "closed_at": null, 
        //     "response_count": 2
        // }]
    //   }
    const dummyJson = {
        body: {
            "discussion_id": "65be9c5c847caa0b4f0000fb",
            "user_id": "65be9c5c847caa0b4f0000fc",
            "topic": "Inventore laudantium quia ut.",
            "content": "Et dolorem quos aliquid eum aperiam accusamus. Quia aut voluptas quia eos. Est aperiam qui eos et.",
            "created_at": "2024-02-01T04:49:00.000Z",
            "updated_at": "2024-02-01T04:49:00.000Z",
            "open": true,
            "closed_at": null, 
            "response_count": 2
        }
      }


    const responseJson = {
        body: [{
            "discussion_id": "62f54a8554a045eb854a954a054a854a",
        "user_id": "4a854a95-4a05-4a85-54a0-54a854a954b",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec augue quam.",
        "created_at": "2024-02-01T05:00:00.000Z",
        "updated_at": "2024-02-01T05:00:00.000Z",
        "likes" : [
            "4a854a95-4a05-4a85-54a0-54a854a954b",   
          ],
          "dislikes" : [
            "4a854a95-4a05-4a85-54a0-54a854a945b",  
          ]     
        }]
    }  
    console.log("================createDiscussion=================");
    createDiscussion(dummyJson, "")
    .then(response => {
        console.log(`createDiscussion: ${JSON.stringify(response)}`)
    })
    console.log("================createResponse=================");
    // createResponse(responseJson)
    // .then(response => {
    //   console.log(`createResponse: ${JSON.stringify(response)}`)
    // })
}

const getDiscussionTest = async (req, res) => {
  getDiscussions()
  .then(response => {
    console.log(`getDiscussions: ${JSON.stringify(response)}`)
  })

  getDiscussionById('62f54a8554a045eb854a954a054a854a')
  .then(response => {
    console.log(`getDiscussionById: ${JSON.stringify(response)}`)
  })

}

module.exports = {
  createDiscussionTest,
  getDiscussionTest,
  testConsole
}