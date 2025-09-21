module.exports = {
  code: `
    $onlyIf[$playerExists==true;$ephemeral The bot is not in a voice channel for this guild.]
    $try[
      $!playerResume
      $title[Success]
      $description[Player resumed successfully]
    ;
    $title[Error]
    $description[An Error Occured: $env[error]]
    ;error]
  `,
  data: {
    "type": 1,
    "description": "Resume the current player",
    "name": "resume",
    "integration_types": [
      0
    ],
    "contexts": [
      0
    ]
  }
}