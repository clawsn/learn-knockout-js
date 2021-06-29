
function itemModelView() {
    var self = this;

    self.items = ko.observableArray([]);
    self.selectedValue = ko.observable('value')


    self.fetchItems = function (callback) {
        console.log('fetching....');
        setTimeout(function () {
            var MOCK_RESPONSE = {
                "offer": [
                    {
                        "offerCode": "749-824",
                        "product": "749-824 - White Mark Soft-Touch Stretch Leggings",
                        "image": "https://images.shophq.com/is/image/ShopHQ/749-824_05_swatch?DefaultImage=1&$400x400_jpg$&op_sharpen=1",
                        "colorOptions": [
                            { "color": "red" },
                            { "color": "purple" },
                            { "color": "orange" },
                        ],
                        "sizeOptions": [
                            { "size": "small" },
                            { "size": "medium" },
                            { "size": "large" }
                        ]
                    },
                    {
                        "offerCode": "753-829",
                        "product": "753-829 - Halftee Lightweight Reversible Lace Insert Layering Top",
                        "image": "https://images.shophq.com/is/image/ShopHQ/753-829_00_swatch?DefaultImage=1&$400x400_jpg$&op_sharpen=1",
                        "colorOptions": [
                            { "color": "white" },
                            { "color": "black" },
                        ],
                        "sizeOptions": [
                            { "size": "xs" },
                            { "size": "small" },
                            { "size": "medium" },
                            { "size": "large" },
                            { "size": "XL" }

                        ]
                    },
                    {
                        "offerCode": "753-829",
                        "product": "753-829 - Halftee Lightweight Reversible Lace Insert Layering Top",
                        "image": "https://images.shophq.com/is/image/ShopHQ/753-829_00_swatch?DefaultImage=1&$400x400_jpg$&op_sharpen=1",
                        "colorOptions": [
                            { "color": "white" },
                            { "color": "black" },
                        ],
                        "sizeOptions": [
                            { "size": "xs" },
                            { "size": "small" },
                            { "size": "medium" },
                            { "size": "large" },
                            { "size": "XL" }

                        ]
                    }
                ]
            };
            callback(MOCK_RESPONSE.offer)
        }, 1000)
    }
    self.onNewItems = function (newItems) {
        self.items(newItems)
    }

    // on save checks if color and size are selected
    // If not selected message prompts to select, and saveing doesnt go to minicart

    self.onSave = function () {
        console.log('clicked')
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
ko.components.register('input-button', {
    template: [
        '<input type="button" class="btn btn-secondary" data-bind="value: inputText, click: onClick">',
    ].join(''),
    viewModel: function (params) {
        var self = this;
        self.inputText = ko.observable(params.inputText);

        self.onClick = function () {
            console.log('input clicked', params.inputText);
        }
    }
})


const knockoutApp = document.querySelector('#knockout-app');

ko.applyBindings(new itemModelView(), knockoutApp)