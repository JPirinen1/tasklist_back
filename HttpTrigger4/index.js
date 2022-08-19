require('dotenv').config();
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const cosmos = require('@azure/cosmos');
const { CosmosClient } = cosmos;

const credential = new DefaultAzureCredential();

const url = process.env.KEYVAULT_URL;
const client = new SecretClient(url, credential);

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const key = await client.getSecret("cosmoskey");
    const endpoint = await client.getSecret("cosmosendpoint");
    var ep = endpoint.value;
    var k = key.value;

    const cosmosclient = new CosmosClient({endpoint: ep, key: k});
    // All function invocations also reference the same database and container.
    // If on the contrary you need to change the container based on the Trigger, then create the instance inside the Function
    const container = cosmosclient.database("tasklist_Db").container("tasklistcontainer");


    //const item = await container.item(req.body.id, req.body.id).read();
    await container.item(req.body.id, req.body.id).delete();

    const responseMessage = "Hello, This HTTP triggered function executed successfully";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}