module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    var ret = [];
    var documents = context.bindings.documents;
    for (var i = 0; i < documents.length; i++) {
      var document = documents[i];
      ret.push({id: document.id, text : document.text, checked: document.checked, modify : document.modify})
    }

    const responseMessage = "Hello,This HTTP triggered function executed successfully. This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: ret
    };
}