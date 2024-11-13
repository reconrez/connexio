const Thread = require('../models/threadSchema');

// 1. Create a new thread
const createThread = async (req, res) => {
  const { title, userId, content } = req.body;

  try {
    const thread = new Thread({ title, userId, content });
    await thread.save();

    res.status(201).json({ message: 'Thread created successfully', thread });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating thread', error });
  }
};

// 2. Get all threads
const getAllThreads = async (req, res) => {
  try {
    const threads = await Thread.find();
    res.status(200).json(threads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching threads', error });
  }
};

// 3. Get a single thread by ID
const getThreadById = async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findById(threadId);
    if (!thread) return res.status(404).json({ message: 'Thread not found' });

    res.status(200).json(thread);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching thread', error });
  }
};

// 4. Update thread status (open/close)
const toggleThreadStatus = async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findById(threadId);

    if (!thread) return res.status(404).json({ message: 'Thread not found' });

    // Toggle between "open" and "closed"
    thread.status = thread.status === 'open' ? 'closed' : 'open';
    await thread.save();

    res.status(200).json({
      message: `Thread status updated to ${thread.status}`,
      thread
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating thread status', error });
  }
};

// 5. Increment views for a thread
const incrementThreadViews = async (req, res) => {
  const { threadId } = req.params;

  try {
    await Thread.findByIdAndUpdate(threadId, { $inc: { viewsCount: 1 } });
    res.status(200).json({ message: 'Thread view incremented' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error incrementing views', error });
  }
};

// 6. Delete a thread
const deleteThread = async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findByIdAndDelete(threadId);

    if (!thread) return res.status(404).json({ message: 'Thread not found' });

    res.status(200).json({ message: 'Thread deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting thread', error });
  }
};

// 1. Add a reply to a thread
const addReply = async (req, res) => {
  const { threadId, userId, content } = req.body;

  try {
    const thread = await Thread.findById(threadId);

    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    if (thread.status === 'closed') {
      return res.status(403).json({ message: 'Thread is closed and cannot be replied to' });
    }

    const reply = new Reply({ threadId, userId, content });
    await reply.save();

    thread.repliesCount += 1;
    await thread.save();

    res.status(201).json({ message: 'Reply added successfully', reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding reply', error });
  }
};

// 2. Get all replies for a specific thread
const getRepliesByThread = async (req, res) => {
  const { threadId } = req.params;

  try {
    const replies = await Reply.find({ threadId }).sort({ createdAt: 1 });
    res.status(200).json(replies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching replies', error });
  }
};

// 3. Update a reply (content only)
const updateReply = async (req, res) => {
  const { replyId } = req.params;
  const { content } = req.body;

  try {
    const reply = await Reply.findById(replyId);

    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    reply.content = content;
    await reply.save();

    res.status(200).json({ message: 'Reply updated successfully', reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating reply', error });
  }
};

// 4. Delete a reply
const deleteReply = async (req, res) => {
  const { replyId } = req.params;

  try {
    const reply = await Reply.findByIdAndDelete(replyId);

    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    await Thread.findByIdAndUpdate(reply.threadId, { $inc: { repliesCount: -1 } });

    res.status(200).json({ message: 'Reply deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting reply', error });
  }
};

module.exports = {
  createThread,
  getAllThreads,
  getThreadById,
  toggleThreadStatus,
  incrementThreadViews,
  deleteThread,
  addReply,
  getRepliesByThread,
  updateReply,
  deleteReply
};