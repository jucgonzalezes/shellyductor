module.exports = {
    name: 'args-info',
    description: 'Informacion de los argumentos.',
    args: true, 
    execute(message, args){
        if (args[0] === 'foo'){
            return message.channel.send('bar');
        }

        message.channel.send(`Argumentos: ${args} \nLongitud: ${args.length}`)
    },
}
