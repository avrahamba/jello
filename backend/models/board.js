const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const board = new Schema(
    {

        title: String,
        users: [{
            _id: String,
            name: String,
            email: String
        }],
        taskLists: [{
            id: String,
            title: String,
            tasks: [{
                id: String,
                title: String,
                dueDate: [
                    String,
                    String
                ],
                desc: String,
                labels: [
                    {
                        name: String,
                        color: String,
                        inEdit: Boolean,
                        isActive: Boolean,
                        id: Number
                    }
                ],
                cover: {
                    url: String,
                },
                attachments: [
                    {
                        headers: {},
                        withCredentials: Boolean,
                        file: {
                            uid: Number
                        },
                        filename: String,
                        action: String,
                        url: String,
                        uid: Number,
                        status: String
                    }
                ],
                checklists: [
                    {
                        id: String,
                        title: String,
                        checkItems: [
                            {
                                id: String,
                                txt: String,
                                isDone: Boolean
                            }
                        ]
                    }
                ],
                members: [
                    {
                        _id: String,
                        name: String
                    }
                ],
                msgs: [{
                    user: {
                        _id: String,
                        name: String
                    },
                    txt: String,
                    createdAt: Number
                }]
            }]
        }],
        style: { background: String },
        public: Boolean
    },
    /*     name: {
             type: String,
             unique: true,
             require: true
         },
         partnerAddresses: Array,
         temporaryToken: String,
         permanentToken: {
             type: [
                 {
                     token: String,
                     lastUpdated: Date,
                     name: String
                 }
             ],
             default: []
         },
         expirationTime: Date,
         created: {
             type: Date,
             default: Date.now
         },
         updated: {
             type: Date,
             default: Date.now
         },
         deleted: {
             type: Boolean,
             default: false
         },
         cymulateWafHeader: {
             type: Boolean,
             default: false
         },
         edrHideOutput: {
             type: Boolean,
             default: false
         }
     }*/
    { collection: "board" }
);

// create hook for update with date now

mongoose.model("Board", board);

