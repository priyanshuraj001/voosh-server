const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(
      {
        body: req.body,
        query: req.query,
        params: req.params,
      },
      { abortEarly: false }
    );
  
    if (error) {
      return res.status(400).json({ message: error.details.map((err) => err.message).join(', ') });
    }
    next();
  };
  
  module.exports = { validate };
  