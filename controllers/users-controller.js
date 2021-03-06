const { Users } = require('../models');

const usersController = {
    // get all users
    getAllUsers(req, res) {
        Users.find({})
        .populate({
            path: 'username',
            select: '-__v'
        })
        .populate({
            path: 'email',
            select: '-__v'
        })
        .populate({
            path: 'thoughts', 
            select: '-__v'
        })
        .populate({
            path: 'friends', 
            select: '-__v'
        })
        .select('__v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
  
    // get one user by id
    getUsersById({ params }, res) {
      Users.findOne({ _id: params.id })
      .populate({
        path: 'username',
        select: '-__v'
        })
        .populate({
         path: 'email',
         select: '-__v'
        })
        .populate({
            path: 'thoughts', 
            select: '-__v'
        })
        .populate({
            path: 'friends', 
            select: '-__v'
        })
        .select('__v')
        .then(dbUsersData => {
          // If no user is found, send 404
          if (!dbUsersData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUsersData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    // createUsers
    createUsers({ body }, res) {
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err));
    },

    // update user by id
    updateUsers({ params, body }, res) {
        Users.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUsersData => {
            if (!dbUsersData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete user
    deleteUsers({ params }, res) {
        Users.findOneAndDelete({ _id: params.id })
        .then(dbUsersData => {
            if (!dbUsersData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    },

    addFriend({params}, res) {
        Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
        .populate({
            path: 'friends', 
            select: ('-__v')
        })
        .select('-__v')
        .then(dbUsersData => {
            if (!dbUsersData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteFriend({params}, res) {
        Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
        .populate({
            path: 'friends', 
            select: ('-__v')
        })
        .select('-__v')
        .then(dbUsersData => {
            if (!dbUsersData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    }



}



module.exports = usersController;