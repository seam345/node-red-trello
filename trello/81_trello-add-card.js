var Trello = require('node-trello')

module.exports = function (RED) {
  function TrelloAddCardNode (config) {
    RED.nodes.createNode(this, config)
    var node = this

    // Retrieve the config node
    var credentialNode = RED.nodes.getNode(config.trello)
    var trello = new Trello(credentialNode.apikey, credentialNode.secret)
    this.on('input', function (msg) {
      var trelloData = msg.trello || {}
      var sendData = {
        name: trelloData.name || config.name,
        desc: trelloData.desc || config.desc,
        idList: trelloData.idList || config.idList,
        pos: trelloData.pos || config.pos,
        due: trelloData.due || config.due,
        idMembers: trelloData.idMembers || config.idMembers,
        idLabels: trelloData.idLabels || config.idLabels
      }
      trello.post(
        '/1/cards',
        sendData,
        (err, data) => {
          if (err) { node.error(err) }
          node.send(data)
        }
      )
    })
  }
  RED.nodes.registerType('trello-add-card', TrelloAddCardNode)
}
