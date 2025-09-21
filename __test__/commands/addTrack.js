module.exports = {
  type: "interactionCreate",
  allowedInteractionTypes: [
      'autocomplete'
  ],
  code: `
    $onlyIf[$and[$applicationCommandName==add-track;$focusedOptionName==query]]
    $jsonLoad[result;$playerSearchTrack[$focusedOptionValue]]]]
    $jsonLoad[result;$env[result;tracks]]
    $arrayForEach[result;name;
      $addChoice[$env[name;title];$env[name;title]]
    ]
  `
}