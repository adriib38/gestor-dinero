function validateUserFields(user) {
    const errors = [];
  
    if (!user.username || typeof user.username !== 'string' || user.username.length < 3 || user.username.length > 20) {
      errors.push('Username must be a string between 3 and 20 characters');
    }
  
    if (!user.password || typeof user.password !== 'string' || user.password.length < 8 || user.password.length > 15) {
      errors.push('Password must be a string between 8 and 15 characters');
    }
  
    return {
      valid: errors.length === 0,
      errors
    };
}
  
module.exports = {
    validateUserFields
};
  