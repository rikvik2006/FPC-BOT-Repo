const Discord = require('discord.js');
const Canvas = require('canvas');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL','REACTION']});
const canvas = Canvas.createCanvas(700, 250);
const context = canvas.getContext('2d');

client.login('ODczODg0MzU0NzE4MzU1NDY2.YQ-6Og.XBtWESrBppHw6JVtI4u5J7-qfLM');


client.once ('ready', () => {
    console.log ("FPC BOT E' ONLINE");

    client.user.setActivity('i tuoi sentimenti', {type: 'WATCHING'});
})


client.on ('message', (message) => {
    if (message.content === 'sus-help') {

        const help_embed = new Discord.MessageEmbed()

        .setTitle ('HELP')
        .setColor('#CCCCCC')
        .setDescription('Tutti i comadi')
        .addField('sus-help', '```Tutti i comandi```')
        .setFooter('FPC', 'https://discohook.org/static/discord-avatar.png')

        message.channel.send(help_embed)
    }
})




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



client.on('message', message => {
	if (message.content === 'sus-join') {
		client.emit('guildMemberAdd', message.member);
	}
});



client.on('nitroBoost', (booster) => {
	client.channels.get('873522918431260773').send(`${booster} ha boostato il server <a:amongdance:874971135299694653>
    !`)
	client.addRole(booster.guild.roles.find(a => a.name === 'Deam Boster'))
 })


 client.on('guildMemberAdd', member => {
    const role = member.guild.roles.cache.find(r => r.name === 'F_PC');
    member.roles.add(role).catch(console.error);
 });