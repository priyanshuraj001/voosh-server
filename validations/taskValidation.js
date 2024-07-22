const Joi = require('joi');

const createTaskSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string().valid('todo', 'progress', 'done').default('todo'),
  }),
  query: Joi.object(),
  params: Joi.object(),
});

const updateTaskSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().valid('todo', 'progress', 'done').optional(),
  }),
  query: Joi.object(),
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
});

const getTasksSchema = Joi.object({
  body: Joi.object(),
  query: Joi.object({
    search: Joi.string().optional(),
    sort: Joi.string().valid('recent', 'old').optional(),
    status: Joi.string().valid('todo', 'progress', 'done').optional(),
  }),
  params: Joi.object(),
});

const deleteTaskSchema = Joi.object({
  body: Joi.object(),
  query: Joi.object(),
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  getTasksSchema,
  deleteTaskSchema,
};
