const React = require('react');
const { Box, Flex } = require('rebass');

const h = React.createElement;

class Card extends React.Component {

  render() {
    return h(
      Box,
      {
        p: 4,
        bg: 'white',
        css: {
          borderRadius: '7px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
        }
      },
      this.props.children
    );
  }
}

module.exports = Card;
