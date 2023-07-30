import { getServerSession } from 'next-auth';
import ChatRoom from '../../model/ChatRoom'; // Assuming you have the ChatRoom model defined
import User from '../../model/User'; // Assuming you have the User model defined
import { NextAuthOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
    const { query } = req.query;
    const session = getServerSession(req, res, NextAuthOptions);

    if (!session) {
        return res.status(401).json({
            message: "You must be logged in!"
        })
    }

    if (!query) {
        return res.status(400).json({ error: 'Search query is required.' });
    }

    switch (req.method) {
        case "GET":

        try {
            // Search for chat rooms
            const chatRooms = await ChatRoom.find({
                $or: [
                    { chatName: { $regex: query, $options: 'i' } }, // Case-insensitive search on chatName
                    { members: { $elemMatch: { $in: [query] } } } // Search for chat rooms with matching user IDs
                ]
            }).limit(10).populate('members');

            // Search for users
            const users = await User.find({ username: { $regex: query, $options: 'i' } }) // Case-insensitive search on username
                .limit(10);

            res.status(200).json({ chatRooms, users });
        } catch (error) {
            console.error('Error searching:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

        default:
            return res.status(422).json({
                message: "Method not supported!"
            })
    }
}
