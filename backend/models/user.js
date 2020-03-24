const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const user = new Schema(
    {
        email: String,
        name: String,
        img: String,
        hashPassword: String,
        boards: [{
            _id: String,
            name: String,
            background: String
        }],
        alerts: [
            {
                alertForUser: String,
                isReade: String,
                task: {
                    id: String,
                    name: String
                },
                taskList: {
                    id: String,
                    name: String
                },
                board: {
                    _id: String,
                    name: String,
                    background: String
                },
                user: {
                    _id: String,
                    name: String,
                    img: String
                }
            }
        ],
        comments:
            [
                {
                    txt: String,
                    isReade: String,
                    id: String,
                    name: String

                    ,
                    taskList: {
                        id: String,
                        name: String
                    },
                    board: {
                        _id: String,
                        name: String,
                        background: String
                    },
                    user: {
                        _id: String,
                        name: String,
                        img: String
                    }
                }
            ]

    },
    { collection: "user" }
);

// create hook for update with date now

mongoose.model("User", user);