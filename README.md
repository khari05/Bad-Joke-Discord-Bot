## Bad Joke Discord Bot
This bot scans for embeds / attachments sent to certain channels in a guild and replies to them with bad-joke.png

A user can add / remove channels from the log of channels set to be watched for embeds / attachments with `%addchannel` and `%removechannel`. Both of these commands require the manage channels permission to execute. `%help` can also be used to view these 2 commands. The bot can be invited to a Discord server [here](https://discord.com/api/oauth2/authorize?client_id=723251861204762736&permissions=51200&scope=bot)

## Privacy

This bot collects only information it needs to because I cannot afford to store the data required to spy on users.

Bad Joke only collects unique channel identifiers from watched channels. This information looks like a random number (e.g. 755147843538255945) and the only information available from this number is the date in which the channel was created.

Bad Joke also receives messages. However, it will immediately throw out any message that is not sent to a watched channel. Then, it will discard any message information from the computer memory after replying. It is very unlikely for a malicious actor to take control of the bot because it runs as an unprivileged user that can only edit its database.

---

![bad-joke.png](./bad-joke.png)
