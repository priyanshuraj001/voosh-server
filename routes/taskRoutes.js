
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { validate } = require('../middlewares/validate');
const {
  createTaskSchema,
  updateTaskSchema,
  getTasksSchema,
  deleteTaskSchema,
} = require('../validations/taskValidation');

const router = express.Router();
router.use(authMiddleware);

router.post('/', validate(createTaskSchema), createTask);
router.get('/', validate(getTasksSchema), getTasks);
router.put('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', validate(deleteTaskSchema), deleteTask);

module.exports = router;
