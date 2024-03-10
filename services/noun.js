const pos = require('pos');

function extractNouns(sentence) {
    const words = new pos.Lexer().lex(sentence);
    const tags = new pos.Tagger()
        .tag(words)
        .map(function (tag) { return tag[0] + '/' + tag[1]; })
        .join(' ');

    const nouns = tags.split(' ').filter(function (tag) {
        return tag.endsWith('/NN') || tag.endsWith('/NNS') || tag.endsWith('/NNP') || tag.endsWith('/NNPS');
    }).map(function (tag) {
        return tag.split('/')[0];
    });
    return nouns
}

module.exports = { extractNouns }