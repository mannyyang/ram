const React = require('react');
const { Box, Flex, Text, Heading, BlockLink, Button } = require('rebass');
const Header = require('./components/Header');
const Projects = require('./components/Projects');
const Terminal = require('./components/Terminal');
const Pages = require('./components/Pages');

const h = React.createElement;

class ProjectList extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { pages, projects, info, update, projectPath, running } = this.props;

    return h(
      Box,
      {
        p: 4,
        bg: '#f8f8f8',
        css: {
          height: '100%'
        }
      },
      h(Header, {}),
      h(Projects, { projects }),
      h(Terminal, { update, info, projectPath, running }),
      h(Pages, { pages, update })
    );
  }
}

module.exports = ProjectList;
