import { h } from "preact";
import { connect } from "unistore/preact";

import Application from "../components/Application";
import { setDisabled, toggleDisabled, setAnomaly } from "../actions";

const mapStateToProps = ({ daltonizer }) => ({
  daltonizer,
});
const actions = { setDisabled, toggleDisabled, setAnomaly };

export default connect(mapStateToProps, actions)(Application);
