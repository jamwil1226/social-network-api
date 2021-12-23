const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Reactions Schema
const ReactionsSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// Thoughts Schema
const ThoughtsSchema = new Schema({
    thoughtsText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [ReactionsSchema]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
);


// total count of reactions
ThoughtsSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// create the Thoughts model using the ThoughtsSchema
const Thoughts = model('Thoughts', ThoughtsSchema);

// export the Thoughts model
module.exports = Thoughts;