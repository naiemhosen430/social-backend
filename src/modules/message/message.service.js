import MessageModel from "./message.model.js";

export const getAllNewsupportService = async () => {
  const result = await MessageModel.find({ agent_id: null });
  return result;
};
