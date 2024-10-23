import MessageModel from "./message.model.js";

export const getAllNewsupportService = async () => {
  const result = await MessageModel.find({ agent_id: null });
  return result;
};

export const getAllSupportService = async (id) => {
  const result = await MessageModel.find({ agent_id: id });
  return result;
};
