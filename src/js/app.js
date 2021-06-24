console.log('js here');


function itemModelView() {
    var self = this;


    self.items = ko.observableArray([
        "Example 1", "Example 2"
    ])
}


const knockoutApp = document.querySelector('#knockout-app');

ko.applyBindings(new itemModelView(), knockoutApp)