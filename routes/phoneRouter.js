const { Router } = require('express');
const { phoneController } = require('../controller');

const phoneRouter = Router();

phoneRouter
  .route('/')
  .get(phoneController.getPhones)
  .post(phoneController.createPhone);

phoneRouter
  .route('/:phoneId')
  .get(phoneController.getPhoneById)
  .patch(phoneController.updatePhoneById)
  .delete(phoneController.deletePhoneById);

module.exports = phoneRouter;
