import React, { Component } from "react";
import Switch from "react-switch";

class ToggleSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = { checked: this.props.checked };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked });
    }

    render() {
        return (
            <label>
                <Switch onChange={this.handleChange}
                    checked={this.state.checked}
                    onColor={"#0075FF"}
                    height={24}
                    width={48}
                    uncheckedIcon={false}
                    checkedIcon	={false}
                />
            </label>
        );
    }
}

export default ToggleSwitch