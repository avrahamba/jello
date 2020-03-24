const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const user = new Schema(
    {
        name: {
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
    },
    { collection: "user" }
);

// create hook for update with date now

mongoose.model("User", user);