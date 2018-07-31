const React = require('react');
const { Box, Flex, Heading } = require('rebass');
const Xterm = require('react-xterm').default;
const Toggle = require('./Toggle');
const Card = require('./Card');
const { updateInfo, toggleDevServer } = require('../updaters');
const run = require('../spawn');

const h = React.createElement;

class Terminal extends React.Component {
  constructor() {
    super();
    this.termComp = null;
    this.childProcess = null;
  }

  componentDidMount() {
    this.termComp.xterm.fit();

    this.start = async () => {
      const { update, projectPath } = this.props;
      const promise = run('npm', ['start'], {
        cwd: projectPath,
        onLog: msg => {
          const lines = msg.split('\n');
          lines.forEach(line => {
            this.termComp.xterm.writeln(line);
          });

          update(updateInfo(msg));
        }
      });

      this.childProcess = promise.child;
    };
  }

  componentWillUnmount() {
    this.childProcess.kill();
  }

  onToggle() {
    const { update, running } = this.props;

    if (running) {
      this.childProcess.kill();
    } else {
      this.start();
    }

    update(toggleDevServer());
  }

  render() {
    const { info, running } = this.props;

    return h(
      Box,
      {},
      h(
        Flex,
        {},
        h(Box, {}, h(Heading, { children: 'Development Server' })),
        h(
          Box,
          {},
          h(Toggle, {
            isToggled: running,
            size: 30,
            padding: 5,
            onToggle: () => {
              this.onToggle();
            }
          })
        )
      ),
      h(
        Card,
        {
          
        },
        h(Xterm, {
          addons: ['fit'],
          options: {
            fontWeight: '100',
            fontSize: 12
          },
          value: info,
          ref: r => {
            this.termComp = r;
          }
        })
      )
    );
  }
}

module.exports = Terminal;
