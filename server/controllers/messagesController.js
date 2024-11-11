const Message = require('../models/Message');

const sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  try {
    const message = new Message({
      senderId,
      receiverId,
      content
    });

    await message.save();
    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending message', error });
  }
};

const getConversation = async (req, res) => {
    const { userId1, userId2 } = req.params;
  
    try {
      const conversation = await Message.find({
        $or: [
          { senderId: userId1, receiverId: userId2 },
          { senderId: userId2, receiverId: userId1 }
        ]
      }).sort({ sentAt: 1 }); // Sort messages by sentAt (ascending)
  
      res.status(200).json(conversation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching conversation', error });
    }
};

const markMessageAsRead = async (req, res) => {
    const { messageId } = req.params;
  
    try {
      await Message.findByIdAndUpdate(messageId, { isRead: true });
      res.status(200).json({ message: 'Message marked as read' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error marking message as read', error });
    }
};

const deleteMessage = async (req, res) => {
    const { messageId } = req.params;
  
    try {
      await Message.findByIdAndDelete(messageId);
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting message', error });
    }
  };
  
  

