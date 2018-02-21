import { h, Component } from "preact";

/**
 * A *very* basic URL router that listens to hash changes and renders the
 * child with the appropriate ID.
 */
export default class LameRouter extends Component {
  componentDidMount() {
    this.hashListener = this.updateHash.bind(this);
    window.addEventListener("hashchange", this.hashListener);
    this.updateHash();
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.hashListener);
  }

  updateHash() {
    this.setState({
      hash: window.location.hash.substr(1),
    });
  }

  render({ children }, { hash }) {
    return children.find(
      child => child.attributes.id === window.location.hash.substr(1),
    );
  }
}
