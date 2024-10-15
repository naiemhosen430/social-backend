import UserModel from "../auth/auth.model.js";
export const createUserService = async (userinfo) => {
  const result = await UserModel.create(userinfo);
  return result;
};

export const updateUserService = async (userData, req) => {
  const result = await UserModel.updateOne(
    { _id: req.params.id },
    {
      $set: userData,
    }
  );

  const newData = await UserModel.findOne({ _id: req.params.id });
  return newData;
};

export const getUserService = async (req) => {
  const userData = await UserModel.findOne({ _id: req.params.id });
  return userData;
};
