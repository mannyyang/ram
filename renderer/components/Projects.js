const React = require('react');
const { Box, Flex, Text, BlockLink } = require('rebass');
const Link = require('../Link');

const h = React.createElement;

class Projects extends React.Component {
  render() {
    const {
      projects
    } = this.props;

    return h(
      Flex,
      {},
      h(
        Box,
        {},
        projects.map((project, i) =>
          h(
            Box,
            {
              key: project.dirname
            },
            h(
              BlockLink,
              {
                is: Link,
                to: project.name
              },
              h(Text, { fontSize: 0, mt: 2 }, project.name)
            )
          )
        )
      )
    );
  }
}

module.exports = Projects;
