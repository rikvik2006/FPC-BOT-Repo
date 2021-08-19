const {Client, Intents, MessageButton, MessageActionRow, MessageEmbed} = require('discord.js');
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING],
});


const Canvas = require('canvas');
const canvas = Canvas.createCanvas(700, 250);
const context = canvas.getContext('2d');
const permitted_DS = require('./admin/permitted.DS_pro.json');

//const disbut = require("discord-buttons")
//disbut(client);





client.login('ODczODg0MzU0NzE4MzU1NDY2.YQ-6Og.XBtWESrBppHw6JVtI4u5J7-qfLM');


client.once ('ready', () => {
    console.log ("FPC BOT E' ONLINE");

    client.user.setActivity('i tuoi sentimenti', {type: 'WATCHING'});
})


//herlp

client.on ('messageCreate', (message) => {
    if (message.content === 'sus-help') {

        var help_embed = new MessageEmbed()

        .setTitle ('HELP')
        .setColor('#CCCCCC')
        .setDescription('Tutti i comadi')
        .addField('sus-help', '```Tutti i comandi```')
        .setFooter('FPC', 'https://discohook.org/static/discord-avatar.png')

        message.channel.send({embeds: [help_embed]})
    }
})


//welcomw canvas

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === '💎boost-welcome💎');
	if (!channel) return;

   
    // Create a canvas and access the 2d context
    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

	const { guild } = member

	const { MessageAttachment } = require('discord.js')
    // Load the background image and draw it to the canvas
    const background = await Canvas.loadImage('./wallpaper.png');
    const path = require('path')

    Canvas.registerFont(path.join(__dirname, "fonts", "Dosis-Bold.ttf"), { family: "Dosis"});
    



	let x = 0
    let y = 0
    ctx.drawImage(background, x, y)


    // Load the user's profile picture and draw it
    const pfp = await Canvas.loadImage(
      member.user.displayAvatarURL({
        format: 'png',
		format: 'webp',
		format: 'jpg',
		format: 'jpeg',
		format: 'gif'
		
      })
	)
	

    x = canvas.width / 2 - pfp.width / 2
    y = 25


    ctx.drawImage(pfp, x, y)
    // Display user text
    ctx.fillStyle = '#0a0a0a' // Balck text
    ctx.font = '35px Dosis'    //sans-serif
    let text = `Welcome ${member.user.tag}!`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 60 + pfp.height)
    // Display member count
    ctx.font = '30px Dosis'
    text = `Member #${guild.memberCount}`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 100 + pfp.height)
    // Attach the image to a message and send it
    //const attachment = new MessageAttachment(canvas.toBuffer())
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'say-goodbye.png');

    channel.send(`Bella gianda, ${member}! Spero che te abbia portato i biscotti <a:hei:874591082812440586>
	`, attachment)

});

//welcomw emit

client.on('messageCreate', message => {
	if (message.content === 'sus-join') {
		client.emit('guildMemberAdd', message.member);
	}
});

//nitro boost

client.on('nitroBoost', (booster) => {
	client.channels.get('873522918431260773').send(`${booster} ha boostato il server <a:amongdance:874971135299694653>
    !`)
	client.addRole(booster.guild.roles.find(a => a.name === 'Deam Boster'))
})

//auto role

client.on('guildMemberAdd', member => {
    var role = member.guild.roles.cache.find(r => r.name === 'F_PC');
    member.roles.add(role).catch(console.error);
});

//buttons

client.on('messageCreate', message => {
    if (message.content === 'sus-bottoni') {

        var row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Baby Rondo')
                    .setStyle('DANGER')
                    .setCustomId('role_rondo'),

                new MessageButton()
                    .setLabel('Discord Pro')
                    .setStyle('SUCCESS')
                    .setCustomId('role_discord_pro'),

                new MessageButton()
                    .setLabel('Minecarft PRO Bedwars')
                    .setStyle('PRIMARY')
                    .setCustomId('role_minecarft_pro_bedwars'),

            );
            
            

        var buttonEmbed = new MessageEmbed()
            .setTitle('Cosa sei tu')
            .setDescription('Scegli cliccando sul pulsante il tuo ruolo, puoi sceglierene anche più di uno. \n I ruoli `Discord Pro` e `Minecarft Pro Bedwars` possono essere presi a delle condizioni che sono scritte qui sotto')
            .addField('Discord Pro', '```Puo essere riscattato se si ha un livello pari o superiore a 10 nel livello generale di Bread (Visualizzabile con !!rank)```')
            .addField('Minecarft PRO Bedwars', '```Riscattabile solo se si ha un livello pari o supoeriore a 15 nelle bedwars nei server THE HIVE oppure Hipixel```')

        message.channel.send({embeds: [buttonEmbed], components: [row]})
    }
})

//click button


client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton) {
        if (interaction.customId === 'role_rondo' ) {

            const role = interaction.guild.roles.cache.get('874996080838844426')
            const member = interaction.member
            await member.roles.add(role)


            interaction.reply({content:`**${interaction.user.tag}** ti è stato aggiunto il ruolo **Baby Rondo**`,ephemeral: true})
            //interaction.reply.defer()

        }
    }
})

