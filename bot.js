const Discord = require('discord.js');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');
const ytdl = require('ytdl-core');


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const {
    prefix,
    token,
} = require('./config.json');

client.login(token);

client.once('ready', () => {
    console.log('Bot conectado correctamente al Guild.');
});

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if(!args.length){
        const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('ERROR')
            .setDescription('No ha provisto suficientes argumentos')
            .setFooter('Shellybot Error Log')
            .setTimestamp();
        return message.channel.send(embed)
    }; 

    try{
        command.execute(message, args);
    }catch(error){
        console.error(error);
        message.reply('Ocurrio un error al ejecutar el comando.');
    }
})
