module.exports = {
  code: `
    $defer
    $onlyIf[$playerExists==true;$ephemeral The bot is not in a voice channel for this guild.]
    $try[
      $jsonLoad[track;$playerAddTrack[$guildID;$option[platform]:$option[query]]]
      $title[Success]
      $addField[Name;$env[track;trackTitle];false]
      $addField[Author;$env[track;trackAuthor];true]
      $addField[Is Playlist;$if[$env[track;playlistName]==null;false;true];true]
      $addField[Track Count;$env[track;trackCount];true]
      $footer[Query: $option[query] • Queue Size: $playerQueueLength]
      $image[$env[track;trackImage]]
    ;
    $title[Error]
    $description[An Error Occured: $env[error]]
    ;error] 
  `,
  data: {
    "type": 1,
    "description": "Adds a track/song to the queue",
    "name": "add-track",
    "integration_types": [
      0
    ],
    "contexts": [
      0
    ],
    "options": [
      {
        "type": 3,
        "description": "The platform to use to add the track",
        "name": "platform",
        "choices": [
          {
            "name": "Youtube",
            "value": "ytsearch:"
          },
          {
            "name": "Spotify",
            "value": "spsearch:"
          },
          {
            "name": "Sound Cloud",
            "value": "scsearch:"
          },
          {
            "name": "Youtube Music",
            "value": "ytmsearch:"
          }
        ],
        "required": true
      },
      {
        "name": "query",
        "type": 3,
        "required": true,
        "description": "Search a track to play",
        "autocomplete": true
      }
    ]
  }
}