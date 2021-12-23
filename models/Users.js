const { Schema, model } = require('mongoose');

const UsersSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trimmed: true
  },
  email: {
    type: String,
    unique: true,
    required: 'Email is Required',
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thoughts'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,

    },
    id: false
});

UsersSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// create the Thoughts model using the ThoughtsSchema
const Users = model('Users', UsersSchema);

// export the Thoughts model
module.exports = Users;