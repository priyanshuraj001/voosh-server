const Task = require('../models/ taskModel')


exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const task = new Task({ title, description, status, user: req.user._id });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getTasks = async (req, res) => {
  try {
    const { search, sort, status } = req.query;
    const filter = { user: req.user._id };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    const sortOption = sort === 'recent' ? { createdAt: -1 } : { createdAt: 1 };

    const tasks = await Task.find(filter).sort(sortOption);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(204).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
