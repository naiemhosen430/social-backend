import sendMessage from "../modules/chat/socketIo.chat.js";
import activeStatus from "../modules/user/socketIo.user.js";

const useIo = (io) => {
  activeStatus(io);
  sendMessage(io);
};

export default useIo;
