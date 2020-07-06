var AWS = require("aws-sdk");
const express = require('express')

AWS.config.update({region:'ap-southeast-2'});
AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
  }
});

const dynamo = new AWS.DynamoDB()
const router = express.Router()
const tableName = "SWT"

const queryDynamo = async (tableName, entryType, id, sortType) => {
    let params = {
        TableName: tableName,
        ExpressionAttributeValues: {
            ":id": {
                "S": id
            },
            ":entry_type": {
                "S": entryType
            }
        },
        KeyConditionExpression: "begins_with(id,:id) AND entry_type = :entry_type",
        ScanIndexForward: sortType
    }
    return await dynamo.query(params).promise()
}

router.post('/getworktrackers', async (req,res) => {
    const { wtr_id } = req.body

    try {
        let data = await queryDynamo(tableName, "Work Tracker", wtr_id.toString() + "_", true)
        res.send(data)
    } catch (err) {
        res.send(err)
    }
})

router.post('/getforms', async (req,res) => {
    const { wtr_id } = req.body

    try {
        let data = await queryDynamo(tableName, "Form", wtr_id.toString() + "_")
        res.send(data)
    } catch (err) {
        res.send(err)
    }
})

router.post('/getrequests', async (req, res)=>{
    const {wtr_id, form_id} = req.body

    try {
        let data = await queryDynamo(tableName, "Request", wtr_id.toString() + "_" + form_id.toString())
        res.send(data)
    } catch (err) {
        res.send(err)
    }

})


module.exports = router