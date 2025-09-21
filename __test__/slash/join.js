module.exports = {
  code: `
    $onlyIf[$playerExists==true;$ephemeral The bot is already in a voice channel for this guild. It cannot be in 2 voice channels at the same time]
    $try[
      $!playerCreate[$option[voice_channel];$channelID;$option[volume]]
      $!playerJoinVC
      $title[Success]
      $description[Player created successfully]
    ;
      $title[Error]
      $description[An Error Occured: $env[error]]
    ;error]
  `,
  data: {
    "type": 1,
    "description": "Make the bot join the VC it should use",
    "name": "join",
    "integration_types": [
      0
    ],
    "contexts": [
      0
    ],
    "options": [
      {
        "name": "voice_channel",
        "type": 7,
        "description": "The voice channel the bot should join",
        "channel_types": [
          2
        ],
        "required": true
      },
      {
        "name": "volume",
        "type": 4,
        "description": "The volume the bot should be set to. Can later be changed via setVolume function",
        "min_value": 1,
        "max_value": 100,
        "required": true
      }
    ]
  }
}  