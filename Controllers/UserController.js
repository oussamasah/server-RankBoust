// SitesController.js
const User = require('../Models/User');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt")
exports.getAll = async (req,res)=>{
users = await User.find()
res.status(200).json(users)
}

exports.addUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const saltRounds = parseInt(process.env.HASH_SALT_ROUND);


        const salt = await bcrypt.genSalt(saltRounds);
        if (!salt) {
            return res.status(500).json({ error: 'Failed to generate salt' });
        }

        const hashedPassword = await bcrypt.hash(password, salt);
        if (!hashedPassword) {
            return res.status(500).json({ error: 'Failed to hash password' });
        }

        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            account: '65e76586ee8317e4c27afb9f',
            created_at: Date.now()
        });

        await user.save();
        res.status(201).json({ message: 'User added successfully', user });
    } catch (error) {
        console.error('Error adding user:', error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        res.status(500).json({ error: 'Server error' });
    }
};


exports.updateUser = async (req, res) => {
    const { id } = req.params;

    const { name, email } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { email:email, name:name }, { new: true });

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

