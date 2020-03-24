const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const user = new Schema(
    {
        email: {
            type: String,
            unique: true,
            require: true
        },
        name: {
            type: String,
            unique: true,
            require: true
        },
        img: {
            type: String,
        },
        hashPassword: {
            type: String,
        },
        boards: {
            type: [
                {
                    _id: String,
                    name: String,
                    background: String
                }
            ],
            default: []
        },
        alerts: {
            type: [
                {
                    alertForUser: String,
                    isReade: String,
                    task: {
                        type: {
                            _id: String,
                            name: String
                        }
                    },
                    taskList: {
                        type: {
                            _id: String,
                            name: String
                        }
                    },
                    board: {
                        type: {
                            _id: String,
                            name: String,
                            background: String
                        }
                    },
                    user: {
                        type: {
                            _id: String,
                            name: String,
                            img: String
                        }
                    }
                }
            ],
            default: []
        },
        comments: {
            type: [
                {
                    txt: String,
                    isReade: String,
                    task: {
                        type: {
                            _id: String,
                            name: String
                        }
                    },
                    taskList: {
                        type: {
                            _id: String,
                            name: String
                        }
                    },
                    board: {
                        type: {
                            _id: String,
                            name: String,
                            background: String
                        }
                    },
                    user: {
                        type: {
                            _id: String,
                            name: String,
                            img: String
                        }
                    }
                }
            ],
            default: []
        }
    },
    { collection: "user" }
);

// create hook for update with date now

mongoose.model("User", user);