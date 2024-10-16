import UserModel from "../auth/auth.model.js";
import FeatureModel from "../feature/feature.model.js";
export const createUserService = async (userinfo) => {
  const result = await UserModel.create(userinfo);
  return result;
};

export const updateUserService = async (userData, req) => {
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { ...userData } },
    { new: true }
  );

  return updatedUser;
};

export const getUserService = async (req) => {
  const userData = await UserModel.findOne({ _id: req.params.id });
  return userData;
};

export const createFeatureService = async (featureData) => {
  const result = await FeatureModel.create(featureData);
  return result;
};

export const getAllFeatureService = async () => {
  const result = await FeatureModel.find();
  return result;
};

export const updateFeatureService = async (req) => {
  await FeatureModel.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );

  const result = await FeatureModel.updateOne({ _id: req.params.id });

  return result;
};
