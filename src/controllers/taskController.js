import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  const { completed } = req.query;

  if (completed !== undefined && completed !== 'true' && completed !== 'false') {
    return res.status(400).json({ error: 'completed must be true or false' });
  }

  const completedFilter =
    completed === undefined ? undefined : completed === 'true';

  const tasks = await taskService.getAllTasks(completedFilter);
  res.json(tasks);
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}
