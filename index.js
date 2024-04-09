const client = require("discord.js");
const c = new client.Client({
    intents : 3276799,
    partials : [client.Partials.User,client.Partials.Message,client.Partials.Channel]
})
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
  
});

let link = "";


let idd = "1227025659336065095" // ايدي روم الزاجل
let log = "1227026539053580288" //ايدي روم اللوق
let zajel = new client.SlashCommandBuilder()
.setName("zajel")
.setDescription("لي ارسال الزاجل قم بي التالي")
.addUserOption(
    u=>
    u.setName("user")
    .setDescription("user to sent zajel")
    .setRequired(true)
)
.addStringOption(
    s=>
    s.setName("content")
    .setDescription("content to send")
    .setRequired(true)
)
c.on("ready",async ()=>{
    console.log(`${c.user.tag} is ready now!`);
    c.application.commands.set([zajel])
})

c.on("interactionCreate", async interaction=>{
    if(!interaction.isChatInputCommand()) return
    if(interaction.commandName != "zajel") return
    let content = interaction.options.getString("content")
    let member = interaction.options.getMember("user")
    if(!member) return interaction.reply({ephemeral : true, content : ":x:"})
    let embed = new client.EmbedBuilder()
    .setColor("Red")
    .setThumbnail(interaction.guild.iconURL())
    .setAuthor({
        name : member.user.username,
        iconURL: member.user.displayAvatarURL()
    })
    .setDescription(` هل متأكد من انك تريد ارسال الزاجل ؟${member} 
 
${content}`)
  
    let m = await interaction.reply({
        ephemeral : true,
        embeds : [embed],
        components : [
            new client.ActionRowBuilder()
            .addComponents(
                new client.ButtonBuilder()
                .setLabel("مع ذكرى الشخص")
                .setCustomId("with")
                .setStyle(client.ButtonStyle.Primary),
                new client.ButtonBuilder()
                .setLabel("دون ذكر الشخص")
                .setCustomId("without")
                .setStyle(client.ButtonStyle.Primary),
                new client.ButtonBuilder()
                .setLabel("الغاء")
                .setCustomId("cancel")
                .setStyle(client.ButtonStyle.Danger)
            )
        ]
    })
    let int = await m.awaitMessageComponent({componentType : client.ComponentType.Button,filter: (m)=> m.user.id == interaction.user.id,time : 30_000}).catch(e=>{0})
    if(!int) return
    if(int.customId == "cancel") interaction.editReply({content : "Zajel has cancelled", embeds : [], components : []})
    if(int.customId == "with"){
        interaction.editReply({content : "Zajel has sent", embeds : [], components : []})
        let embed = new client.EmbedBuilder()
         .setColor("#0a0a0a")
         .setDescription(`> ${content}`)
         .setTitle(`رسالة من ${interaction.user.tag} 🕊`)
         .setImage("https://media.discordapp.net/attachments/1214563803040317450/1227024034773078097/E9FB1813-B8FF-446C-8601-76F235016A77.jpg?ex=6626e62e&is=6614712e&hm=7362eaa452117407144c5180373c7cdc976068f47c15082409745751dbffc378&=&format=webp&width=1125&height=306")
         .setThumbnail(member.displayAvatarURL())
         let channel = c.channels.cache.get(idd)
         channel.send({embeds : [embed],content : `To: ${member}`})
         let logs = c.channels.cache.get(log)
         logs.send({
             embeds : [
                 new client.EmbedBuilder()
          .setColor("#0a0a0a")
          .setDescription(`> ${content}`)
          .setTitle(`رسالة من ${interaction.user.tag} 🕊`)
          .setImage("https://media.discordapp.net/attachments/1214563803040317450/1227024034773078097/E9FB1813-B8FF-446C-8601-76F235016A77.jpg?ex=6626e62e&is=6614712e&hm=7362eaa452117407144c5180373c7cdc976068f47c15082409745751dbffc378&=&format=webp&width=1125&height=306")
          .setThumbnail(member.displayAvatarURL())
             ],
             content : `To: ${member}`
         })
    }
    if(int.customId == "without"){
        interaction.editReply({content : "Done", embeds : [], components : []})
        let embed = new client.EmbedBuilder()
        .setColor("#0a0a0a")
        .setDescription(` ${content}`)
        .setTitle(`وصلك زاجل 🕊`)
        .setImage("https://media.discordapp.net/attachments/1214563803040317450/1227024034773078097/E9FB1813-B8FF-446C-8601-76F235016A77.jpg?ex=6626e62e&is=6614712e&hm=7362eaa452117407144c5180373c7cdc976068f47c15082409745751dbffc378&=&format=webp&width=1125&height=306")
        .setThumbnail(member.displayAvatarURL())
        let channel = c.channels.cache.get(idd)
        channel.send({embeds : [embed],content : `إلى : ${member}`})
      
        let logs = c.channels.cache.get(log)
        logs.send({
            embeds : [
                new client.EmbedBuilder()
         .setColor("#0a0a0a")
         .setDescription(` ${content}`)
         .setTitle(`العضو الراسل لزاجل : ${interaction.user.tag}🕊`)       
              
              
         .setImage("https://media.discordapp.net/attachments/1214563803040317450/1227024034773078097/E9FB1813-B8FF-446C-8601-76F235016A77.jpg?ex=6626e62e&is=6614712e&hm=7362eaa452117407144c5180373c7cdc976068f47c15082409745751dbffc378&=&format=webp&width=1125&height=306")
         .setThumbnail(member.displayAvatarURL())
            ],
            content : `To:${member}`
        })
    }

})
c.login(process.env.token)
