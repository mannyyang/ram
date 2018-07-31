const React = require('react');
const h = React.createElement;
const openBrowser = require('react-dev-utils/openBrowser');
const {
  Box,
  Flex,
  Heading,
  Link: RebassLink,
  Pre,
} = require('rebass');

const { pushLog, savePageThumbnail } = require('../updaters');
const Preview = require('../Preview');

const REG = /localhost/;
const PORT = /localhost:[0-9]{4,5}/;
const getPort = str => {
  const [url] = PORT.exec(str);
  if (!url) return;
  return parseInt(url.replace(/[a-z:]/g, ''));
};

class Page extends React.Component {
  constructor() {
    super();

    this.state = {
      listening: false,
      installing: false
    };

    this.handleCapture = img => {
      const { update, index } = this.props;
      update(savePageThumbnail(img, index));
    };

    this.handleChange = e => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    };
  }

  render() {
    const { page } = this.props;
    const { listening } = this.state;

    if (!page) return false;
    const { name, dirname, port } = page;
    const url = `http://localhost:${port}/${name}`;

    return h(
      Box,
      {
        p: 3
      },
      h(
        Flex,
        {
          alignItems: 'center'
        },
        h(
          Box,
          {},
          h(
            Heading,
            {
              is: 'h1',
              fontSize: 2,
              fontWeight: 'normal'
            },
            name
          )
        ),
        h(
          Box,
          {
            mx: 'auto'
          }
        ),
        h(
          Box,
          null,
          h(
            Pre,
            { fontSize: 0 },
            h(RebassLink, {
              href: '#!',
              disabled: !listening,
              color: listening ? 'cyan' : 'darken',
              onClick: e => openBrowser(url),
              children: url
            })
          )
        )
      )
    );
  }
}

module.exports = Page;
