const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static') 

module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'Reproduce audio de Youtube',
    async execute(message, args) {
        message.channel.send(`Reproduciendo ${args[0]}`);

        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            message.channel.send('Conectese a un canal de voz antes de invocar al bot.');
            return;
        };

        // console.log('Bot conectado correctante al canal de voz.');
        
         voiceChannel.join()
           .then(connection => {
            const dispatcher = connection.play('~/Documents/Projects/Node/music-bot/commands/cc_song.mp3', { volume: 1, });
         });

    }
}
