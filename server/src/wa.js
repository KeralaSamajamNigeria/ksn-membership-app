const applicant = [
  {
    _id: {
      $oid: "678663df4736589fad12e079",
    },
    full_name: "Agata 2",
    email: "email@gmail.com",
    phone_number: "070343545454",
    whatsapp_number: "070343545454",
    number_of_family_members: 1,
    attendees: [
      {
        attendee_full_name: "Mike Deo",
        _id: {
          $oid: "678663df4736589fad12e07a",
        },
      },
    ],
    isapproved: true,
    eventId: {
      $oid: "675031648e434705451d4c60",
    },
    barCode: "hahahahjahahahaha",
    appliedAt: {
      $date: "2025-01-14T13:17:19.892Z",
    },
    __v: 0,
  },
];

console.log(typeof applicant);
const familyMembers = applicant.attendees[0];
// ? applicant.attendees
//     .forEach((fam) => {
//       console.log(fam);
//       {
//         fam.attendee_full_name;
//       }
//     })
//     .join(", ")
// : "None";
console.log(familyMembers);
