function itemModelView() {
    var self = this;

    self.items = ko.observableArray([]);

    self.updateValue = function (value, event) {
        console.log('clicked update', value);
        // self.isSelectedColor(value.color)
        // self.isSelectedSize(value.size)
    }

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
                            { "size": "xl" }

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
    self.onSave = function () {
        let checkOptions = true
        $(".container").children(".box").each(function(){
            $(this).children("input[type='radio']").each(function(){
                if (!$(this).prop("checked")) {
                    $(this).parent().parent().children('.error').text("Please Select");
                    checkOptions = false;
                } else {
                    let optionValue = $(this).val()
                    $(this).parent().parent().children('h4').children('.dst').text(optionValue);
                    $(this).parent().parent().children('.error').hide();
                    checkOptions = true;
                    return false;
                } 
            });
        });
        if(checkOptions){
            console.log('One radio in each group is checked.');
            $('#success').text('Successfully selected each radio, proceed to cart logic.')
        } else {
            console.log('Please select one option in each question.');
        }
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
            console.log('loading-btn clicked')
            params.action(function (data) {
                self.isLoading(false);
                params.onDone(data);
            });
        }
    }
})
ko.components.register('input-button', {
    template: [
        '<input type="radio" data-bind="value: inputText, click: onClick"><span data-bind="text: inputText"></span>',
    ].join(''),
    viewModel: function (params) {
        var self = this;
        self.inputText = ko.observable(params.inputText);
        self.onClick = function () {
            console.log('clicked???')
            console.log('Selected: ', params.inputText);
            params.action(function (data) {
                console.log(data);
            }
        )};
    }
})


const knockoutApp = document.querySelector('#knockout-app');

ko.applyBindings(new itemModelView(), knockoutApp)