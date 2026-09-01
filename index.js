const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.notifyOnTaskAssign = functions.firestore
  .document("dispatch/{docId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const beforeIds = new Set((before.tasks || []).map((t) => t.id));
    const newTasks = (after.tasks || []).filter((t) => !beforeIds.has(t.id));
    if (newTasks.length === 0) return null;

    const members = after.members || [];
    const messaging = admin.messaging();

    for (const task of newTasks) {
      if (!task.assignedTo) continue;
      const member = members.find((m) => m.id === task.assignedTo);
      if (!member || !member.fcmTokens || member.fcmTokens.length === 0) continue;

      const message = {
        tokens: member.fcmTokens,
        notification: {
          title: "Yeni tapşırıq düşdü",
          body: task.title + (task.room ? " (Otaq " + task.room + ")" : ""),
        },
      };
      try {
        await messaging.sendEachForMulticast(message);
      } catch (e) {
        console.error("Bildiriş göndərmə xətası:", e);
      }
    }
    return null;
  });
