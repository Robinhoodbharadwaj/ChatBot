import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Tabs, Tab, Button} from 'react-bootstrap';

import {Editor} from '../components';
import {selectActiveTab, newTab, removeTab, evaluateCode} from '../actions';

class ControlledTabs extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      disableButton: true,
      tempCode: ''
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.remove = this.remove.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
  }

  onCodeChange(newValue, event) {
    this.setState({
      disableButton: newValue === this.props.activeTab.code,
      tempCode: newValue
    });
  }

  handleSelect(activeTab) {
    if (this.props.activeTab.id !== activeTab && activeTab) {
      this.props.selectActiveTab(activeTab);
    } else if (!activeTab) {
      const {tabs} = this.props;
      this.props.newTab(tabs[tabs.length - 1].id);
    }
  }

  remove(indexToRemove) {
    this.props.removeTab(indexToRemove);
  }

  render() {
    return (
      <div>
        <Button bsStyle="danger" onClick={() => this.props.evaluateCode(this.state.tempCode)} className="apply-changes" disabled={this.state.disableButton}>Apply Changes</Button>
        <Tabs
          activeKey={this.props.activeTab.id}
          onSelect={this.handleSelect}
          id="controlled-tab-example"
        >
          {
            this.props.tabs.map((tab, index) => (
              <Tab eventKey={tab.id} key={tab.title}
                title={<span>{tab.title} {
                  index ?
                    <span className="fa-sign float-right" onClick={() => this.remove(index)}>
                      <i className="fa fa-times" aria-hidden="true"></i>
                    </span> : ''
                }</span>}>
                <Editor code={tab.code} id={tab.id} onCodeChange={this.onCodeChange} />
              </Tab>
            ))
          }
          <Tab eventKey={0} title={<i className="fa fa-plus" aria-hidden="true"></i>}>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = ({activeTab, tabs}) => ({
  activeTab,
  tabs
});

const mapDispatchToProps = dispatch => bindActionCreators({selectActiveTab, newTab, removeTab, evaluateCode}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ControlledTabs);
