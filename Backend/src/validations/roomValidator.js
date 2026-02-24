//src/validations/roomValidator.js 

const { body, param, query, validationResult } = require('express-validator');

/* 
** Validation Error Handler
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: 'Validation failed',
            errors: errors.array() });
    }
    next();
};

/* 
** Create Room Validation
*/
const createRoomValidation = [
    body('roomNumber')
        .notEmpty().withMessage('Room number is required')
        .isInt({ min: 1 }).withMessage('Room number must be a positive integer'),
    body('type')
        .notEmpty().withMessage('Room type is required')
        .isIn(['single', 'double', 'suite']).withMessage('Invalid room type'),
    body('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('status')
        .optional()
        .isIn(['available', 'occupied', 'maintenance']).withMessage('Invalid room status'), 
    validate
];

/* 
** Update Room Validation
*/
const updateRoomValidation = [
    param('id')
        .notEmpty().withMessage('Room ID is required')
        .isInt({ min: 1 }).withMessage('Room ID must be a positive integer'),
    body('roomNumber')
        .optional()
        .isInt({ min: 1 }).withMessage('Room number must be a positive integer'),
    body('type')
        .optional()
        .isIn(['single', 'double', 'suite']).withMessage('Invalid room type'),
    body('price')
        .optional()
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('status')
        .optional()
        .isIn(['available', 'occupied', 'maintenance']).withMessage('Invalid room status'), 
    validate
];

/* 
** Get Room By ID Validation
*/
const getRoomByIdValidation = [
    param('id')
        .notEmpty().withMessage('Room ID is required')
        .isInt({ min: 1 }).withMessage('Room ID must be a positive integer'),
    validate
];

/* 
**  Query Validation (Filtering, Pagination)
** ?status=available&type=single&page=1&limit=10
*/
const queryValidation = [
    query('status')
        .optional()
        .isIn(['available', 'occupied', 'maintenance']).withMessage('Invalid room status'),
    query('type')
        .optional()
        .isIn(['single', 'double', 'suite']).withMessage('Invalid room type'),
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    validate
];

module.exports = {
    createRoomValidation,
    updateRoomValidation,
    getRoomByIdValidation,
    queryValidation
};


