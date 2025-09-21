module.exports = {
  code: `
    $onlyIf[$playerExists==true;$ephemeral The bot is not in a voice channel for this guild.]
    $try[
      $!playerPause
      $title[Success]
      $description[Player paused successfully]
    ;
    $title[Error]
    $description[An Error Occured: $env[error]]
    ;error]
  `,
  data: {
    "type": 1,
    "description": "Pause the current player",
    "name": "pause",
    "integration_types": [
      0
    ],
    "contexts": [
      0
    ]
  }
}