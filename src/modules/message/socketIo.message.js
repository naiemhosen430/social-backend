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
                date: Date.now(), // Use Date.now() for the current timestamp
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
      delete users[client.id];
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
        const new_msg_obj = new MessageModel({
          customer_obj: msg.from,
          msg_id: msg.from.id,
          type: "telegram",
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
          `Hi! ${msg.from.first_name} ${msg.from.last_name}. Thanks for your message. Our customer agent will join you soon.`
        );
        io.emit("newsupportmessage", new_msg_obj);
      }
    }
  });
};

export default messageSocket;
