'use babel';

import BreaditorAtomBridgeView from './breaditor-atom-bridge-view';
import { CompositeDisposable } from 'atom';

export default {

  breaditorAtomBridgeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.breaditorAtomBridgeView = new BreaditorAtomBridgeView(state.breaditorAtomBridgeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.breaditorAtomBridgeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'breaditor-atom-bridge:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.breaditorAtomBridgeView.destroy();
  },

  serialize() {
    return {
      breaditorAtomBridgeViewState: this.breaditorAtomBridgeView.serialize()
    };
  },

  toggle() {
    console.log('BreaditorAtomBridge was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
