import { BootstrapNumberSpinner } from './bootstrap-number-spinner';

document.addEventListener('DOMContentLoaded', () => {

  const optionsDemoNode = <HTMLInputElement> document.querySelector('#options-demo-spinner');
  if (optionsDemoNode) {
    const optionsDemoSpinner = new BootstrapNumberSpinner(optionsDemoNode, { min: 2, max: 5, format: '%d mm' });
    optionsDemoSpinner.value = 3;
  }

  const eventDemoNode = <HTMLInputElement>document.querySelector('#event-demo-spinner');
  const eventDemoIndicator = document.querySelector('#event-demo-indicator');

  if (eventDemoNode && eventDemoIndicator) {
    const eventDemoSpinner = new BootstrapNumberSpinner(eventDemoNode);
    eventDemoNode.addEventListener('change.bs.spinner', evt => {
      eventDemoIndicator.innerHTML = eventDemoSpinner.value.toString();
    })
  }

  const nodes = document.querySelectorAll('.spinner');
  for (let i = 0; i < nodes.length; i++) {
    new BootstrapNumberSpinner(<HTMLInputElement>nodes[i]);
  }

});