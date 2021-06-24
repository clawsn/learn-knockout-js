console.log('js here');


function itemModelView() {
    var self = this;


    self.items = ko.observableArray([
        "Example 1", "Example 2"
    ])

    self.fetchItems = function (callback) {
        console.log('fetching....');
        setTimeout(function () {
            var MOCK_RESPONSE = {
                items: [
                    "ITEMS 1",
                    "ITEMS 1",
                    "ITEMS 1",
                    "ITEMS 1",
                    "ITEMS 1",
                    "ITEMS 1",
                    "ITEMS 1",
                    "ITEMS 1",
                    "ITEMS 1",
                ]
            }
            callback(MOCK_RESPONSE.items)
        }, 2000)
    }
    self.onNewItems = function (newItems) {
        self.items(newItems)
    }
}

ko.components.register('loading-button', {
    //template: '<button class="btn btn-primary"><span>Button</span></button>'
    template: [
        '<button class="btn btn-primary" data-bind="click: onClick, css: {loading: isLoading}">',
        '<span data-bind="text: buttonText"></span>',
        '</button>'
    ].join(''),
    viewModel: function (params) {
        var self = this;
        self.buttonText = ko.observable(params.buttonText)
        self.isLoading = ko.observable(false);

        self.onClick = function () {
            self.isLoading(true);
            params.action(function (data) {
                console.log(data)
                self.isLoading(false);
                params.onDone(data)
            });
        }

    }
})


const knockoutApp = document.querySelector('#knockout-app');

ko.applyBindings(new itemModelView(), knockoutApp)