const dispotitionCreateDto = (data) => {
  return {
    user_id: data.user_id,
    mail_id: data.mail_id,
  };
};

module.exports = {
  dispotitionCreateDto,
};
