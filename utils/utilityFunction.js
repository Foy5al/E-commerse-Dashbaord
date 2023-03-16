const { projectContentName } = require("../controller/product.controller");

exports.formServiceContent = () => {
  return {
    _id: "001",
    role: "admin",
    firstName: "Zero",
    primary: "true",
    status: "active",
  };
};

exports.defaultValeAdd = (mail) => {
  if (!mail.includes("@")) {
    return mail + "@backlog.com";
  } else if (mail === projectContentName()) {
    return projectContentName();
  } else {
    return mail;
  }
};
