require('dotenv').config();
const cosmos = require('@azure/cosmos');
const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const { CosmosClient } = cosmos;

const client = new CosmosClient({ endpoint, key });
// All function invocations also reference the same database and container.
// If on the contrary you need to change the container based on the Trigger, then create the instance inside the Function
const container = client.database("tasklist_Db").container("tasklistcontainer");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const id = req.body.id;
    const text = req.body.text;
    const checked = req.body.checked || false;
    const modify = req.body.modify || false;
    const responseMessage = 
        "Hello, This HTTP triggered function executed successfully.";

    if (text) {
        var newTask = {
                        // create a random ID
                        id: id,
                        text: text,
                        checked: checked,
                        modify: modify
                      }
        context.bindings.outputDocument = JSON.stringify(newTask);
    }
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}