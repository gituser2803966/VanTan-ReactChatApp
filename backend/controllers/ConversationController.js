import ConversationModel from "../models/conversation.model.js";

export const CreateConversation = (req, res) => {
  const conversationData = req.body;
  const conversation = new ConversationModel(conversationData);
  conversation.save((err, doc) => {
    if (err) {
      console.log("err ****** :", err);
      return res.status(400).send({
        success: false,
        message: "Không tạo được cuộc trò chuyện",
        error: err,
      });
    } else {
      // const token = await user.generateAuthToken();
      console.log("conversation was create successfully");
      return res.status(200).send({
        success: true,
        message: "Tạo cuộc trò chuyện thành công",
        conversation: doc,
      });
    }
  });
  return true;
};

// get all conversation for the current user
export const GetAllConversationForTheCurrentUser = async (userId) => {
  try {
    const response = await ConversationModel.find({ participants: userId });
    return response;
  } catch (error) {
    console.log("loi khi lay cuoc tro chuyen: ", error);
    return error;
  }
};
