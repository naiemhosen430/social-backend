import UserModel from "../auth/auth.model.js";
import MessageModel from "./message.model.js";

const messageSocket = (io, bot) => {
  io.on("connection", (client) => {
    console.log("A user connected");

    client.on("sendMessage", async ({ chatId, text }) => {
      const existing = await MessageModel.findOne({ msg_id: chatId });

      if (existing) {
        await bot.sendMessage(chatId, text);

        await MessageModel.updateOne(
          { msg_id: chatId },
          {
            $push: {
              chats: {
                text: text,
                date: Date.now(),
                type: "agent",
              },
            },
          }
        );
        console.log(`Message sent to ${chatId}: ${text}`);
      } else {
        io.emit(`${chatId}fail`, "Failed to send message!");
      }
    });

    client.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  bot.on("message", async (msg) => {
    console.log(msg);
    if (msg && msg.from) {
      // Ensure msg and msg.from exist
      const existing = await MessageModel.findOne({ msg_id: msg.from.id });

      if (existing) {
        await MessageModel.updateOne(
          { msg_id: msg.from.id },
          {
            $push: {
              chats: {
                text: msg.text,
                date: Date.now(),
                type: "bot",
              },
            },
          }
        );

        io.emit(existing.agent_id, msg.chat);
      } else {
        const count = await UserModel.countDocuments();
        if (count === 0) {
          console.log("No users found.");
          return null;
        }
        const randomIndex = Math.floor(Math.random() * count);
        const randomUser = await UserModel.findOne().skip(randomIndex);

        const new_msg_obj = new MessageModel({
          customer_obj: msg.from,
          msg_id: msg.from.id,
          type: "telegram",
          agent_id: randomUser?._id,
          agent_name: randomUser?.fullname,
          user_name: msg.from.first_name,
          chats: [
            {
              text: msg.text,
              date: Date.now(),
              type: "bot",
            },
          ],
        });

        await new_msg_obj.save();

        const chatId = msg.chat.id;
        bot.sendMessage(
          chatId,
          `Hi! ${msg.from.first_name} ${msg.from?.last_name}. I am ${randomUser?.fullname} Thanks for your message. How can i help you?`
        );
        io.emit(`${randomUser?._id}-newmessage`, new_msg_obj);
      }
    }
  });
};

export default messageSocket;
