const React = require('react');
const { Box, Flex, Text, Heading, BlockLink, Button } = require('rebass');
const Xterm = require('react-xterm').default;
const Link = require('../Link');

const h = React.createElement;

class Header extends React.Component {
  render() {
    return h(
      Flex,
      {
        alignItems: 'center',
        p: 4,
        m: 2
      },
      h(
        Heading,
        {
          fontSize: 6,
          fontWeight: 'normal'
        },
        'Pages'
      ),
      h(Box, { mx: 'auto' }),
      h(
        Button,
        {
          is: Link,
          to: 'new',
          color: 'black'
        },
        'Create New Page'
      )
    );
  }
}

module.exports = Header;
