module.exports = async function (context, req) {
    context.bindings.myQueueItem = req.body.id;

    var timeStamp = new Date().toISOString();

    context.bindings.outputEvent = {
        id: 'message-id',
        subject: 'subject-name',
        dataVersion: '1.0',
        eventType: 'event-type',
        data: "event-data",
        eventTime: timeStamp
    };

    const responseMessage = "Hello, This HTTP triggered function executed successfully";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}