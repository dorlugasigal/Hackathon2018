const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: "5c61d895",
    apiSecret: "bd0dfb599949d348"
});

exports.sendSms = (user, cb) => {
    user.contacts.forEach(contact => {
        nexmo.message.sendSms(
            "OpenShelter", contact.phone,`Hello ${contact.name}, this is an automatic message from OpenShelter \n ${user.fullName} is safe and now in a shelter at ${user.currentAddress}`,
            (err, responseData) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(responseData);
                }
            }
        );
    });
};
//
// exports.sendSms({
//     fullName: "Nadav Avisar",
//     currentAddress: "13th SummerField St.",
//     contacts: [
//         {
//             name: "Nadav",
//             phone: "972504246905"
//         },
//         {
//             name: "Haim",
//             phone: "972542327109"
//         },
//         {
//             name: "Daniel",
//             phone: "972535220212"
//         },
//         {
//             name: "Maor",
//             phone: "972527505776"
//         },
//         {
//             name: "Dor",
//             phone: "972526889753"
//         }]
// }, data => {
//     console.log(data);
// });