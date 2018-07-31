const React = require('react');
const { Box } = require('rebass');
const Page = require('./Page');
const Card = require('./Card');
const Empty = require('../Empty');

const h = React.createElement;

class Pages extends React.Component {
  render() {
    const { pages, update } = this.props;

    return h(
      Box,
      {},
      !pages.length && h(Empty),
      pages.map((page, i) =>
        h(
          Box,
          {
            key: page.name
          },
          h(Page, {
            page,
            index: i,
            update
          })
        )
      )
    );
  }
}

module.exports = Pages;
