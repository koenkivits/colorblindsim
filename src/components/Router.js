import { h, Component } from "preact";

/**
 * A *very* basic URL router that listens to hash changes and renders the
 * child with the appropriate ID.
 */
export class Router extends Component {
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
    if (!children.find) {
      // ugly fallback for older browsers -- TODO, should clean up
      return null;
    }

    // return first child that renders (meaning it has a matching route)
    for (let child of children) {
      if (child) {
        return child;
      }
    }

    return null;
  }
}

export function Route(props) {
  const path = window.location.hash.substr(1);
  const [pathId, pathField] = path.split('/');

  if (props.id !== pathId) {
    return null;
  }

  let childProps = {
    id: props.id,
  };
  if (props.field && pathField) {
    childProps[props.field] = pathField;
  }

  const Child = props.component;
  return <Child {...childProps} />;
};
