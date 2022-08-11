module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const text = req.body.text;
    const checked = req.body.checked;
    const modify = req.body.modify;
    const responseMessage = 
        "Hello, This HTTP triggered function executed successfully.";

    if (text) {
        var newTask = {
                        // create a random ID
                        id: new Date().toISOString() + Math.random().toString().substring(2, 10),
                        text: text,
                        checked: checked,
                        modify: modify
                      }
        context.bindings.outputDocument = JSON.stringify(newTask);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: newTask
    };
}