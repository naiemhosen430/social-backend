import UserModel from "./auth.model.js";

export const createUserService = async (userinfo) => {
  const result = await UserModel.create(userinfo);
  return result;
};

export const findOneByEmailFromUser = async (phone) => {
  const result = await UserModel.findOne({ phone });
  return result;
};

export const findOneByIdFromUser = async (ruseridq) => {
  const result = await UserModel.findOne({ _id: ruseridq });
  return result;
};

export const getSingleUserService = async (id, myid) => {
  const user = await UserModel.findOne({ _id: id });

  if (!user) {
    return null;
  }

  let checkFriend = false;
  user.friends.map((fid) => {
    if (fid === myid) {
      checkFriend = true;
    }
  });

  if (checkFriend) {
    const result = await UserModel.findOne({ _id: id }).select(
      "fullname profilephoto tittle sendrequests gender friendrequests online_status position friends"
    );
    return result;
  }

  const result = await UserModel.findOne({ _id: id }).select(
    "fullname profilephoto sendrequests friendrequests tittle friends gender position"
  );
  return result;
};

export const updateMeService = async (req) => {
  const result = await UserModel.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  return result;
};
