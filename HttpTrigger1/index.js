module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const tasklist = [{text : "task1",checked: false, modify: false},
                    {text : "task2",checked: false, modify: false},
                    {text : "task3",checked: false, modify: false}];
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: tasklist
    };
}