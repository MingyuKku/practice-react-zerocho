const React = require('react');
const { PureComponent,Component } = React;

class BallClass extends PureComponent {
// class BallClass extends Component {

  render () {
    const { number } = this.props;  
    let background;
    if (number <= 10) {
      background = 'red';
    } else if (number <= 20) {
      background = 'orange';
    } else if (number <= 30) {
      background = 'yellow';
    } else if (number <= 40) {
      background = 'blue';
    } else {
      background = 'green';
    }

    return (
      <div className="ball" style={{ background }}>{ number }</div>
    )
  }
}

module.exports = BallClass;