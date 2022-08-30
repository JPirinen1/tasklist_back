require('dotenv').config();
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const cosmos = require('@azure/cosmos');
const { CosmosClient } = cosmos;

const credential = new DefaultAzureCredential();

const url = process.env.KEYVAULT_URL;
const client = new SecretClient(url, credential);

module.exports = async function (context, req) {
    //CREATE ITEM
    context.log('JavaScript HTTP trigger function processed a request.');



    const text = req.body.text;
    const checked = req.body.checked || false;
    const modify = req.body.modify || false;
    const responseMessage = "Hello, This HTTP triggered function executed successfully.";

    if (text) {
        var newTask = {
                        // create a random ID
                        id: new Date().toISOString() + Math.random().toString().substring(2, 10),
                        text: text,
                        checked: checked,
                        modify: modify
                      }

        const key = await client.getSecret("cosmoskey");
        const endpoint = await client.getSecret("cosmosendpoint");
        var ep = endpoint.value;
        var k = key.value;
        const cosmosclient = new CosmosClient({endpoint: ep, key: k});
        // All function invocations also reference the same database and container.
        // If on the contrary you need to change the container based on the Trigger, then create the instance inside the Function
        const container = cosmosclient.database("tasklist_Db").container("tasklistcontainer");
        container.items.create(newTask);

        var timeStamp = new Date().toISOString();

        context.bindings.outputEvent = {
            id: 'message-id',
            subject: 'subject-name',
            dataVersion: '1.0',
            eventType: 'event-type',
            data: "event-data",
            eventTime: timeStamp
        };
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: newTask
    };
}