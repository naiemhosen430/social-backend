import messageSocket from "../modules/message/socketIo.message.js";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();

const useIo = (io) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const bot = new TelegramBot(token, { polling: true });
  messageSocket(io, bot);
};

export default useIo;
