const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mc = require('minecraft_head');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skin')
		.setDescription('Enter the username to get the Skin')
        .addStringOption((option) =>
      option
        .setName('player-name')
        .setDescription('Name of the player')
        .setMaxLength(30)
        .setRequired(true),
    ),
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const name = interaction.options.getString('player-name');

        console.log(name + ' is the username');
        const player = new mc.player(name);

        mc.getSkin(player)
        .then(data => {
            const skin = data.skin;
            const skinEmbed = new EmbedBuilder()
            .setColor(0x24A5E6)
            .setTitle('Minecraft Utilities')
            .setURL('https://spectex.xyz/project/minecraft-utilities')
            .addFields(
              { name: `Skin of ${name}`, value: `\`\`\`${skin}\`\`\`` },
            );
          interaction.editReply({
            components : [
              {
                'type': 1,
                'components': [
                  {
                    'style': 5,
                    'label': 'Vote',
                    'url': 'https://top.gg/bot/810192936472936480/vote',
                    'disabled': false,
                    'type': 2,
                  },
                  {
                    'style': 5,
                    'label': 'Website',
                    'url': 'https://spectex.xyz/projects/minecraft-utilities',
                    'disabled': false,
                    'type': 2,
                  },
                  {
                    'style': 1,
                    'label': 'Help',
                    'custom_id': 'row_0_button_2',
                    'disabled': false,
                    'type': 2,
                  },
                ],
              },
            ],
            embeds: [skinEmbed],
            ephemeral: true,
          });
          return;
        })
        .catch((error) => {
          interaction.editReply({
            content: 'There has been an error, Please Try Again',
            ephemeral: true,
          });
          console.log(error);
        });
	},
};