module.exports = {
  type: "interactionCreate",
  allowedInteractionTypes: [
      'autocomplete'
  ],
  code: `
    $onlyIf[$and[$applicationCommandName==add-track;$focusedOptionName==query]]
    $jsonLoad[result;$playerSearchTrack[$guildID;$default[$option[platform];ytsearch]:$focusedOptionValue]]]
    $jsonLoad[result;$env[result;tracks]]
    $arrayForEach[result;name;
      $addChoice[$env[name;title];$env[name;title]]
    ]
  ` 
}