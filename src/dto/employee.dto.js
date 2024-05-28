const employeeCreateDto = (data) => {
  return {
    fullname: data.fullname,
    position_id: data.position_id,
  };
};

module.exports = {
  employeeCreateDto,
};
