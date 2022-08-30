require('dotenv').config();
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const cosmos = require('@azure/cosmos');
const { CosmosClient } = cosmos;

const credential = new DefaultAzureCredential();

const url = process.env.KEYVAULT_URL;
const client = new SecretClient(url, credential);


module.exports = async function (context, eventGridEvent) {
    
    const key = await client.getSecret("cosmoskey");
     
        const endpoint = await client.getSecret("cosmosendpoint");
        var ep = endpoint.value;
        var k = key.value;
        const cosmosclient = new CosmosClient({endpoint: ep, key: k});
        // All function invocations also reference the same database and container.
        // If on the contrary you need to change the container based on the Trigger, then create the instance inside the Function
        const container = cosmosclient.database("tasklist_Db").container("countercontainer");
        
        const { resources } = await container.items
        .query("SELECT * from c where c.id=\"65432\"")
        .fetchAll();

        var update = resources[0]
        update.numberOfEvents++

        await container.item("65432","65432").replace(update);


};